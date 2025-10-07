// CourseDetails.js - With external resource links and separate checkboxes
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { 
  enrollInCourse, 
  isEnrolledInCourse, 
  getCourseProgress,
  updateLessonCompletion 
} from "./firestoreUtils";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  // All courses data with resource links
  const allCourses = [
    {
      id: 1,
      title: "HTML, CSS & JavaScript Complete Course",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      platform: "W3Schools + Mozilla MDN + FreeCodeCamp",
      duration: "Self-paced",
      level: "Beginner to Advanced",
      description: "Master the fundamentals of web development with HTML, CSS, and JavaScript. This comprehensive course covers everything from basic syntax to advanced concepts.",
      lessons: [
        { id: 1, title: "Introduction to HTML", duration: "30 mins", link: "https://www.w3schools.com/html/html_intro.asp" },
        { id: 2, title: "HTML Elements and Attributes", duration: "45 mins", link: "https://www.w3schools.com/html/html_elements.asp" },
        { id: 3, title: "CSS Basics and Styling", duration: "60 mins", link: "https://www.w3schools.com/css/css_intro.asp" },
        { id: 4, title: "CSS Flexbox and Grid", duration: "50 mins", link: "https://www.w3schools.com/css/css3_flexbox.asp" },
        { id: 5, title: "JavaScript Fundamentals", duration: "70 mins", link: "https://www.w3schools.com/js/js_intro.asp" },
        { id: 6, title: "DOM Manipulation", duration: "55 mins", link: "https://www.w3schools.com/js/js_htmldom.asp" },
        { id: 7, title: "Events and Event Handling", duration: "40 mins", link: "https://www.w3schools.com/js/js_events.asp" },
        { id: 8, title: "JavaScript ES6+ Features", duration: "65 mins", link: "https://www.w3schools.com/js/js_es6.asp" },
        { id: 9, title: "Async JavaScript", duration: "60 mins", link: "https://www.w3schools.com/js/js_async.asp" },
        { id: 10, title: "Final Project", duration: "120 mins", link: "https://www.w3schools.com/js/js_examples.asp" },
      ],
    },
    {
      id: 2,
      title: "Python for Everybody Specialization",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop",
      platform: "GeeksforGeeks + Python.org + Real Python",
      duration: "Self-paced",
      level: "Beginner to Intermediate",
      description: "Learn Python programming from scratch. Perfect for beginners who want to start their programming journey.",
      lessons: [
        { id: 1, title: "Python Installation and Setup", duration: "20 mins", link: "https://www.python.org/downloads/" },
        { id: 2, title: "Variables and Data Types", duration: "40 mins", link: "https://www.w3schools.com/python/python_variables.asp" },
        { id: 3, title: "Control Flow and Loops", duration: "50 mins", link: "https://www.w3schools.com/python/python_conditions.asp" },
        { id: 4, title: "Functions and Modules", duration: "60 mins", link: "https://www.w3schools.com/python/python_functions.asp" },
        { id: 5, title: "Data Structures", duration: "70 mins", link: "https://www.w3schools.com/python/python_lists.asp" },
        { id: 6, title: "File Handling", duration: "45 mins", link: "https://www.w3schools.com/python/python_file_handling.asp" },
        { id: 7, title: "Object-Oriented Programming", duration: "80 mins", link: "https://www.w3schools.com/python/python_classes.asp" },
        { id: 8, title: "Error Handling", duration: "35 mins", link: "https://www.w3schools.com/python/python_try_except.asp" },
      ],
    },
    {
      id: 3,
      title: "Computer Networks & Protocols",
      category: "Computer Networking",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      platform: "Cisco Networking Academy + GeeksforGeeks",
      duration: "10 weeks",
      level: "Intermediate",
      description: "Deep dive into computer networking, protocols, and network architecture.",
      lessons: [
        { id: 1, title: "Introduction to Networks", duration: "45 mins", link: "https://www.geeksforgeeks.org/basics-computer-networking/" },
        { id: 2, title: "OSI Model", duration: "60 mins", link: "https://www.geeksforgeeks.org/layers-of-osi-model/" },
        { id: 3, title: "TCP/IP Protocol Suite", duration: "70 mins", link: "https://www.geeksforgeeks.org/tcp-ip-model/" },
        { id: 4, title: "IP Addressing", duration: "55 mins", link: "https://www.geeksforgeeks.org/introduction-of-classful-ip-addressing/" },
        { id: 5, title: "Subnetting", duration: "65 mins", link: "https://www.geeksforgeeks.org/introduction-to-subnetting/" },
        { id: 6, title: "Routing Protocols", duration: "75 mins", link: "https://www.geeksforgeeks.org/types-of-routing/" },
      ],
    },
    {
      id: 4,
      title: "React JS Complete Tutorial",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      platform: "Official React Docs",
      duration: "Self-paced",
      level: "Intermediate",
      description: "Build modern web applications with React. Learn components, hooks, state management, and more.",
      lessons: [
        { id: 1, title: "React Basics", duration: "40 mins", link: "https://react.dev/learn" },
        { id: 2, title: "Components and Props", duration: "50 mins", link: "https://react.dev/learn/passing-props-to-a-component" },
        { id: 3, title: "State and Lifecycle", duration: "60 mins", link: "https://react.dev/learn/state-a-components-memory" },
        { id: 4, title: "React Hooks", duration: "70 mins", link: "https://react.dev/reference/react" },
        { id: 5, title: "Context API", duration: "55 mins", link: "https://react.dev/learn/passing-data-deeply-with-context" },
        { id: 6, title: "React Router", duration: "45 mins", link: "https://reactrouter.com/en/main" },
        { id: 7, title: "Building a Full App", duration: "120 mins", link: "https://react.dev/learn/thinking-in-react" },
      ],
    },
    {
      id: 5,
      title: "Machine Learning Course",
      category: "AI & Machine Learning",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      platform: "Andrew Ng's ML Course + Kaggle Learn",
      duration: "11 weeks",
      level: "Intermediate",
      description: "Learn machine learning algorithms and build predictive models.",
      lessons: [
        { id: 1, title: "Introduction to ML", duration: "50 mins", link: "https://www.kaggle.com/learn/intro-to-machine-learning" },
        { id: 2, title: "Linear Regression", duration: "65 mins", link: "https://www.kaggle.com/code/dansbecker/your-first-machine-learning-model" },
        { id: 3, title: "Logistic Regression", duration: "60 mins", link: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression" },
        { id: 4, title: "Neural Networks", duration: "90 mins", link: "https://www.kaggle.com/learn/intro-to-deep-learning" },
        { id: 5, title: "Deep Learning", duration: "85 mins", link: "https://www.tensorflow.org/tutorials" },
        { id: 6, title: "Model Evaluation", duration: "55 mins", link: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
      ],
    },
  ];

  const course = allCourses.find((c) => c.id === parseInt(id));

  useEffect(() => {
    const checkEnrollmentAndProgress = async () => {
      if (!course) {
        setLoading(false);
        return;
      }

      if (user) {
        try {
          const isEnrolled = await isEnrolledInCourse(user.uid, id);
          setEnrolled(isEnrolled);

          if (isEnrolled) {
            const courseProgress = await getCourseProgress(user.uid, id);
            setProgress(courseProgress);
          }
        } catch (error) {
          console.error("Error checking enrollment:", error);
        }
      }
      setLoading(false);
    };

    checkEnrollmentAndProgress();
  }, [user, id, course]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    try {
      await enrollInCourse(user.uid, id);
      setEnrolled(true);
      
      const courseProgress = await getCourseProgress(user.uid, id);
      setProgress(courseProgress);
      
      alert("Successfully enrolled in the course!");
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Failed to enroll. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  const handleLessonClick = (lessonLink) => {
    if (!enrolled) {
      alert("Please enroll in the course first!");
      return;
    }
    // Open lesson resource in new tab
    window.open(lessonLink, '_blank');
  };

  const handleMarkComplete = async (e, lessonId) => {
    e.stopPropagation(); // Prevent opening link when clicking checkbox
    
    if (!enrolled) {
      alert("Please enroll in the course first!");
      return;
    }

    try {
      await updateLessonCompletion(
        user.uid,
        id,
        lessonId,
        course.lessons.length
      );

      // Refresh progress
      const updatedProgress = await getCourseProgress(user.uid, id);
      setProgress(updatedProgress);
    } catch (error) {
      console.error("Error updating lesson:", error);
      alert("Failed to mark lesson as complete");
    }
  };

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <button onClick={() => navigate("/courses")}>Back to Courses</button>
      </div>
    );
  }

  const completedLessons = progress?.completedLessons || [];

  return (
    <div className="course-details-page">
      {/* Course Header */}
      <section className="course-header">
        <img src={course.image} alt={course.title} className="course-banner" />
        <div className="course-header-content">
          <span className="course-category">{course.category}</span>
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          
          <div className="course-meta">
            <div className="meta-item">
              <strong>Platform:</strong> {course.platform}
            </div>
            <div className="meta-item">
              <strong>Duration:</strong> {course.duration}
            </div>
            <div className="meta-item">
              <strong>Level:</strong> {course.level}
            </div>
            <div className="meta-item">
              <strong>Lessons:</strong> {course.lessons.length}
            </div>
          </div>

          {enrolled ? (
            <div className="enrollment-status">
              <div className="enrolled-badge">✓ Enrolled</div>
              <div className="progress-section">
                <div className="progress-bar-large">
                  <div
                    className="progress-fill-large"
                    style={{ width: `${progress?.percentComplete || 0}%` }}
                  ></div>
                </div>
                <span className="progress-text-large">
                  {progress?.percentComplete || 0}% Complete
                </span>
              </div>
            </div>
          ) : (
            <button
              className="enroll-btn"
              onClick={handleEnroll}
              disabled={enrolling}
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          )}
        </div>
      </section>

      {/* Course Content */}
      <section className="course-content">
        <h2>Course Curriculum</h2>
        <div className="lessons-list">
          {course.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className={`lesson-item ${isCompleted ? "completed" : ""} ${
                  !enrolled ? "locked" : ""
                }`}
                onClick={() => enrolled && handleLessonClick(lesson.link)}
              >
                {/* Checkbox to mark complete */}
                {enrolled && (
                  <div
                    className="lesson-checkbox"
                    onClick={(e) => handleMarkComplete(e, lesson.id)}
                    title="Mark as complete"
                  >
                    {isCompleted && <span className="lesson-checkbox-icon">✓</span>}
                  </div>
                )}
                
                <div className="lesson-number">{index + 1}</div>
                <div className="lesson-info">
                  <h3>{lesson.title}</h3>
                  <span className="lesson-duration">{lesson.duration}</span>
                </div>
                <div className="lesson-status">
                  {isCompleted ? (
                    <span className="completed-icon">✓</span>
                  ) : !enrolled ? (
                    <span className="lock-icon">🔒</span>
                  ) : (
                    <span className="start-icon">▶</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;