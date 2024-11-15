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
import {
    normalizePresenceData,
    normalizeRecurrenceData,
    normalizeStageData,
    normalizeSurvivalData,
    normalizeTreatmentData,
} from "@/lib/normalization"
import {
    predictPresence,
    predictRecurrence,
    predictStage,
    predictSurvival,
    predictTreatmentResponse,
} from "@/lib/model"
import { Stage, StageScaledResult, stages } from "@/app/model/Stage"
import {
    getPresenceResult,
    getRecurrenceResult,
    getStageResult,
    getSurvivalResult,
    saveRecurrenceResult,
    saveStageResult,
    saveSurvivalResult,
    saveTreatmentResult,
} from "@/lib/store"

const primaryPathologyPostoperativeRxTxOptions = {
    NO: "0",
    YES: "1",
}

const primaryPathologyResidualTumorOptions = [
    { label: "R0", value: "0" },
    { label: "R1", value: "1" },
    { label: "R2", value: "2" },
    { label: "RX", value: "3" },
]

const formSchema = z.object({
    primaryPathologyPostoperativeRxTx: z.enum(
        Object.values(primaryPathologyPostoperativeRxTxOptions) as [string, ...[string]],
        { required_error: "Please select Post-Operative treatment" }
    ),
})

export default function CancerRecurrenceOutcomeCheck() {
    const [showResult, setShowResult] = useState(false)
    const [confidence, setConfidence] = useState(0)
    const [treatmentConfidence, setTreatmentConfidence] = useState(0)
    const [recur, setRecur] = useState(true)
    const [treatmentIndex, setTreatmentIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    if (!getSurvivalResult()) return router.push("/periksa/cancer-survival-outcome")

    const curSurvival = getSurvivalResult()
    const curPresence = getPresenceResult()
    const curStage = getStageResult()
    const curRecurrence = getRecurrenceResult()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            primaryPathologyPostoperativeRxTx: (curRecurrence?.primaryPathologyPostoperativeRxTx as any) ?? "0",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        // predict recurrence
        const recurrenceData: Recurrence = {
            stageEventPathologicStage: (curStage?.result.indexOf(Math.max(...curStage?.result)) ?? 0).toString(),
            vitalStatus: ((curSurvival?.result || 0) >= 0.5 ? 1 : 0).toString(),
            primaryPathologyResidualTumor: curSurvival?.primaryPathologyResidualTumor as string,
            personNeoplasmCancerStatus: curSurvival?.personNeoplasmCancerStatus as string,
            primaryPathologyNeoplasmHistologicGrade: curSurvival?.primaryPathologyNeoplasmHistologicGrade as string,
            primaryPathologyRadiationTherapy: curSurvival?.primaryPathologyRadiationTherapy as string,
            primaryPathologyPostoperativeRxTx: values.primaryPathologyPostoperativeRxTx,
            bmi: curSurvival?.bmi as number,
        }

        const normalizedData = normalizeRecurrenceData(recurrenceData)
        const recurrenceScaledResult = await predictRecurrence(normalizedData)
        const recurrenceResult = {
            ...recurrenceData,
            result: recurrenceScaledResult.result,
        }
        saveRecurrenceResult(recurrenceResult)

        // predict treatemnt response
        const treatmentData: Treatment = {
            stageEventPathologicStage: (curStage?.result.indexOf(Math.max(...curStage?.result)) ?? 0).toString(),
            hasNewTumorEventsInformation: (recurrenceResult?.result >= 0.5).toString(),
            primaryPathologyHistologicalType: curStage?.histologicalType as string,
            primaryPathologyNeoplasmHistologicGrade: curSurvival?.primaryPathologyNeoplasmHistologicGrade as string,
            primaryPathologyRadiationTherapy: curSurvival?.primaryPathologyRadiationTherapy as string,
            primaryPathologyPostoperativeRxTx: values.primaryPathologyPostoperativeRxTx,
            bmi: curPresence?.bmi as number,
        }

        const normalizedTreatmentData = normalizeTreatmentData(treatmentData)
        const treatmentScaledResult = await predictTreatmentResponse(normalizedTreatmentData)
        const treatmentResult = {
            ...treatmentData,
            result: treatmentScaledResult.result,
        }
        const highestTreatemntConfidence = Math.max(...treatmentResult.result)
        const highestTreatmentIndex = treatmentResult.result.indexOf(highestTreatemntConfidence)

        saveTreatmentResult(treatmentResult)

        setTreatmentIndex(highestTreatmentIndex)
        setTreatmentConfidence(Math.round(highestTreatemntConfidence * 100))
        setRecur(recurrenceResult.result >= 0.5)
        setConfidence(Math.round(recurrenceScaledResult.result * 100))
        setShowResult(true)
        setLoading(false)
    }

    function save() {
        router.push("/dashboard")
    }

    if (showResult) {
        return (
            <Card className="">
                <CardHeader>
                    <CardTitle>Cancer Recurrence Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className={`p-4 rounded-md mb-4 border ${
                            recur ? "bg-red-200 border-red-400" : "bg-green-200 border-green-400"
                        }`}
                    >
                        <p className={`font-semibold ${recur ? "text-red-500" : "text-green-500"}`}>
                            Recurrence Risk: {recur ? "High" : "Low"}
                        </p>
                        <p>Confidence Score: {confidence}%</p>
                    </div>
                    <div className={`p-4 rounded-md mb-4 border`}>
                        <p className={`font-semibold`}>
                            Treatment Response: {primaryPathologyResidualTumorOptions[treatmentIndex].label}
                        </p>
                        <p>Confidence Score: {treatmentConfidence}%</p>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setShowResult(false)}>
                            Back
                        </Button>
                        <Button onClick={save}>Save Patient Result</Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="w-full p-4">
            <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Recurrence Risk & Treatment Response</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-16">
                    <div className="basis-1/2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="primaryPathologyPostoperativeRxTx"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Postoperative Treatment for Primary Condition</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(primaryPathologyPostoperativeRxTxOptions).map(
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
                        <PatientDataSteps currentStep={4} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}