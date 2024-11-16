import onnxruntime as rt
import numpy as np

# Load the ONNX model
sess = rt.InferenceSession("optimized_survival_outcome_model.onnx")

# Sample normalized data for Model 3 (replace with your actual normalized values)
# Columns: stage_event_pathologic_stage, person_neoplasm_cancer_status, BMI, primary_pathology_residual_tumor,
#          primary_pathology_neoplasm_histologic_grade, has_drugs_information, has_radiations_information,
#          primary_pathology_radiation_therapy
sample_data_model3 = [
    [0.36, 0, 0.24, 0, 0.33, 1, 1, 0],  # Example 11
]

# Get the model's input name
input_name = sess.get_inputs()[0].name

# Convert to NumPy array
input_data_model3 = np.array(sample_data_model3, dtype=np.float32)

# Perform inference
pred_onx_model3 = sess.run(None, {input_name: input_data_model3})

# Get predicted probabilities (float values)
predicted_probabilities_model3 = pred_onx_model3[0]

# Print predictions as float probabilities
for i in range(len(sample_data_model3)):
    print(f"Sample {i + 1}:")
    print(f"  Input: {sample_data_model3[i]}")
    print(f"  Predicted Probabilities: {pred_onx_model3}")
    # print(f"  Predicted Output (Deceased Probability): {predicted_probabilities_model3[i][0]:.4f}")
    print("-" * 20)