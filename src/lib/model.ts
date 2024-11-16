import { StageScaled, StageScaledResult } from "@/model/Stage"
import ort from "onnxruntime-web"

export async function predictPresence(scaledPresence: PresenceScaled): Promise<number> {
    const session = await ort.InferenceSession.create("/model/optimized_cancer_presence_model.onnx")
    const results = await session.run({
        float_input: new ort.Tensor(new Float32Array(Object.values(scaledPresence)), [1, 7]),
    })
    console.log(results)
    const yes = results.probabilities.data[1] as number
    return yes
}

export async function predictStage(scaledStage: StageScaled): Promise<StageScaledResult> {
    const session = await ort.InferenceSession.create("/model/optimized_cancer_stage_model.onnx")
    const results = await session.run({
        float_input: new ort.Tensor(new Float32Array(Object.values(scaledStage)), [1, 5]),
    })
    console.log(results)
    const result = Array.from(results.probabilities.data as Float32Array) as number[]
    return { ...scaledStage, result }
}

export async function predictSurvival(scaledSurvival: SurvivalScaled): Promise<SurvivalScaledResult> {
    const session = await ort.InferenceSession.create("/model/optimized_survival_outcome_model.onnx")
    const results = await session.run({
        float_input: new ort.Tensor(new Float32Array(Object.values(scaledSurvival)), [1, 8]),
    })
    console.log(results)
    const result = results.probabilities.data[1] as number

    return { ...scaledSurvival, result }
}

export async function predictRecurrence(scaledRecurrence: RecurrenceScaled): Promise<RecurrenceScaledResult> {
    const session = await ort.InferenceSession.create("/model/optimized_recurrence_risk_model.onnx")
    const results = await session.run({
        float_input: new ort.Tensor(new Float32Array(Object.values(scaledRecurrence)), [1, 8]),
    })
    console.log(results)
    const result = results.probabilities.data[1] as number
    return { ...scaledRecurrence, result }
}

export async function predictTreatmentResponse(
    scaledTreatmentResponse: TreatmentScaled
): Promise<TreatmentScaledResult> {
    const session = await ort.InferenceSession.create("/model/optimized_treatment_response_model.onnx")
    const results = await session.run({
        float_input: new ort.Tensor(new Float32Array(Object.values(scaledTreatmentResponse)), [1, 7]),
    })
    console.log(results)
    const result = Array.from(results.probabilities.data as Float32Array) as number[]
    return { ...scaledTreatmentResponse, result }
}
