from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load pre-trained models
rf_model = pickle.load(open('rf_model.pkl', 'rb'))
lr_model = pickle.load(open('lr_model.pkl', 'rb'))

# Label encoders for categorical fields (must match training)
sex_le = LabelEncoder(); sex_le.fit(['M', 'F'])
cp_le = LabelEncoder(); cp_le.fit(['ATA', 'NAP', 'ASY', 'TA'])  # Add all unique values from your data
restecg_le = LabelEncoder(); restecg_le.fit(['Normal', 'ST', 'LVH'])
exang_le = LabelEncoder(); exang_le.fit(['N', 'Y'])
slope_le = LabelEncoder(); slope_le.fit(['Up', 'Flat', 'Down'])

# Label encoder for Gender
le_gender = LabelEncoder()
le_gender.fit(['Male', 'Female', 'Other'])

all_symptoms = ['Headache', 'Chest pain', 'Fever', 'Nausea', 'Cough', 'Shortness of breath', 'Fatigue']
all_conditions = ['Asthma', 'Cancer', 'Diabetes', 'Hypertension', 'Heart Disease', 'Kidney Disease']

def classify_emergency(prob, emergency_thresh=0.8, no_emergency_thresh=0.4):
    if prob >= emergency_thresh:
        return "emergency"
    elif prob >= no_emergency_thresh:
        return "no_emergency"
    else:
        return "no_admission"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptom_features = [1 if symptom in data['Symptoms'] else 0 for symptom in all_symptoms]
    history_features = [1 if cond in data['Medical_History'] else 0 for cond in all_conditions]
    features = np.array([[
        int(data['Age']),
        le_gender.transform([data['Gender']])[0],
        float(data['SystolicBP']),
        float(data['DiastolicBP']),
        int(data['Heart_Rate']),
        float(data['Temperature']),
        float(data['Oxygen_Saturation']),
        *symptom_features,
        *history_features
    ]])
    rf_prob = rf_model.predict_proba(features)[0][1]
    lr_prob = lr_model.predict_proba(features)[0][1]
    print(f"RF Prob: {rf_prob}, LR Prob: {lr_prob}")
    rf_pred = classify_emergency(rf_prob)
    lr_pred = classify_emergency(lr_prob)
    return jsonify({
        'random_forest_prediction': rf_pred,
        'logistic_regression_prediction': lr_pred
    })

if __name__ == '__main__':
    app.run(debug=True)