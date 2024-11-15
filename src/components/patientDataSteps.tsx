import Link from "next/link"
import React from "react"

interface StepItem {
    number: number
    route: string
    label: string
    isActive: boolean
}

const steps: StepItem[] = [
    { number: 1, route: "/periksa/register", label: "Data Diri Pasien", isActive: true },
    { number: 2, route: "/periksa/cancer-presence", label: "Cancer Presence", isActive: false },
    { number: 3, route: "/periksa/cancer-stage", label: "Cancer Stage", isActive: false },
    { number: 4, route: "/periksa/cancer-survival-outcome", label: "Survival Outcome", isActive: false },
    {
        number: 5,
        route: "/periksa/cancer-reccurence-risk",
        label: "Recurrence Risk & Treatment Response",
        isActive: false,
    },
]

export default function PatientDataSteps({ currentStep }: { currentStep: number }) {
    steps.forEach((step, index) => {
        step.isActive = index === currentStep
    })

    return (
        <div className="space-y-2">
            {steps.map((step) => (
                <div key={step.number} className="flex items-center space-x-3">
                    <div
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                            step.isActive ? "bg-[#7986CB] text-white" : "bg-[#E3F2FD] text-[#7986CB]"
                        }`}
                    >
                        {/* <div className="h-10 w-1 bg-violet-400 absolute"></div> */}
                        {step.number}
                    </div>
                    <Link
                        href={step.route}
                        className={`text-sm hover:underline hover:text-[#586ac5] ${
                            step.isActive ? "text-gray-900 font-medium" : "text-[#7986CB]"
                        }`}
                    >
                        {step.label}
                    </Link>
                </div>
            ))}
        </div>
    )
}
