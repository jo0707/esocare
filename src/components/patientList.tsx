import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { getPatientResults } from "@/lib/store"
import PredictionResultDialog from "./predictionResult"

const PatientList: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const patients = getPatientResults()
    const [filteredPatients, setFilteredPatients] = useState(patients)
    const [predictionData, setPredictionData] = useState(patients[0])

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
                        className="w-full rounded-full"
                    />
                    <div className="flex flex-col space-y-2">
                        <Button variant="secondary" size="sm" className="w-fit">
                            Semua
                        </Button>
                        <p className="text-sm">
                            Menampilkan {filteredPatients.length} dari {patients.length} pasien
                        </p>
                    </div>
                    <div className="space-y-2">
                        {filteredPatients.map((patient, index) => (
                            <button
                                key={index}
                                className="text-start w-full p-2 border-b-2 border-b-gray-300 hover:bg-gray-100 transition"
                                onClick={() => {
                                    setPredictionData(patient)
                                    setOpen(true)
                                }}
                            >
                                <p className="font-semibold capitalize ">{patient.name}</p>
                                <div className="text-gray-600 text-sm flex flex-wrap gap-4">
                                    <p>{patient.gender == "0" ? "Laki-Laki" : "Perempuan"}</p>
                                    <p>{patient.age} Tahun</p>
                                    <p>{patient.stage}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </CardContent>

            <PredictionResultDialog open={open} onOpenChange={setOpen} data={predictionData} />
        </Card>
    )
}

export default PatientList
