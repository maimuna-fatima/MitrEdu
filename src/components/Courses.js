// Courses.js - With My Courses + Available Courses sections
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getEnrolledCoursesWithProgress, enrollInCourse, isEnrolledInCourse } from "./firestoreUtils";
import "./Courses.css";

const Courses = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // All available courses
  const allCourses = [
    {
      id: 1,
      title: "HTML, CSS & JavaScript Complete Course",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
      platform: "W3Schools + Mozilla MDN + FreeCodeCamp",
      duration: "Self-paced",
      level: "Beginner to Advanced",
    },
    {
      id: 2,
      title: "Python for Everybody Specialization",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      platform: "GeeksforGeeks + Python.org + Real Python",
      duration: "Self-paced",
      level: "Beginner to Intermediate",
    },
    {
      id: 3,
      title: "Computer Networks & Protocols",
      category: "Computer Networking",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      platform: "Cisco Networking Academy + GeeksforGeeks",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: 4,
      title: "React JS Complete Tutorial",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      platform: "Official React Docs",
      duration: "Self-paced",
      level: "Intermediate",
    },
    {
      id: 5,
      title: "Machine Learning Course",
      category: "AI & Machine Learning",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      platform: "Andrew Ng's ML Course + Kaggle Learn",
      duration: "11 weeks",
      level: "Intermediate",
    },
  ];

  const categories = [
    "all",
    "Web Development",
    "Programming",
    "Computer Networking",
    "AI & Machine Learning",
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const fetchEnrolledCourses = async () => {
      if (isAuthenticated && user) {
        try {
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const coursesWithProgress = await getEnrolledCoursesWithProgress(user.uid);
          
          // Store enrolled course IDs
          const enrolledIds = coursesWithProgress.map(c => c.courseId);
          setEnrolledCourseIds(enrolledIds);
          
          if (coursesWithProgress.length === 0) {
            setEnrolledCourses([]);
          } else {
            const enrolledWithDetails = coursesWithProgress
              .map(({ courseId, progress }) => {
                const course = allCourses.find(c => c.id === courseId);
                return course ? { ...course, progress } : null;
              })
              .filter(Boolean);

            setEnrolledCourses(enrolledWithDetails);
          }
        } catch (error) {
          console.error("Error fetching enrolled courses:", error);
          setEnrolledCourses([]);
        } finally {
          setLoading(false);
        }
      } else {
        setEnrolledCourses([]);
        setLoading(false);
      }
    };

    setTimeout(fetchEnrolledCourses, 50);
  }, [user, isAuthenticated]);

  // Handle enrollment
  const handleEnroll = async (courseId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setEnrollingCourseId(courseId);
    try {
      await enrollInCourse(user.uid, courseId.toString());
      
      // Refresh enrolled courses
      const coursesWithProgress = await getEnrolledCoursesWithProgress(user.uid);
      const enrolledIds = coursesWithProgress.map(c => c.courseId);
      setEnrolledCourseIds(enrolledIds);
      
      const enrolledWithDetails = coursesWithProgress
        .map(({ courseId, progress }) => {
          const course = allCourses.find(c => c.id === courseId);
          return course ? { ...course, progress } : null;
        })
        .filter(Boolean);

      setEnrolledCourses(enrolledWithDetails);
      
      alert("Successfully enrolled in the course!");
    } catch (error) {
      console.error("Enrollment error:", error);
      alert("Failed to enroll. Please try again.");
    } finally {
      setEnrollingCourseId(null);
    }
  };

  // Filter available courses based on category and search
  const filteredAvailableCourses = allCourses.filter((course) => {
    const matchesCategory =
      filterCategory === "all" || course.category === filterCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className={`courses-page ${isLoaded ? "loaded" : ""}`}>
      {/* Page Header */}
      <section className="page-header">
        <h1>
          Computer Science <span>Courses</span>
        </h1>
        <p>Browse and enroll in courses to advance your skills</p>
      </section>

      {/* Controls */}
      <section className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* MY COURSES SECTION */}
      <section className="my-courses-section">
        <h2 className="section-title">My Courses</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
            Loading your courses...
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className="no-courses-message">
            <p>No Courses Enrolled Yet</p>
            <small>Browse available courses below to get started</small>
          </div>
        ) : (
          <div className="courses-container">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="course-card enrolled-card">
                <div className="enrolled-badge">Enrolled</div>
                <img src={course.image} alt={course.title} />
                <div className="course-content">
                  <div>
                    <span className="category">{course.category}</span>
                    <h3>{course.title}</h3>
                    <div className="meta">
                      <p><strong>Platform:</strong> {course.platform}</p>
                      <p><strong>Duration:</strong> {course.duration}</p>
                      <p><strong>Level:</strong> {course.level}</p>
                    </div>
                    
                    {course.progress && (
                      <div className="course-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${course.progress.percentComplete || 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {course.progress.percentComplete || 0}% Complete
                        </span>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => handleViewDetails(course.id)}
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

      {/* AVAILABLE COURSES SECTION */}
      <section className="available-courses-section">
        <h2 className="section-title">Available Courses</h2>
        
        <div className="courses-container">
          {filteredAvailableCourses.length === 0 ? (
            <div className="no-results">
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredAvailableCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              
              return (
                <div key={course.id} className="course-card">
                  {isEnrolled && <div className="enrolled-badge">Enrolled</div>}
                  <img src={course.image} alt={course.title} />
                  <div className="course-content">
                    <div>
                      <span className="category">{course.category}</span>
                      <h3>{course.title}</h3>
                      <div className="meta">
                        <p><strong>Platform:</strong> {course.platform}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <p><strong>Level:</strong> {course.level}</p>
                      </div>
                    </div>
                    
                    {isEnrolled ? (
                      <button 
                        onClick={() => handleViewDetails(course.id)}
                        className="view-btn"
                      >
                        View Course
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        disabled={enrollingCourseId === course.id}
                        className="enroll-btn"
                      >
                        {enrollingCourseId === course.id ? "Enrolling..." : "Enroll Now"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;