import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="homepage">
      <section className="hero">

        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          <h1>
            Unlock Your <span className="highlight">Learning Potential</span>
          </h1>
          <p>
             Join MitrEdu and explore a world of knowledge. Take interactive courses, track your progress, and achieve your learning goals at your own pace.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose MitrEdu</h2>
          <p className="features-subtitle">
            A cutting-edge platform combining modern web technologies with personalized learning experiences
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Interactive Courses</h3>
              <p className="feature-description">
                Take advantage of hands-on exercises, quizzes, and projects to reinforce learning and track progress effectively.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Progress Tracking</h3>
              <p className="feature-description">
                Monitor your learning journey with dashboards showing course completion, quiz results, and achievements.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Learn Anywhere</h3>
              <p className="feature-description">
                Access your courses on any device, anytime. Flexible learning that fits your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;