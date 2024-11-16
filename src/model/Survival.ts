class Survival {
    stageEventPathologicStage: string
    personNeoplasmCancerStatus: string
    bmi: number
    primaryPathologyResidualTumor: string
    primaryPathologyNeoplasmHistologicGrade: string
    hasDrugsInformation: string
    hasRadiationsInformation: string
    primaryPathologyRadiationTherapy: string

    constructor(
        stageEventPathologicStage: string,
        personNeoplasmCancerStatus: string,
        bmi: number,
        primaryPathologyResidualTumor: string,
        primaryPathologyNeoplasmHistologicGrade: string,
        hasDrugsInformation: string,
        hasRadiationsInformation: string,
        primaryPathologyRadiationTherapy: string
    ) {
        this.stageEventPathologicStage = stageEventPathologicStage
        this.personNeoplasmCancerStatus = personNeoplasmCancerStatus
        this.bmi = bmi
        this.primaryPathologyResidualTumor = primaryPathologyResidualTumor
        this.primaryPathologyNeoplasmHistologicGrade = primaryPathologyNeoplasmHistologicGrade
        this.hasDrugsInformation = hasDrugsInformation
        this.hasRadiationsInformation = hasRadiationsInformation
        this.primaryPathologyRadiationTherapy = primaryPathologyRadiationTherapy
    }
}

// create SurvivalScaled class
interface SurvivalScaled {
    stageEventPathologicStage: number
    personNeoplasmCancerStatus: number
    bmi: number
    primaryPathologyResidualTumor: number
    primaryPathologyNeoplasmHistologicGrade: number
    hasDrugsInformation: number
    hasRadiationsInformation: number
    primaryPathologyRadiationTherapy: number
}

interface SurvivalScaledResult {
    stageEventPathologicStage: number
    personNeoplasmCancerStatus: number
    bmi: number
    primaryPathologyResidualTumor: number
    primaryPathologyNeoplasmHistologicGrade: number
    hasDrugsInformation: number
    hasRadiationsInformation: number
    primaryPathologyRadiationTherapy: number
    result: number
}

interface SurvivalResult {
    stageEventPathologicStage: string
    personNeoplasmCancerStatus: string
    bmi: number
    primaryPathologyResidualTumor: string
    primaryPathologyNeoplasmHistologicGrade: string
    hasDrugsInformation: string
    hasRadiationsInformation: string
    primaryPathologyRadiationTherapy: string
    result: number
}
