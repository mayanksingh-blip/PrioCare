import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
import pickle

# Load the new dataset
df = pd.read_csv('hospital_patient_data_with_emergency.csv')

# Parse Blood_Pressure into Systolic and Diastolic
df[['SystolicBP', 'DiastolicBP']] = df['Blood_Pressure'].str.split('/', expand=True).astype(float)

# Encode categorical columns
le_gender = LabelEncoder()
df['Gender'] = le_gender.fit_transform(df['Gender'])

# You may want to encode Symptoms, Allergies, Medical_History as well (possibly multi-label or one-hot)
# For simplicity, let's just encode Emergency_Status as the target
le_status = LabelEncoder()
df['Emergency_Status'] = le_status.fit_transform(df['Emergency_Status'])

# Fill NaN with empty string for multi-label columns
df['Symptoms'] = df['Symptoms'].fillna('')
df['Medical_History'] = df['Medical_History'].fillna('')

# Example for symptoms
all_symptoms = ['Headache', 'Chest pain', 'Fever', 'Nausea', 'Cough', 'Shortness of breath', 'Fatigue']
for symptom in all_symptoms:
    df[f'Symptom_{symptom.replace(" ", "_")}'] = df['Symptoms'].str.contains(symptom, case=False).astype(int)

# Example for medical history
all_conditions = ['Asthma', 'Cancer', 'Diabetes', 'Hypertension', 'Heart Disease', 'Kidney Disease']
for cond in all_conditions:
    df[f'History_{cond.replace(" ", "_")}'] = df['Medical_History'].str.contains(cond, case=False).astype(int)

# Select features (add more as needed)
symptom_cols = [f'Symptom_{symptom.replace(" ", "_")}' for symptom in all_symptoms]
history_cols = [f'History_{cond.replace(" ", "_")}' for cond in all_conditions]
features = ['Age', 'Gender', 'SystolicBP', 'DiastolicBP', 'Heart_Rate', 'Temperature', 'Oxygen_Saturation'] + symptom_cols + history_cols
X = df[features]
y = df['Emergency_Status']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train models
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

lr = LogisticRegression(max_iter=1000)
lr.fit(X_train, y_train)

# Save models
pickle.dump(rf, open('rf_model.pkl', 'wb'))
pickle.dump(lr, open('lr_model.pkl', 'wb'))

print('Models trained and saved as rf_model.pkl and lr_model.pkl')