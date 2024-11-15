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
import Header from "@/components/header"

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
        <div className="flex flex-col min-h-screen bg-[#F1F3FF]">
            <div className="rounded-lg overflow-clip m-6 mb-0">
                <Header />
            </div>

            <main className="flex-1 p-6 grid grid-cols-3 gap-6">
                <Card className="col-span-2 border-none">{children}</Card>
                <PatientList patients={patients} totalPatients={totalPatients} onAddPatient={handleAddPatient} />
            </main>
        </div>
    )
}
