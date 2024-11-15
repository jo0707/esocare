class Treatment {
    stageEventPathologicStage: string
    hasNewTumorEventsInformation: string
    primaryPathologyHistologicalType: string
    primaryPathologyNeoplasmHistologicGrade: string
    primaryPathologyRadiationTherapy: string
    primaryPathologyPostoperativeRxTx: string
    bmi: number

    constructor(
        stageEventPathologicStage: string,
        hasNewTumorEventsInformation: string,
        primaryPathologyHistologicalType: string,
        primaryPathologyNeoplasmHistologicGrade: string,
        primaryPathologyRadiationTherapy: string,
        primaryPathologyPostoperativeRxTx: string,
        bmi: number
    ) {
        this.stageEventPathologicStage = stageEventPathologicStage
        this.hasNewTumorEventsInformation = hasNewTumorEventsInformation
        this.primaryPathologyHistologicalType = primaryPathologyHistologicalType
        this.primaryPathologyNeoplasmHistologicGrade = primaryPathologyNeoplasmHistologicGrade
        this.primaryPathologyRadiationTherapy = primaryPathologyRadiationTherapy
        this.primaryPathologyPostoperativeRxTx = primaryPathologyPostoperativeRxTx
        this.bmi = bmi
    }
}

// Create TreatmentScaled class
interface TreatmentScaled {
    stageEventPathologicStage: number
    hasNewTumorEventsInformation: number
    primaryPathologyHistologicalType: number
    primaryPathologyNeoplasmHistologicGrade: number
    primaryPathologyRadiationTherapy: number
    primaryPathologyPostoperativeRxTx: number
    bmi: number
}

interface TreatmentScaledResult {
    stageEventPathologicStage: number
    hasNewTumorEventsInformation: number
    primaryPathologyHistologicalType: number
    primaryPathologyNeoplasmHistologicGrade: number
    primaryPathologyRadiationTherapy: number
    primaryPathologyPostoperativeRxTx: number
    bmi: number
    result: number[]
}

interface TreatmentResult {
    stageEventPathologicStage: string
    hasNewTumorEventsInformation: string
    primaryPathologyHistologicalType: string
    primaryPathologyNeoplasmHistologicGrade: string
    primaryPathologyRadiationTherapy: string
    primaryPathologyPostoperativeRxTx: string
    bmi: number
    result: number[]
}
