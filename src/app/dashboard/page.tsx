"use client"

import React, { useState } from "react"
import { Search, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import PatientList from "@/components/patientList"
import Header from "@/components/header"
import { getPatientResults } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const router = useRouter()
    const handleAddPatient = () => {
        router.push("/periksa/register")
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F3FF]">
            <div className="rounded-lg overflow-clip m-6 mb-0">
                <Header />
            </div>

            <main className="flex-1 p-6 grid grid-cols-3 gap-6">
                <Card className="col-span-2 border-none">
                    <CardContent className="flex flex-col items-center justify-center h-full">
                        <h2 className="font-semibold font-lg">Periksa Pasien Baru</h2>
                        <p className="text-gray-600 mb-8 text-sm text-center">
                            Periksa apakah pasien memiliki kemungkinan mengalami kanker esofagus
                        </p>
                        <Button
                            className="bg-[#7986CB] hover:bg-[#5C6BC0] text-white rounded-full px-8"
                            onClick={handleAddPatient}
                        >
                            Tambah Pasien
                        </Button>
                    </CardContent>
                </Card>

                <PatientList />
            </main>
        </div>
    )
}
