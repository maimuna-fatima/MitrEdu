from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load model and encoders
try:
    model = pickle.load(open("exam_model.pkl", "rb"))
    encoders = pickle.load(open("encoders.pkl", "rb"))
    print("✅ Model and encoders loaded successfully.")
except Exception as e:
    print("❌ Error loading model or encoders:", e)
    model, encoders = None, {}

@app.route('/')
def home():
    return jsonify({"message": "Score Predictor Backend is Running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive input from frontend
        data = request.get_json()
        print("\n✅ Received data:", data)

        # Expected features (10 only)
        expected_features = [
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

        # Convert input to DataFrame
        df = pd.DataFrame([data])
        print("📋 DataFrame before processing:\n", df)

        # Rename frontend fields if necessary
        rename_map = {"sleep_hours_per_night": "sleep_hours"}
        df.rename(columns=rename_map, inplace=True)

        # Fill missing expected columns
        for col in expected_features:
            if col not in df.columns:
                df[col] = 0

        # Keep only expected columns
        df = df[expected_features]
        print("✅ DataFrame aligned to model features:\n", df)

        # Encode categorical columns if needed
        for col, le in encoders.items():
            if col in df.columns:
                try:
                    df[col] = le.transform(df[col].astype(str))
                except Exception as e:
                    print(f"⚠️ Encoding issue in {col}: {e}")
                    df[col] = 0  # fallback

        print("✅ DataFrame after encoding:\n", df)

        # Convert to numeric
        df = df.apply(pd.to_numeric, errors='coerce').fillna(0)

        # Predict score
        prediction = model.predict(df)[0]
        print(f"🎯 Predicted Exam Score: {prediction:.2f}")

        # -------------------------------
        # Generate Personalized Tips
        # -------------------------------
        tips = []

        # Convert safely to float/int for checks
        try:
            sleep = float(data.get("sleep_hours", 0))
            screen = float(data.get("screen_time", 0))
            study = float(data.get("study_hours_per_day", 0))
            stress = float(data.get("stress_level", 0))
            exercise = float(data.get("exercise_frequency", 0))
            motivation = float(data.get("motivation_level", 0))
            anxiety = float(data.get("exam_anxiety_score", 0))
            tutoring = int(data.get("access_to_tutoring", 0))
        except:
            sleep = screen = study = stress = exercise = motivation = anxiety = tutoring = 0

        # --- Rule-based suggestions ---
        if sleep < 6:
            tips.append("Try to get at least 7–8 hours of sleep regularly.")
        if screen > 6:
            tips.append("Reduce recreational screen time to less than 4 hours daily.")
        if study < 2:
            tips.append("Increase your daily study time for consistent improvement.")
        if stress > 7:
            tips.append("Practice meditation or light exercise to reduce stress levels.")
        if motivation < 5:
            tips.append("Set small, achievable goals to boost motivation.")
        if anxiety > 7:
            tips.append("Try deep breathing or relaxation techniques to control exam anxiety.")
        if tutoring == 0:
            tips.append("Consider joining a study group or using online tutoring resources.")
        if exercise < 3:
            tips.append("Include physical activity at least 3 times a week to improve focus.")

        # Tips based on predicted score
        if prediction < 60:
            tips.append("Focus on weak subjects and revise concepts regularly.")
        elif prediction >= 85:
            tips.append("Excellent! Maintain consistency and help peers to reinforce your learning.")

        print("💡 Generated Tips:", tips)

        return jsonify({
            "predicted_score": round(float(prediction), 2),
            "personalized_tips": tips
        })

    except Exception as e:
        print("❌ Error during prediction:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
