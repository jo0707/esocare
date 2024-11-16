class Presence {
    gender: string
    tobaccoHistory: string
    refluxHistory: string
    alcoholHistory: string
    barretsEsophagus: string
    age: number
    bmi: number

    constructor() {
        this.gender = "0"
        this.tobaccoHistory = "1"
        this.refluxHistory = "0"
        this.alcoholHistory = "0"
        this.barretsEsophagus = "0"
        this.age = 25
        this.bmi = 25
    }
}

// create PresenceScaled class
interface PresenceScaled {
    gender: number
    tobaccoHistory: number
    refluxHistory: number
    alcoholHistory: number
    barretsEsophagus: number
    age: number
    bmi: number
}

interface PresenceScaledResult {
    gender: number
    tobaccoHistory: number
    refluxHistory: number
    alcoholHistory: number
    barretsEsophagus: number
    result: number
    age: number
    bmi: number
}

interface presenceResult {
    gender: string
    tobaccoHistory: string
    refluxHistory: string
    alcoholHistory: string
    barretsEsophagus: string
    result: number
    age: number
    bmi: number
}
