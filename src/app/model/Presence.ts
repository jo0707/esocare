class Presence {
    gender: string
    age: number
    bmi: number
    tobaccoHistory: string
    refluxHistory: string
    alcoholHistory: string
    barretsEsophagus: string

    constructor() {
        this.gender = "0"
        this.age = 25
        this.bmi = 25
        this.tobaccoHistory = "1"
        this.refluxHistory = "0"
        this.alcoholHistory = "0"
        this.barretsEsophagus = "0"
    }
}

// create PresenceScaled class
interface PresenceScaled {
    gender: number
    age: number
    bmi: number
    tobaccoHistory: number
    refluxHistory: number
    alcoholHistory: number
    barretsEsophagus: number
}

interface PresenceResult {
    gender: number
    age: number
    bmi: number
    tobaccoHistory: number
    refluxHistory: number
    alcoholHistory: number
    barretsEsophagus: number
    result: number
}
