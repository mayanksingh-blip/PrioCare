import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix, classification_report
import pickle

# Load the dataset
df = pd.read_csv('hospital_patient_data_with_emergency.csv')

# Parse Blood Pressure into Systolic and Diastolic
df[['SystolicBP', 'DiastolicBP']] = df['Blood_Pressure'].str.split('/', expand=True).astype(float)

# Encode Gender
le_gender = LabelEncoder()
df['Gender'] = le_gender.fit_transform(df['Gender'])

# Binary encode Emergency_Status
df['Emergency_Status'] = df['Emergency_Status'].apply(lambda x: 1 if 'Emergency' in x else 0)

# Handle missing values in Symptoms and Medical_History
df['Symptoms'] = df['Symptoms'].fillna('')
df['Medical_History'] = df['Medical_History'].fillna('')

# Define all possible symptoms and conditions (should match with app side)
all_symptoms = ['Headache', 'Chest pain', 'Fever', 'Nausea', 'Cough', 'Shortness of breath', 'Fatigue']
all_conditions = ['Asthma', 'Cancer', 'Diabetes', 'Hypertension', 'Heart Disease', 'Kidney Disease']

# One-hot encode symptoms
for symptom in all_symptoms:
    df[f'Symptom_{symptom.replace(" ", "_")}'] = df['Symptoms'].str.contains(symptom, case=False).astype(int)

# One-hot encode medical history
for cond in all_conditions:
    df[f'History_{cond.replace(" ", "_")}'] = df['Medical_History'].str.contains(cond, case=False).astype(int)

# Define feature columns
symptom_cols = [f'Symptom_{s.replace(" ", "_")}' for s in all_symptoms]
history_cols = [f'History_{c.replace(" ", "_")}' for c in all_conditions]
features = ['Age', 'Gender', 'SystolicBP', 'DiastolicBP', 'Heart_Rate', 'Temperature', 'Oxygen_Saturation'] + symptom_cols + history_cols

X = df[features]
y = df['Emergency_Status']

# Train/test split with stratification
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Train Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
rf.fit(X_train, y_train)

# Train Logistic Regression
lr = LogisticRegression(max_iter=1000, class_weight='balanced')
lr.fit(X_train, y_train)

# Evaluate Random Forest
y_pred_rf = rf.predict(X_test)
print("\nRandom Forest Evaluation:")
print("Accuracy:", accuracy_score(y_test, y_pred_rf))
print("Precision:", precision_score(y_test, y_pred_rf))
print("Recall:", recall_score(y_test, y_pred_rf))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_rf))

# Evaluate Logistic Regression
y_pred_lr = lr.predict(X_test)
print("\nLogistic Regression Evaluation:")
print("Accuracy:", accuracy_score(y_test, y_pred_lr))
print("Precision:", precision_score(y_test, y_pred_lr))
print("Recall:", recall_score(y_test, y_pred_lr))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred_lr))

# Optional: Detailed report
print("\nClassification Report (Logistic Regression):\n", classification_report(y_test, y_pred_lr))

# Save models
pickle.dump(rf, open('rf_model.pkl', 'wb'))
pickle.dump(lr, open('lr_model.pkl', 'wb'))

print('\n✅ Models trained and saved as rf_model.pkl and lr_model.pkl')
