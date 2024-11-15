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
import { normalizePresenceData, normalizeStageData } from "@/lib/normalization"
import { predictPresence, predictStage } from "@/lib/model"
import { Stage, stages } from "@/app/model/Stage"

const icd10Options = {
    "C15.3": "0",
    "C15.4": "1",
    "C15.5": "2",
    "C15.9": "3",
    "C16.0": "4",
}

const icdOSiteOptions = {
    "C15.1": "0",
    "C15.3": "1",
    "C15.4": "2",
    "C15.5": "3",
    "C15.9": "4",
    "C16.0": "5",
}

const histologicalTypeOptions = {
    "Esophagus Adenocarcinoma, NOS": "0",
    "Esophagus Squamous Cell Carcinoma": "1",
}

const histologicalGradeOptions = {
    G1: "0",
    G2: "1",
    G3: "2",
    GX: "3",
}

const tnmCategoriesOptions = {
    T1N0: "0",
    T1N0M0: "1",
    T1N0M0T1N0M0: "2",
    T1N0M1: "3",
    T1N0M1a: "4",
    T1N0MX: "5",
    T1N1: "6",
    T1N1M0: "7",
    T1N1M0T1N0M0: "8",
    T1N1M0T1N1M0: "9",
    T1N1M1T1N1M1: "10",
    T1N1M1aT1N1M1a: "11",
    T1NXM0T1N1M0: "12",
    T2N0M0: "13",
    T2N0M0T2N0M0: "14",
    T2N0MX: "15",
    T2N0MXT3N1MX: "16",
    T2N1M0: "17",
    T2N1M0T2N1M0: "18",
    T2N1MXT0N1MX: "19",
    T2N2M0T2N2M0: "20",
    T2N2MX: "21",
    T2N3M0: "22",
    T2NXM0: "23",
    T2NXM0T2N0M0: "24",
    T2NXM1T1N1M0: "25",
    T3N0M0: "26",
    T3N0M0T3N0M0: "27",
    T3N0MX: "28",
    T3N1M0: "29",
    T3N1M0T1N0M0: "30",
    T3N1M0T3N1M0: "31",
    T3N1M1: "32",
    T3N1M1a: "33",
    T3N1M1b: "34",
    T3N1MX: "35",
    T3N2: "36",
    T3N2M0: "37",
    T3N2M0T3N2M0: "38",
    T3N2M1: "39",
    T3N2MX: "40",
    T3N3M0: "41",
    T3N3MX: "42",
    T3NXM0: "43",
    T3NXM0T3N0M0: "44",
    T3NXM0T3N2M0: "45",
    T3NXM0T3N3M0: "46",
    T3NXM0T3N3M1: "47",
    T4N0M0: "48",
    T4N0M0T4N0M0: "49",
    T4N1M0T4N1M0: "50",
    T4NXM1: "51",
    T4aNXMX: "52",
    TXNXM1: "53",
}

const formSchema = z.object({
    icd10: z.enum(Object.values(icd10Options) as [string, ...string[]], {
        required_error: "Please select an ICD 10",
    }),
    icdOSite: z.enum(Object.values(icd10Options) as [string, ...string[]], {
        required_error: "Please select an ICD-O-3 Site",
    }),
    histologicalType: z.enum(Object.values(histologicalTypeOptions) as [string, ...string[]], {
        required_error: "Please select a histological type",
    }),
    histologicalGrade: z.enum(Object.values(histologicalGradeOptions) as [string, ...string[]], {
        required_error: "Please select a histological grade",
    }),
    tnmCategories: z.enum(Object.values(tnmCategoriesOptions) as [string, ...string[]], {
        required_error: "Please select a TNM category",
    }),
})

export default function Component() {
    const [showResult, setShowResult] = useState(false)
    const [confidence, setConfidence] = useState(0)
    const [stage, setStage] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        const stageData: Stage = {
            ...values,
        }

        const normalizedData = normalizeStageData(stageData)
        console.table(normalizedData)

        const stageResult = await predictStage(normalizedData)
        const maxConfidence = Math.max(...stageResult.result)
        const stageIndex = stageResult.result.indexOf(maxConfidence)

        console.log(stageIndex)

        setShowResult(true)
        setStage(stages[stageIndex])
        setConfidence(maxConfidence)
        setLoading(false)
    }

    return (
        <div className="w-full p-4">
            <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Cancer Stage Check</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-16">
                    <div className="basis-1/2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="icd10"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="ICD 10" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(icd10Options).map(([label, value]) => (
                                                            <SelectItem key={value} value={value}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="icdOSite"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="ICD-O-3 Site" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(icdOSiteOptions).map(([label, value]) => (
                                                            <SelectItem key={value} value={value}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="histologicalType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Primary pathology histological type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(histologicalTypeOptions).map(
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
                                    name="histologicalGrade"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Primary pathology neoplasma hitolgical grade" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(histologicalGradeOptions).map(
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
                                    name="tnmCategories"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Stage event tnm categories" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(tnmCategoriesOptions).map(([label, value]) => (
                                                            <SelectItem key={value} value={value}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700">
                                    Predict
                                </Button>

                                <p>stage is {stage}</p>
                            </form>
                        </Form>
                    </div>
                    <div className="basis-1/2">
                        <PatientDataSteps currentStep={2} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}