import React, { useState } from "react";
import "../styles/ScorePredictor.css";

const ScorePredictor = () => {
  const initialForm = {
    previous_gpa: "",
    study_hours_per_day: "",
    stress_level: "",
    sleep_hours: "",
    access_to_tutoring: "",
    motivation_level: "",
    exam_anxiety_score: "",
    screen_time: "",
    exercise_frequency: "",
    dropout_risk: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [predictedScore, setPredictedScore] = useState(null);
  const [personalizedTips, setPersonalizedTips] = useState([]);

  // ✅ Handle controlled input changes safely (keep as string)
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Prevent invalid characters in number fields
    if (type === "number" && value !== "" && isNaN(Number(value))) return;

    // Store raw value (string) in state to avoid browser coercion
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert string inputs to numbers safely before sending
      const cleanData = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [
          k,
          v === "" ? 0 : isNaN(Number(v)) ? v : Number(v),
        ])
      );

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      const data = await response.json();
      setPredictedScore(data.predicted_score);

      // Normalize personalized tips (array or string)
      if (Array.isArray(data.personalized_tips)) {
        setPersonalizedTips(data.personalized_tips);
      } else if (typeof data.personalized_tips === "string") {
        setPersonalizedTips(
          data.personalized_tips
            .split(".")
            .map((tip) => tip.trim())
            .filter((tip) => tip)
        );
      } else {
        setPersonalizedTips([]);
      }
    } catch (error) {
      console.error("Error predicting score:", error);
    }
  };

  // ✅ Input metadata with proper scale limits
  const fieldMeta = {
    previous_gpa: { label: "Previous GPA", hint: "Scale: 0.0 - 4.0", col: 1 },
    study_hours_per_day: { label: "Study Hours per Day", hint: "Hours: 0-12", col: 1 },
    stress_level: { label: "Stress Level", hint: "Scale: 1-10 (higher = more stress)", col: 1 },
    sleep_hours: { label: "Sleep Hours per Night", hint: "Hours: 0-12", col: 1 },
    access_to_tutoring: { 
      label: "Access to Tutoring", 
      hint: "", 
      col: 1, 
      type: "select", 
      options: [
        { value: "", label: "Select" },
        { value: "0", label: "No" },
        { value: "1", label: "Yes" }
      ] 
    },
    motivation_level: { label: "Motivation Level", hint: "Scale: 1-10", col: 2 },
    exam_anxiety_score: { label: "Exam Anxiety Score", hint: "Scale: 1-10 (higher = more anxiety)", col: 2 },
    screen_time: { label: "Screen Time (hrs/day)", hint: "Recreational only", col: 2 },
    exercise_frequency: { label: "Exercise Frequency (per week)", hint: "Days: 0-7", col: 2 },
    dropout_risk: { 
      label: "Dropout Risk", 
      hint: "", 
      col: 2, 
      type: "select", 
      options: [
        { value: "", label: "Select" },
        { value: "1", label: "Low" },
        { value: "5", label: "Medium" },
        { value: "10", label: "High" }
      ] 
    },
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "#10b981";
    if (score >= 80) return "#3b82f6";
    if (score >= 70) return "#f59e0b";
    if (score >= 60) return "#f97316";
    return "#ef4444";
  };

  const resetForm = () => {
    setPredictedScore(null);
    setPersonalizedTips([]);
    setFormData(initialForm);
  };

  return (
    <div className="score-predictor-page">
      <div className="score-predictor-wrapper">
        {/* Header */}
        <div className="header-section">
          <h1 className="main-title">
            Exam Score <span className="title-highlight">Predictor</span>
          </h1>
          <p className="subtitle">
            Get personalized insights powered by machine learning to improve your academic performance
          </p>
        </div>

        {!predictedScore ? (
          /* Form Section */
          <div className="form-container">
            <div className="form-header">
              <div className="icon-circle">
                <span className="icon-emoji">🎯</span>
              </div>
              <h2 className="form-title">Score Predictor</h2>
            </div>

            <form onSubmit={handleSubmit} className="predictor-form">
              <div className="form-grid">
                {/* Column 1 */}
                <div className="form-column">
                  {Object.entries(fieldMeta)
                    .filter(([_, meta]) => meta.col === 1)
                    .map(([key, meta]) => (
                      <div key={key} className="form-group">
                        <label className="form-label">
                          {meta.label} <span className="required">*</span>
                        </label>
                        {meta.type === "select" ? (
                          <select
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                            className="form-input"
                          >
                            {meta.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                            className="form-input"
                          />
                        )}
                        {meta.hint && <p className="form-hint">{meta.hint}</p>}
                      </div>
                    ))}
                </div>

                {/* Column 2 */}
                <div className="form-column">
                  {Object.entries(fieldMeta)
                    .filter(([_, meta]) => meta.col === 2)
                    .map(([key, meta]) => (
                      <div key={key} className="form-group">
                        <label className="form-label">
                          {meta.label} <span className="required">*</span>
                        </label>
                        {meta.type === "select" ? (
                          <select
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                            className="form-input"
                          >
                            {meta.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                            className="form-input"
                          />
                        )}
                        {meta.hint && <p className="form-hint">{meta.hint}</p>}
                      </div>
                    ))}
                </div>
              </div>

              <button type="submit" className="submit-button">
                Predict Score
              </button>
            </form>
          </div>
        ) : (
          /* Results Section */
          <div className="results-wrapper">
            {/* Score Display */}
            <div className="score-display-card">
              <h2 className="result-title">Your Predicted Exam Score</h2>
              <div className="score-circle-wrapper">
                <svg className="score-circle-svg" viewBox="0 0 192 192">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke={getScoreColor(predictedScore)}
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${(predictedScore / 100) * 553} 553`}
                    strokeLinecap="round"
                    className="score-circle-progress"
                  />
                </svg>
                <div className="score-circle-content">
                  <span className="score-number" style={{ color: getScoreColor(predictedScore) }}>
                    {predictedScore}
                  </span>
                  <span className="score-label">{getScoreLabel(predictedScore)}</span>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            {personalizedTips.length > 0 && (
              <div className="tips-card">
                <h3 className="tips-title">Personalized Tips to Improve</h3>
                <p className="tips-subtitle">
                  Focus on these evidence-based strategies to boost your performance
                </p>
                <div className="tips-list">
                  {personalizedTips.slice(0, 3).map((tip, index) => {
                    const icons = ["😴", "📱", "💪"];
                    const tipParts = tip.includes(':') ? tip.split(':') : [tip];
                    const tipTitle = tipParts[0] || `Tip ${index + 1}`;
                    const tipContent = tipParts.length > 1 ? tipParts.slice(1).join(':').trim() : tip;
                    
                    return (
                      <div key={index} className="tip-item">
                        <div className="tip-icon">
                          <span>{icons[index] || "💡"}</span>
                        </div>
                        <div className="tip-content">
                          <h4 className="tip-title">{tipTitle}</h4>
                          <p className="tip-description">{tipContent}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reset Button */}
            <button onClick={resetForm} className="reset-button">
              Try Another Prediction
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScorePredictor;