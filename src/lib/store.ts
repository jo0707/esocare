import { StageResult, StageScaledResult } from "@/app/model/Stage"

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
