import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle

# Load dataset
df = pd.read_csv("data.csv")

# Select only the features you want to train on
features = [
    'previous_gpa',
    'study_hours_per_day',
    'stress_level',
    'sleep_hours',
    'access_to_tutoring',
    'motivation_level',
    'exam_anxiety_score',
    'screen_time',
    'exercise_frequency',
    'dropout_risk'
]

target = 'exam_score'

# Keep only the required columns
df = df[features + [target]].dropna()

# Handle categorical columns if any (like 'access_to_tutoring' or 'dropout_risk')
categorical_cols = [col for col in features if df[col].dtype == 'object']

encoders = {}
for col in categorical_cols:
    from sklearn.preprocessing import LabelEncoder
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

# Split data
X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and encoders
pickle.dump(model, open("exam_model.pkl", "wb"))
pickle.dump(encoders, open("encoders.pkl", "wb"))

print("✅ Model trained successfully and saved as exam_model.pkl & encoders.pkl")
