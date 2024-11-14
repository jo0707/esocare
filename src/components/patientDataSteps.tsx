import React from "react"

interface StepItem {
    number: number
    label: string
    isActive: boolean
}

const steps: StepItem[] = [
    { number: 0, label: "Data Diri Pasien", isActive: true },
    { number: 1, label: "Cancer Presence Model", isActive: false },
    { number: 2, label: "Cancer Stage Model", isActive: false },
    { number: 3, label: "Survival Outcome Model", isActive: false },
    { number: 4, label: "Recurrence Risk Model", isActive: false },
    { number: 5, label: "Treatment Response Model", isActive: false },
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
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            step.isActive ? "bg-[#7986CB] text-white" : "bg-[#E3F2FD] text-[#7986CB]"
                        }`}
                    >
                        {step.number}
                    </div>
                    <span className={`text-sm ${step.isActive ? "text-gray-900 font-medium" : "text-[#7986CB]"}`}>
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    )
}
