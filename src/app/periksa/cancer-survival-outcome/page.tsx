"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PatientDataSteps from "@/components/patientDataSteps"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { normalizePresenceData, normalizeStageData, normalizeSurvivalData } from "@/lib/normalization"
import { predictPresence, predictStage, predictSurvival } from "@/lib/model"
import { Stage, StageScaledResult, stages } from "@/model/Stage"
import { getPresenceResult, getStageResult, getSurvivalResult, saveStageResult, saveSurvivalResult } from "@/lib/store"

const neoplasmCancerStatusOptions = {
    "TUMOR FREE": "0",
    "WITH TUMOR": "1",
}

const primaryPathologyResidualTumorOptions = {
    R0: "0",
    R1: "1",
    R2: "2",
    RX: "3",
}

const hasDrugsInformationOptions = {
    NO: "0",
    YES: "1",
}

const hasRadiationsInformationOptions = {
    NO: "0",
    YES: "1",
}

const primaryPathologyRadiationTherapyOptions = {
    NO: "0",
    YES: "1",
}

const formSchema = z.object({
    personNeoplasmCancerStatus: z.enum(Object.values(neoplasmCancerStatusOptions) as [string, ...[string]], {
        required_error: "Please select neoplasm cancer status",
    }),
    primaryPathologyResidualTumor: z.enum(
        Object.values(primaryPathologyResidualTumorOptions) as [string, ...[string]],
        {
            required_error: "Please select primary pathology residual tumor",
        }
    ),
    hasDrugsInformation: z.enum(Object.values(hasDrugsInformationOptions) as [string, ...[string]], {
        required_error: "Please select has drugs information",
    }),
    hasRadiationsInformation: z.enum(Object.values(hasRadiationsInformationOptions) as [string, ...[string]], {
        required_error: "Please select has radiations information",
    }),
    primaryPathologyRadiationTherapy: z.enum(
        Object.values(primaryPathologyRadiationTherapyOptions) as [string, ...[string]],
        { required_error: "Please select primary pathology radiation therapy" }
    ),
})

export default function CancerSurvivalOutcomeCheck() {
    const [showResult, setShowResult] = useState(false)
    const [confidence, setConfidence] = useState(0)
    const [vital, setVital] = useState(true)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    if (!getStageResult()) return router.push("/periksa/cancer-stage")

    const curSurvival = getSurvivalResult()
    const curPresence = getPresenceResult()
    const curStage = getStageResult()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            personNeoplasmCancerStatus: (curSurvival?.personNeoplasmCancerStatus as any) ?? "0",
            primaryPathologyResidualTumor: (curSurvival?.primaryPathologyResidualTumor as any) ?? "0",
            hasDrugsInformation: (curSurvival?.hasDrugsInformation as any) ?? "0",
            hasRadiationsInformation: (curSurvival?.hasRadiationsInformation as any) ?? "0",
            primaryPathologyRadiationTherapy: (curSurvival?.primaryPathologyRadiationTherapy as any) ?? "0",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        const survivalData: Survival = {
            bmi: curPresence?.bmi ?? 10,
            stageEventPathologicStage: (curStage?.result.indexOf(Math.max(...curStage?.result)) ?? 0).toString(),
            primaryPathologyNeoplasmHistologicGrade: (curStage?.histologicalGrade ?? 0).toString(),
            ...values,
        }

        const normalizedData = normalizeSurvivalData(survivalData)
        console.table(normalizedData)

        const survivalScaledResult = await predictSurvival(normalizedData)
        console.log(survivalScaledResult)

        const survivalResult = {
            ...survivalData,
            result: survivalScaledResult.result,
        }
        saveSurvivalResult(survivalResult)

        setVital(survivalResult.result >= 0.5)
        setConfidence(Math.round(survivalScaledResult.result * 100))
        setShowResult(true)
        setLoading(false)
    }

    if (showResult) {
        return (
            <Card className="">
                <CardHeader>
                    <CardTitle>Cancer Presence Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className={`p-4 rounded-md mb-4 border ${
                            vital ? "bg-green-200 border-green-400" : "bg-red-200 border-red-400"
                        }`}
                    >
                        <p className={`font-semibold ${vital ? "text-green-500" : "text-red-500"}`}>
                            Patient Survival Likeliness: {vital ? "High" : "Low"}
                        </p>
                        <p>Confidence Score: {confidence}%</p>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setShowResult(false)}>
                            Back
                        </Button>
                        <Button onClick={() => router.push("/periksa/cancer-recurrence-risk")}>
                            Check Recurrence Risk
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="w-full p-4">
            <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Cancer Survival Check</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-16">
                    <div className="basis-1/2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="hasDrugsInformation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Has Drugs Information</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(hasDrugsInformationOptions).map(
                                                            ([label, value]) => (
                                                                <SelectItem key={value} value={value}>
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="hasRadiationsInformation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Has Radiation Information</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(hasRadiationsInformationOptions).map(
                                                            ([label, value]) => (
                                                                <SelectItem key={value} value={value}>
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="personNeoplasmCancerStatus"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Person Neoplasm Cancer Status</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(neoplasmCancerStatusOptions).map(
                                                            ([label, value]) => (
                                                                <SelectItem key={value} value={value}>
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="primaryPathologyRadiationTherapy"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Radiation Therapy</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(primaryPathologyRadiationTherapyOptions).map(
                                                            ([label, value]) => (
                                                                <SelectItem key={value} value={value}>
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="primaryPathologyResidualTumor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Residual Tumor</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(primaryPathologyResidualTumorOptions).map(
                                                            ([label, value]) => (
                                                                <SelectItem key={value} value={value}>
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="mt-4 w-full bg-gray-600 hover:bg-gray-700">
                                    Predict
                                </Button>

                                {loading && <p className="mt-4 text-sm text-center">Loading prediction...</p>}
                            </form>
                        </Form>
                    </div>
                    <div className="basis-1/2">
                        <PatientDataSteps currentStep={3} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
