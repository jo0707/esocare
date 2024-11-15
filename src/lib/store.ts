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

export function savePresenceResult(presenceResult: PresenceResult) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("presenceResult", JSON.stringify(presenceResult))
    }
}

export function getPresenceResult(): PresenceResult | null {
    if (typeof localStorage !== "undefined") {
        const presenceResult = localStorage.getItem("presenceResult")
        if (presenceResult) {
            return JSON.parse(presenceResult)
        }
    }
    return null
}
