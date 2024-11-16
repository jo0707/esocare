"use client"

import React, { Children, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import PatientList from "@/components/patientList"
import Header from "@/components/header"

export default function PatientExaminationForm({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#F1F3FF]">
            <div className="rounded-lg overflow-clip m-6 mb-0">
                <Header />
            </div>

            <main className="flex-1 p-6 grid grid-cols-3 gap-6">
                <Card className="col-span-2 border-none">{children}</Card>
                <PatientList />
            </main>
        </div>
    )
}
