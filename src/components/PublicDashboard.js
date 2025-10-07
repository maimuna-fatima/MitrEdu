// PublicDashboard.js - Standard dashboard for non-logged-in users
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const PublicDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`dashboard-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Header */}
      <section className="dashboard-header">
        <div className="welcome-section">
          <h1>
            Welcome to <span>MitrEdu Dashboard</span>
          </h1>
          <p>Login to access your personalized learning dashboard</p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Track Progress</h3>
            <p>Monitor your course completion</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>View Courses</h3>
            <p>Access all enrolled courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Quiz Results</h3>
            <p>See your quiz performance</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Achievements</h3>
            <p>Track your milestones</p>
          </div>
        </div>
      </section>

      {/* Main Call to Action */}
      <div className="dashboard-grid">
        <section className="dashboard-section" style={{ gridColumn: '1 / -1' }}>
          <div className="empty-state" style={{ 
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            borderRadius: '12px',
            border: '2px dashed rgba(99, 102, 241, 0.3)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
                Login to Access Your Personalized Dashboard
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem' }}>
                Sign in to view your enrolled courses, track your progress, see quiz results, and access all your learning data.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate("/login")} 
                className="primary-btn"
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Login Now
              </button>
              
              <button 
                onClick={() => navigate("/signup")} 
                className="primary-btn"
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Create Account
              </button>
            </div>

            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📖</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937' }}>Course Tracking</h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Keep track of all your enrolled courses and learning progress in one place</p>
              </div>

              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937' }}>Progress Analytics</h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>View detailed statistics and visualizations of your learning journey</p>
              </div>

              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937' }}>Quiz History</h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Access all your quiz attempts, scores, and performance insights</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicDashboard;