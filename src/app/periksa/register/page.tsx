"use client"

import React, { useState } from "react"
import { Search, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PatientDataSteps from "@/components/patientDataSteps"
import { getRegistration, saveRegistration } from "@/lib/store"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nama harus minimal 2 karakter.",
    }),
    age: z.number().min(0).max(120, { message: "Age must be between 0 and 120" }),
    gender: z.enum(["1", "0"], {
        required_error: "Gender is required",
    }),
    height: z.number().min(0).max(300, {
        message: "Tinggi badan harus antara 0 dan 300 cm.",
    }),
    weight: z.number().min(0).max(500, {
        message: "Berat badan harus antara 0 dan 500 kg.",
    }),
})

export default function PatientExaminationForm() {
    const current = getRegistration()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: current?.name ?? "",
            gender: (current?.gender ?? "1") as "1" | "0" | undefined,
            age: current?.age ?? 0,
            height: current?.height ?? 0,
            weight: current?.weight ?? 0,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const newPatient: Registration = {
            name: values.name,
            gender: values.gender,
            age: values.age,
            height: values.height,
            weight: values.weight,
        }
        saveRegistration(newPatient)
        router.push("/periksa/cancer-presence")
    }

    return (
        <div>
            <CardHeader>
                <CardTitle>Pemeriksaan Pasien</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-16">
                <Tabs defaultValue="data-diri" className="basis-1/2">
                    <h2>Data Diri Pasien</h2>
                    <TabsContent value="data-diri">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Lengkap</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama Lengkap" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                            <FormLabel>age</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="age"
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
                                    name="height"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tinggi Badan</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Tinggi Badan"
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
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Berat Badan</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Berat Badan"
                                                    {...field}
                                                    onChange={(e) => field.onChange(+e.target.value)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="bg-[#7986CB] hover:bg-[#5C6BC0] text-white">
                                    Simpan
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
                <div className="basis-1/2">
                    <PatientDataSteps currentStep={0} />
                </div>
            </CardContent>
        </div>
    )
}
