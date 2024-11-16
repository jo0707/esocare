"use client"

import React, { useState } from "react"
import { Search, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const patientData = [
    { name: "Keti Azura Siregar", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Shintya Ayu Warung", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Irma Amelia Novianto", gender: "Perempuan", age: 22, stage: 4 },
    { name: "Ikhsanudin Lari Pagi", gender: "Perempuan", age: 22, stage: 4 },
]

export default function Dashboard() {
    const [patients, setPatients] = useState(patientData)
    const [searchTerm, setSearchTerm] = useState("")
    const [totalPatients, setTotalPatients] = useState(350)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        const filtered = patientData.filter((patient) =>
            patient.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setPatients(filtered)
    }

    const handleAddPatient = () => {
        const newPatient = {
            name: "New Patient",
            gender: "Perempuan",
            age: 30,
            stage: 1,
        }
        setPatients([...patients, newPatient])
        setTotalPatients(totalPatients + 1)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white p-4 flex justify-between items-center shadow-sm">
                <h1 className="text-xl font-semibold text-[#7986CB]">EsoCare</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                                <AvatarFallback>AS</AvatarFallback>
                            </Avatar>
                            <span>Apridian saputra</span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <main className="flex-1 p-6 grid grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Pasien</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{totalPatients}</p>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardContent className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-xl font-semibold mb-2">Periksa Pasien Baru</h2>
                        <p className="text-gray-600 mb-4 text-center">Lorem ipsum dolor sit amet consectetur.</p>
                        <Button className="bg-[#7986CB] hover:bg-[#5C6BC0] text-white" onClick={handleAddPatient}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Pasien
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pasien</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Cari Pasien"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full"
                            />
                            <div className="flex space-x-2">
                                <Button variant="secondary" size="sm">
                                    Semua
                                </Button>
                                <Button variant="outline" size="sm">
                                    Filter
                                </Button>
                                <Button variant="outline" size="sm">
                                    Filter
                                </Button>
                                <Button variant="outline" size="sm">
                                    Filter
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">Minggu Ini</h3>
                                {patients.map((patient, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-3">
                                            <p className="font-semibold">{patient.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {patient.gender} {patient.age} Tahun Stadium {patient.stage}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
