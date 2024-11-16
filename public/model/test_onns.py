import onnxruntime as rt
import numpy as np

# Load the ONNX model
sess = rt.InferenceSession("optimized_cancer_presence_model.onnx")

# Sample normalized data (replace with your actual normalized values)
sample_data = [
    [0, 0, 0, 0, 0, 0.5, 0.6],  # Example 1
    [1, 1, 1, 1, 1, 0.2, 0.8],  # Example 2
    [0, 1, 0, 1, 0, 0.7, 0.4],  # Example 3
    [1, 0, 1, 0, 1, 0.3, 0.9],  # Example 4
    [0, 0, 1, 1, 0, 0.9, 0.5],  # Example 5
    [1, 0, 0, 1, 1, 0.4, 0.7],  # Example 6
    [0, 1, 1, 0, 0, 0.6, 0.3],  # Example 7
    [1, 1, 0, 0, 1, 0.8, 0.6],  # Example 8
    [0, 0, 1, 0, 0, 0.1, 0.9],  # Example 9
    [1, 1, 1, 1, 0, 0.7, 0.5],  # Example 10
    [0, 1, 0, 0, 1, 0.3, 0.6],  # Example 11
    [1, 0, 1, 1, 0, 0.9, 0.4],  # Example 12
    [0, 0, 0, 1, 1, 0.2, 0.7],  # Example 13
    [1, 1, 0, 1, 0, 0.5, 0.3],  # Example 14
    [0, 1, 1, 0, 1, 0.8, 0.9]   # Example 15
]


# Expected outputs (0: Cancer not present, 1: Cancer present)
expected_outputs = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]  

# Convert to NumPy array
input_data = np.array(sample_data, dtype=np.float32)

# Get the model's input name
input_name = sess.get_inputs()[0].name

# Perform inference
pred_onx = sess.run(None, {input_name: input_data})

# Get predicted labels (0 or 1)
predicted_labels = pred_onx[0]

# Print predictions and expected outputs
for i in range(len(sample_data)):
    print(f"Sample {i + 1}:")
    print(f"  Input: {sample_data[i]}")
    # print(f"  Predicted Output: {0 if pred_onx[1][i][1] >= .5 else 1}")
    print(f"  Predicted Output: {pred_onx[1][i]}")
    print(f"  Expected Output: {expected_outputs[i]}") 
    print("-" * 20)