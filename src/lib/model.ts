import { StageScaled, StageResult } from "@/app/model/Stage"
import ort from "onnxruntime-web"

export async function predictPresence(scaledPresence: PresenceScaled): Promise<number> {
    const session = await ort.InferenceSession.create("/model/optimized_cancer_presence_model.onnx")
    const results = await session.run({
        float_input: new ort.Tensor(new Float32Array(Object.values(scaledPresence)), [1, 7]),
    })
    console.log(results)
    const yes = results.probabilities.data[0] as number
    return yes
}

export async function predictStage(scaledStage: StageScaled): Promise<StageResult> {
    const session = await ort.InferenceSession.create("/model/optimized_cancer_stage_model.onnx")
    const results = await session.run({
        float_input: new ort.Tensor(new Float32Array(Object.values(scaledStage)), [1, 5]),
    })
    console.log(results)
    const result = Array.from(results.probabilities.data as Float32Array) as number[]
    return { ...scaledStage, result }
}
