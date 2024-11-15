import { Stage, StageScaled } from "@/app/model/Stage"
import { normalize } from "./utils"

const scalePresence = {
    gender: { min: 0, max: 1 },
    age: { min: 100, max: 25 },
    bmi: { min: 10, max: 70 },
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

const scaleStage = {
    icd10: { min: 0, max: 4 },
    icdOSite: { min: 0, max: 5 },
    histologicalType: { min: 0, max: 1 },
    histologicalGrade: { min: 0, max: 3 },
    tnmCategories: { min: 0, max: 53 },
}

export function normalizeStageData(data: Stage): StageScaled {
    const scaled: StageScaled = {
        icd10: 0,
        icdOSite: 0,
        histologicalType: 0,
        histologicalGrade: 0,
        tnmCategories: 0,
    }

    scaled.icd10 = normalize(parseInt(data.icd10), scaleStage.icd10.min, scaleStage.icd10.max)
    scaled.icdOSite = normalize(parseInt(data.icdOSite), scaleStage.icdOSite.min, scaleStage.icdOSite.max)
    scaled.histologicalType = parseInt(data.histologicalType)
    scaled.histologicalGrade = normalize(
        parseInt(data.histologicalGrade),
        scaleStage.histologicalGrade.min,
        scaleStage.histologicalGrade.max
    )
    scaled.tnmCategories = normalize(
        parseInt(data.tnmCategories),
        scaleStage.tnmCategories.min,
        scaleStage.tnmCategories.max
    )

    return scaled
}

const scaleSurvival = {
    stageEventPathologicStage: { min: 0, max: 11 },
    personNeoplasmCancerStatus: { min: 0, max: 1 },
    bmi: { min: 10, max: 70 },
    primaryPathologyResidualTumor: { min: 0, max: 3 },
    primaryPathologyNeoplasmHistologicGrade: { min: 0, max: 3 },
    hasDrugsInformation: { min: 0, max: 1 },
    hasRadiationsInformation: { min: 0, max: 1 },
    primaryPathologyRadiationTherapy: { min: 0, max: 1 },
}

export function normalizeSurvivalData(data: Survival): SurvivalScaled {
    const scaled: SurvivalScaled = {
        stageEventPathologicStage: 0,
        personNeoplasmCancerStatus: 0,
        bmi: 0,
        primaryPathologyResidualTumor: 0,
        primaryPathologyNeoplasmHistologicGrade: 0,
        hasDrugsInformation: 0,
        hasRadiationsInformation: 0,
        primaryPathologyRadiationTherapy: 0,
    }

    scaled.stageEventPathologicStage = normalize(
        parseInt(data.stageEventPathologicStage),
        scaleSurvival.stageEventPathologicStage.min,
        scaleSurvival.stageEventPathologicStage.max
    )
    scaled.personNeoplasmCancerStatus = parseInt(data.personNeoplasmCancerStatus)
    scaled.bmi = normalize(data.bmi, scaleSurvival.bmi.min, scaleSurvival.bmi.max)
    scaled.primaryPathologyResidualTumor = normalize(
        parseInt(data.primaryPathologyResidualTumor),
        scaleSurvival.primaryPathologyResidualTumor.min,
        scaleSurvival.primaryPathologyResidualTumor.max
    )
    scaled.primaryPathologyNeoplasmHistologicGrade = normalize(
        parseInt(data.primaryPathologyNeoplasmHistologicGrade),
        scaleSurvival.primaryPathologyNeoplasmHistologicGrade.min,
        scaleSurvival.primaryPathologyNeoplasmHistologicGrade.max
    )
    scaled.hasDrugsInformation = parseInt(data.hasDrugsInformation)
    scaled.hasRadiationsInformation = parseInt(data.hasRadiationsInformation)
    scaled.primaryPathologyRadiationTherapy = parseInt(data.primaryPathologyRadiationTherapy)

    return scaled
}
