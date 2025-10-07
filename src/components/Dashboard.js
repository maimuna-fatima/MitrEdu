// Dashboard.js - Updated with proper auth check and visible logout
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getDashboardData } from "./firestoreUtils";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, userProfile, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  // CRITICAL: Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // All available courses
  const allCourses = [
    {
      id: 1,
      title: "HTML, CSS & JavaScript Complete Course",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "Python for Everybody Specialization",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Computer Networks & Protocols",
      category: "Computer Networking",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    },
    {
      id: 4,
      title: "React JS Complete Tutorial",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    },
    {
      id: 5,
      title: "Machine Learning Course",
      category: "AI & Machine Learning",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const fetchDashboardData = async () => {
      if (user) {
        try {
          const data = await getDashboardData(user.uid);
          setDashboardData(data);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setDashboardData({
            userProfile: null,
            coursesWithProgress: [],
            quizAttempts: []
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-loading">
        <p>Unable to load dashboard data. Please refresh the page.</p>
      </div>
    );
  }

  // Get enrolled courses with their details
  const enrolledCoursesWithDetails = (dashboardData.coursesWithProgress || [])
    .map(({ courseId, progress }) => {
      const course = allCourses.find(c => c.id === courseId);
      return course ? { ...course, progress } : null;
    })
    .filter(Boolean);

  // Calculate statistics
  const totalCourses = enrolledCoursesWithDetails.length;
  const completedCourses = enrolledCoursesWithDetails.filter(
    c => c.progress?.percentComplete === 100
  ).length;
  const averageProgress = totalCourses > 0
    ? Math.round(
        enrolledCoursesWithDetails.reduce(
          (sum, c) => sum + (c.progress?.percentComplete || 0),
          0
        ) / totalCourses
      )
    : 0;

  const totalQuizzes = dashboardData?.quizAttempts?.length || 0;
  const averageQuizScore = totalQuizzes > 0
    ? Math.round(
        dashboardData.quizAttempts.reduce(
          (sum, quiz) => sum + (quiz.bestScore || 0),
          0
        ) / totalQuizzes
      )
    : 0;

  return (
    <div className={`dashboard-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Header with Profile Button and Logout */}
      <section className="dashboard-header">
        <div className="welcome-section">
          <h1>
            Welcome back, <span>{userProfile?.name || "Student"}</span>
          </h1>
          <p>Here's your learning progress</p>
        </div>

        <div className="profile-section">
          <div className="profile-button">
            <div 
              className="profile-trigger"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="profile-avatar">
                {userProfile?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="profile-info-inline">
                <h3>{userProfile?.name || "User"}</h3>
                <p>View Profile</p>
              </div>
            </div>

            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-content">
                  <div className="profile-detail">
                    <label>Name</label>
                    <p>{userProfile?.name || "User"}</p>
                  </div>
                  <div className="profile-detail">
                    <label>Email</label>
                    <p>{userProfile?.email}</p>
                  </div>
                  {userProfile?.createdAt && (
                    <div className="profile-detail">
                      <label>Member Since</label>
                      <p>
                        {new Date(
                          userProfile.createdAt.seconds * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Visible Logout Button */}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{totalCourses}</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{completedCourses}</h3>
            <p>Completed Courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{averageProgress}%</h3>
            <p>Average Progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{totalQuizzes}</h3>
            <p>Quizzes Taken</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="dashboard-grid">
        {/* Enrolled Courses */}
        <section className="dashboard-section courses-section">
          <div className="section-header">
            <h2>My Enrolled Courses</h2>
            <button onClick={() => navigate("/courses")} className="view-all-btn">
              View All
            </button>
          </div>

          {enrolledCoursesWithDetails.length === 0 ? (
            <div className="empty-state">
              <p>You haven't enrolled in any courses yet.</p>
              <button onClick={() => navigate("/courses")} className="primary-btn">
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="courses-list">
              {enrolledCoursesWithDetails.map((course) => (
                <div key={course.id} className="dashboard-course-card">
                  <img src={course.image} alt={course.title} />
                  <div className="course-info">
                    <p className="course-category">{course.category}</p>
                    <h3>{course.title}</h3>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${course.progress?.percentComplete || 0}%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {course.progress?.percentComplete || 0}% Complete
                      </span>
                    </div>
                    {course.progress?.startedAt && (
                      <p className="started-date">
                        Started:{" "}
                        {new Date(
                          course.progress.startedAt.seconds * 1000
                        ).toLocaleDateString()}
                      </p>
                    )}
                    <button
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="continue-btn"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quiz Results */}
        <section className="dashboard-section quiz-section">
          <div className="section-header">
            <h2>Recent Quiz Results</h2>
          </div>

          {dashboardData?.quizAttempts?.length === 0 ? (
            <div className="empty-state">
              <p>No quiz attempts yet.</p>
              <button onClick={() => navigate("/quiz")} className="primary-btn">
                Take a Quiz
              </button>
            </div>
          ) : (
            <div className="quiz-list">
              {dashboardData?.quizAttempts?.slice(0, 5).map((quiz) => (
                <div key={quiz.quizId} className="quiz-card">
                  <div className="quiz-info">
                    <h4>{quiz.quizId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                    <p className="quiz-meta">
                      {quiz.totalAttempts} attempt{quiz.totalAttempts !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="quiz-score">
                    <div className="score-circle">
                      <span className="score-value">{quiz.bestScore}%</span>
                    </div>
                    <p className="score-label">Best Score</p>
                  </div>
                  {quiz.lastAttemptDate && (
                    <p className="quiz-date">
                      Last attempt:{" "}
                      {new Date(
                        quiz.lastAttemptDate.seconds * 1000
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;