export function saveRegistration(registration: Registration) {
    localStorage.setItem("registration", JSON.stringify(registration))
}

export function getRegistration(): Registration | null {
    const registration = localStorage.getItem("registration")
    if (registration) {
        return JSON.parse(registration)
    }
    return null
}
