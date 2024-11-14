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

const formSchema = z.object({
    namaLengkap: z.string().min(2, {
        message: "Nama harus minimal 2 karakter.",
    }),
    umur: z.number().min(0).max(150, {
        message: "Umur harus antara 0 dan 150.",
    }),
    tinggiBadan: z.number().min(0).max(300, {
        message: "Tinggi badan harus antara 0 dan 300 cm.",
    }),
    beratBadan: z.number().min(0).max(500, {
        message: "Berat badan harus antara 0 dan 500 kg.",
    }),
})

const patientData = [
    { name: "Keti Azura Siregar", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Shintya Ayu Warung", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Irma Amelia Novianto", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Ikhsanudin Lari Pagi", gender: "Perempuan", age: 22, stage: 4 },
]

export default function PatientExaminationForm() {
    const [patients, setPatients] = useState(patientData)
    const [searchTerm, setSearchTerm] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            namaLengkap: "",
            umur: 0,
            tinggiBadan: 0,
            beratBadan: 0,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const newPatient = {
            name: values.namaLengkap,
            gender: "Perempuan",
            age: values.umur,
            stage: 1,
        }
        setPatients([...patients, newPatient])
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        const filtered = patientData.filter((patient) =>
            patient.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setPatients(filtered)
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
                                    name="namaLengkap"
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
                                    name="umur"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Umur</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Umur"
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
                                    name="tinggiBadan"
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
                                    name="beratBadan"
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
