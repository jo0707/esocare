import onnxruntime
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Load the ONNX model
session = onnxruntime.InferenceSession("optimized_cancer_presence_model.onnx")

# Sample Data and Expected Values
# sample_data = [
#     [1, 1, 0, 1, 0, -15000, 25],  # Sample 1
#     [0, 0, 1, 0, 1, -20000, 30],  # Sample 2
#     [1, 2, 1, 1, 1, -10000, 22]   # Sample 3
# ]

# Sample Data (Scaled between 0 and 1) and Expected Values
sample_data = [
    [1.0, 0.5, 0.0, 1.0, 0.0, 0.6, 0.375],  # Sample 1
    [0.0, 0.0, 1.0, 0.0, 1.0, 0.4, 0.5],  # Sample 2
    [1.0, 1.0, 1.0, 1.0, 1.0, 0.7, 0.3],  # Sample 3
]

expected_values = [0, 1, 1]  # Expected values for each sample

# Get input name
input_name = session.get_inputs()[0].name

# Predict one by one
for i, data_point in enumerate(sample_data):
    # Convert data point to NumPy array with correct shape and data type
    input_data = {input_name: np.array([data_point], dtype=np.float32)}

    # Perform prediction
    predictions = session.run(None, input_data)

    # Get predicted class
    predicted_class = predictions[0][0]  # Access the first element of the output

    # Compare with expected value
    expected_value = expected_values[i]
    print(f"Sample {i + 1}: Predicted Class = {predicted_class}, Expected = {expected_value}, Match = {predicted_class == expected_value}")
    