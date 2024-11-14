import { normalize } from "./utils"

const scalePresence = {
    gender: { min: 0, max: 1 },
    age: { min: 100, max: 25 },
    bmi: { min: 0, max: 100 },
    tobaccoHistory: { min: 1, max: 4 },
    refluxHistory: { min: 0, max: 1 },
    alcoholHistory: { min: 0, max: 1 },
    barretsEsophagus: { min: 0, max: 1 },
}

export function normalizePresenceData(data: Presence): PresenceScaled {
    const scaled: PresenceScaled = {
        gender: 0,
        age: 0,
        bmi: 0,
        tobaccoHistory: 0,
        refluxHistory: 0,
        alcoholHistory: 0,
        barretsEsophagus: 0,
    }

    scaled.gender = parseInt(data.gender)
    scaled.age = normalize(data.age, scalePresence.age.min, scalePresence.age.max)
    scaled.bmi = normalize(data.bmi, scalePresence.bmi.min, scalePresence.bmi.max)
    scaled.tobaccoHistory = normalize(
        parseInt(data.tobaccoHistory),
        scalePresence.tobaccoHistory.min,
        scalePresence.tobaccoHistory.max
    )
    scaled.refluxHistory = parseInt(data.refluxHistory)
    scaled.alcoholHistory = parseInt(data.alcoholHistory)
    scaled.barretsEsophagus = parseInt(data.barretsEsophagus)

    return scaled
}
