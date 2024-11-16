class Recurrence {
    stageEventPathologicStage: string
    vitalStatus: string
    primaryPathologyResidualTumor: string
    personNeoplasmCancerStatus: string
    primaryPathologyNeoplasmHistologicGrade: string
    primaryPathologyRadiationTherapy: string
    primaryPathologyPostoperativeRxTx: string
    bmi: number

    constructor(
        stageEventPathologicStage: string,
        vitalStatus: string,
        primaryPathologyResidualTumor: string,
        personNeoplasmCancerStatus: string,
        primaryPathologyNeoplasmHistologicGrade: string,
        primaryPathologyRadiationTherapy: string,
        primaryPathologyPostoperativeRxTx: string,
        bmi: number
    ) {
        this.stageEventPathologicStage = stageEventPathologicStage
        this.vitalStatus = vitalStatus
        this.primaryPathologyResidualTumor = primaryPathologyResidualTumor
        this.personNeoplasmCancerStatus = personNeoplasmCancerStatus
        this.primaryPathologyNeoplasmHistologicGrade = primaryPathologyNeoplasmHistologicGrade
        this.primaryPathologyRadiationTherapy = primaryPathologyRadiationTherapy
        this.primaryPathologyPostoperativeRxTx = primaryPathologyPostoperativeRxTx
        this.bmi = bmi
    }
}

// Create RecurrenceScaled class
interface RecurrenceScaled {
    stageEventPathologicStage: number
    vitalStatus: number
    primaryPathologyResidualTumor: number
    personNeoplasmCancerStatus: number
    primaryPathologyNeoplasmHistologicGrade: number
    primaryPathologyRadiationTherapy: number
    primaryPathologyPostoperativeRxTx: number
    bmi: number
}

interface RecurrenceScaledResult {
    stageEventPathologicStage: number
    vitalStatus: number
    primaryPathologyResidualTumor: number
    personNeoplasmCancerStatus: number
    primaryPathologyNeoplasmHistologicGrade: number
    primaryPathologyRadiationTherapy: number
    primaryPathologyPostoperativeRxTx: number
    bmi: number
    result: number
}

interface RecurrenceResult {
    stageEventPathologicStage: string
    vitalStatus: string
    primaryPathologyResidualTumor: string
    personNeoplasmCancerStatus: string
    primaryPathologyNeoplasmHistologicGrade: string
    primaryPathologyRadiationTherapy: string
    primaryPathologyPostoperativeRxTx: string
    bmi: number
    result: number
}
