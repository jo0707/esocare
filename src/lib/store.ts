import { StageResult, StageScaledResult } from "@/model/Stage"

export function saveRegistration(registration: Registration) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("registration", JSON.stringify(registration))
    }
}

export function getRegistration(): Registration | null {
    if (typeof localStorage !== "undefined") {
        const registration = localStorage.getItem("registration")
        if (registration) {
            return JSON.parse(registration)
        }
    }
    return null
}

export function savePresenceResult(presenceResult: presenceResult) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("presenceResult", JSON.stringify(presenceResult))
    }
}

export function getPresenceResult(): presenceResult | null {
    if (typeof localStorage !== "undefined") {
        const presenceResult = localStorage.getItem("presenceResult")
        if (presenceResult) {
            return JSON.parse(presenceResult)
        }
    }
    return null
}

export function saveStageResult(stageResult: StageResult) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("stageResult", JSON.stringify(stageResult))
    }
}

export function getStageResult(): StageResult | null {
    if (typeof localStorage !== "undefined") {
        const stageResult = localStorage.getItem("stageResult")
        if (stageResult) {
            return JSON.parse(stageResult)
        }
    }
    return null
}

export function saveSurvivalResult(survivalResult: SurvivalResult) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("survivalResult", JSON.stringify(survivalResult))
    }
}

export function getSurvivalResult(): SurvivalResult | null {
    if (typeof localStorage !== "undefined") {
        const survivalResult = localStorage.getItem("survivalResult")
        if (survivalResult) {
            return JSON.parse(survivalResult)
        }
    }
    return null
}

export function saveRecurrenceResult(recurrenceResult: RecurrenceResult) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("recurrenceResult", JSON.stringify(recurrenceResult))
    }
}

export function getRecurrenceResult(): RecurrenceResult | null {
    if (typeof localStorage !== "undefined") {
        const recurrenceResult = localStorage.getItem("recurrenceResult")
        if (recurrenceResult) {
            return JSON.parse(recurrenceResult)
        }
    }
    return null
}

export function saveTreatmentResult(treatmentResult: TreatmentResult) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("treatmentResult", JSON.stringify(treatmentResult))
    }
}

export function getTreatmentResult(): TreatmentResult | null {
    if (typeof localStorage !== "undefined") {
        const treatmentResult = localStorage.getItem("treatmentResult")
        if (treatmentResult) {
            return JSON.parse(treatmentResult)
        }
    }
    return null
}

export function getPatientResults(): Patient[] {
    // const dummy: Patient[] = [
    //     {
    //         name: "Alfajar",
    //         age: 30,
    //         gender: "1",
    //         bmi: 26.122448979591837,
    //         presence: 0.8099995255470276,
    //         stageIndex: 4,
    //         stage: "Stage IIA",
    //         survival: 1,
    //         recurrence: 0.2200000286102295,
    //         treatmentResponseIndex: 0,
    //         treatmentResponse: "R0",
    //     },
    //     {
    //         name: "Freddy Harahap",
    //         age: 50,
    //         gender: "1",
    //         bmi: 39.06249999999999,
    //         presence: 0.5599997639656067,
    //         stageIndex: 6,
    //         stage: "Stage III",
    //         survival: 0.570000171661377,
    //         recurrence: 0.4499998390674591,
    //         treatmentResponseIndex: 0,
    //         treatmentResponse: "R0",
    //     },
    //     {
    //         name: "Joshua Sinaga",
    //         age: 80,
    //         gender: "1",
    //         bmi: 31.14186851211073,
    //         presence: 0.969999372959137,
    //         stageIndex: 8,
    //         stage: "Stage IIIB",
    //         survival: 0.8500000238418579,
    //         recurrence: 0.09999998658895493,
    //         treatmentResponseIndex: 3,
    //         treatmentResponse: "RX",
    //     },
    // ]

    if (typeof localStorage !== "undefined") {
        const patientResults = localStorage.getItem("patientResults")
        if (patientResults != null) {
            return JSON.parse(patientResults)
        }
    }
    return []
}

export function savePatientResult(patientResult: Patient) {
    if (typeof localStorage !== "undefined") {
        // append patient result to the list
        const patientResults = getPatientResults()
        if (patientResults) {
            patientResults.push(patientResult)
            localStorage.setItem("patientResults", JSON.stringify(patientResults))
        } else {
            localStorage.setItem("patientResults", JSON.stringify([patientResult]))
        }
    }
}
