// App.js - Updated with Public and Private routing
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

// Import Public (Standard) Components
import PublicCourses from "./components/PublicCourses";
import PublicDashboard from "./components/PublicDashboard";
import PublicQuiz from "./components/PublicQuiz";

// Import Private (Personalized) Components
import Courses from "./components/Courses";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import CourseDetails from "./components/CourseDetails";
import Login from './components/Login';
import Signup from './components/Signup';

// Import Firebase for console access
import { auth } from './firebase';
import { enrollInCourse, getUserProfile, getEnrolledCoursesWithProgress } from './components/firestoreUtils';

// Make Firebase accessible in console
if (typeof window !== 'undefined') {
  window.firebaseAuth = auth;
  window.enrollInCourse = enrollInCourse;
  window.getUserProfile = getUserProfile;
  window.getEnrolledCoursesWithProgress = getEnrolledCoursesWithProgress;
 
  // Quick enroll function
  window.quickEnroll = async (courseId) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("❌ Please login first");
      return;
    }
    try {
      await enrollInCourse(user.uid, courseId.toString());
      console.log(`✅ Enrolled in course ${courseId}! Refresh to see it.`);
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  };
 
  // Check user
  window.checkUser = () => {
    const user = auth.currentUser;
    if (user) {
      console.log("✅ Logged in as:", user.email);
      console.log("User ID:", user.uid);
    } else {
      console.log("❌ Not logged in");
    }
  };
 
  console.log("🔧 Debug tools loaded!");
  console.log("Available: window.checkUser(), window.quickEnroll(courseId)");
}

// Protected Route Component - For personalized content
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
 
  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '1.2rem',
        color: '#374151'
      }}>
        Loading...
      </div>
    );
  }
 
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
 
  // If authenticated, show the protected content
  return children;
};

// Conditional Route Component - Shows Public or Private based on auth
const ConditionalRoute = ({ publicComponent: PublicComponent, privateComponent: PrivateComponent }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '1.2rem',
        color: '#374151'
      }}>
        Loading...
      </div>
    );
  }

  // Return appropriate component based on authentication
  return isAuthenticated ? <PrivateComponent /> : <PublicComponent />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
         
          {/* Conditional Routes - Public or Private based on auth */}
          <Route
            path="/courses"
            element={
              <ConditionalRoute 
                publicComponent={PublicCourses} 
                privateComponent={Courses} 
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <ConditionalRoute 
                publicComponent={PublicDashboard} 
                privateComponent={Dashboard} 
              />
            }
          />

          <Route
            path="/quiz"
            element={
              <ConditionalRoute 
                publicComponent={PublicQuiz} 
                privateComponent={Quiz} 
              />
            }
          />

          {/* Course Details - Always Protected (requires login) */}
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;