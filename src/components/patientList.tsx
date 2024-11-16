import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { getPatientResults } from "@/lib/store"

interface Patient {
    name: string
    gender: string
    age: number
    stage: number
}

interface PatientListProps {
    patients: Patient[]
    totalPatients: number
    onAddPatient: (newPatient: Patient) => void
}

const PatientList: React.FC<PatientListProps> = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const patients = getPatientResults()
    const [filteredPatients, setFilteredPatients] = useState(patients)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        const filtered = patients.filter((patient) =>
            patient.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setFilteredPatients(filtered)
    }

    return (
        <Card className="border-none">
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
                    </div>
                    <div className="space-y-2">
                        {filteredPatients.map((patient, index) => (
                            <Card key={index} className="shadow-sm">
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
    )
}

export default PatientList
