"use client"

import React, { Children, useState } from "react"
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
import PatientList from "@/components/patientList"

const patientData = [
    { name: "Keti Azura Siregar", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Shintya Ayu Warung", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Irma Amelia Novianto", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Ikhsanudin Lari Pagi", gender: "Perempuan", age: 22, stage: 4 },
]

export default function PatientExaminationForm({ children }: { children: React.ReactNode }) {
    const [patients, setPatients] = useState(patientData)
    const [totalPatients, setTotalPatients] = useState(350)

    const handleAddPatient = (newPatient: any) => {
        setPatients([...patients, newPatient])
        setTotalPatients(totalPatients + 1)
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
            <header className="bg-white p-4 flex justify-between items-center shadow-sm">
                <h1 className="text-xl font-semibold text-[#7986CB]">EsoCare</h1>
                <div className="flex items-center space-x-2 bg-[#FFE0B2] rounded-full px-4 py-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <span>Apridian saputra</span>
                    <ChevronDown className="h-4 w-4" />
                </div>
            </header>

            <main className="flex-1 p-6 grid grid-cols-3 gap-6">
                <Card className="col-span-2">{children}</Card>
                <PatientList patients={patients} totalPatients={totalPatients} onAddPatient={handleAddPatient} />
            </main>
        </div>
    )
}
