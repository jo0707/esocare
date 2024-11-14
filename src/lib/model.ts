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
