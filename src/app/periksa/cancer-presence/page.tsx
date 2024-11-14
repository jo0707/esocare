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
import { getRegistration } from "@/lib/store"
import { normalizePresenceData } from "@/lib/normalization"
import { predictPresence } from "@/lib/model"

const formSchema = z.object({
    gender: z.enum(["1", "0"], {
        required_error: "Gender is required",
    }),
    age: z.number().min(0).max(120, { message: "Age must be between 0 and 120" }),
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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "0",
            age: 25,
            tobaccoHistory: "1",
            refluxHistory: "0",
            alcoholHistory: "0",
            barretsEsophagus: "0",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        const presenceData: Presence = {
            bmi: registration!.weight / Math.pow(registration!.height / 100, 2),
            ...values,
        }

        const normalizedData = normalizePresenceData(presenceData)
        console.table(normalizedData)

        const confidence = await predictPresence(normalizedData)
        setShowResult(true)
        setConfidence(Math.round(confidence * 100))

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
                        <p>Confidence Score: {confidence}%</p>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setShowResult(false)}>
                            Back
                        </Button>
                        {confidence >= 50 ? (
                            <Button onClick={() => router.push("/next-checking")}>Next Checking</Button>
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
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <RadioGroupItem value="1" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Male</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <RadioGroupItem value="0" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Female</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="25 years old"
                                                {...field}
                                                onChange={(e) => field.onChange(+e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                    <PatientDataSteps currentStep={0} />
                </div>
            </CardContent>
            {loading && <p>Loading...</p>}
            {showResult && (
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
                            <p>Confidence Score: {confidence}%</p>
                        </div>
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setShowResult(false)}>
                                Back
                            </Button>
                            {confidence >= 50 ? (
                                <Button onClick={() => router.push("/next-checking")}>Next Checking</Button>
                            ) : (
                                <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
