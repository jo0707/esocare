"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PatientDataSteps from "@/components/patientDataSteps"
import { getPresenceResult, getRegistration, savePresenceResult } from "@/lib/store"
import { normalizePresenceData } from "@/lib/normalization"
import { predictPresence } from "@/lib/model"

const formSchema = z.object({
    tobaccoHistory: z.enum(["1", "2", "3", "4"], {
        required_error: "Tobacco smoking history is required",
    }),
    refluxHistory: z.enum(["0", "1"], { required_error: "Reflux history is required" }),
    alcoholHistory: z.enum(["0", "1"], { required_error: "Alcohol history is required" }),
    barretsEsophagus: z.enum(["0", "1"], { required_error: "Barrets esophagus information is required" }),
})

export default function CancerPresenceCheck() {
    const [showResult, setShowResult] = useState(false)
    const [confidence, setConfidence] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const registration = getRegistration()

    if (!registration) {
        router.push("/periksa/register")
        return null
    }

    const curPresence = getPresenceResult()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tobaccoHistory: (curPresence?.tobaccoHistory as any) || "1",
            refluxHistory: (curPresence?.refluxHistory as any) || "0",
            alcoholHistory: (curPresence?.alcoholHistory as any) || "0",
            barretsEsophagus: (curPresence?.barretsEsophagus as any) || "0",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        const presenceData: Presence = {
            bmi: registration!.weight / Math.pow(registration!.height / 100, 2),
            age: registration!.age,
            gender: registration!.gender,
            ...values,
        }

        const normalizedData = normalizePresenceData(presenceData)
        const confidence = await predictPresence(normalizedData)

        const presenceResult: presenceResult = { ...presenceData, result: confidence }
        savePresenceResult(presenceResult)

        console.table(normalizedData)
        setConfidence(Math.round(confidence * 100))
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
                        className={`p-4 rounded-md mb-4 ${
                            confidence < 50 ? "bg-green-200" : "bg-orange-200 border-orange-400"
                        }`}
                    >
                        <p className={`font-semibold ${confidence < 50 ? "text-green-500" : "text-orange-500"}`}>
                            Esophages Cancer Prediction: {confidence < 50 ? "Not Detected" : "Detected"}
                        </p>
                        <p>Confidence Score: {confidence >= 50 ? confidence : 100 - confidence}%</p>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setShowResult(false)}>
                            Back
                        </Button>
                        {confidence >= 50 ? (
                            <Button onClick={() => router.push("/periksa/cancer-stage")}>Next Checking</Button>
                        ) : (
                            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="">
            <CardHeader>
                <CardTitle>Cancer Presence Check</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-16">
                <div className="basis-1/2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="tobaccoHistory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tobacco Smoking History</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                {[1, 2, 3, 4].map((value) => (
                                                    <FormItem key={value} className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem value={value.toString()} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">{value}</FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="refluxHistory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reflux History</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select reflux history" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">No</SelectItem>
                                                <SelectItem value="1">Yes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alcoholHistory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alcohol History</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Is Alcohol History Documented" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">No</SelectItem>
                                                <SelectItem value="1">Yes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="barretsEsophagus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Barrets Esophagus</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Barrets Esophagus status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">No</SelectItem>
                                                <SelectItem value="1">Yes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-[#7986CB] hover:bg-[#5C6BC0] text-white">
                                Predict
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="basis-1/2">
                    <PatientDataSteps currentStep={1} />
                </div>
            </CardContent>
            {loading && <p>Loading...</p>}
        </div>
    )
}
