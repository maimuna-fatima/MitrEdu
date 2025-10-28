// PublicCourses.js - Standard courses catalog for non-logged-in users
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const PublicCourses = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
  }, []);

  // Filter courses based on category and search
  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      filterCategory === "all" || course.category === filterCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnrollClick = () => {
    navigate("/login");
  };

  return (
    <div className={`courses-page ${isLoaded ? "loaded" : ""}`}>
      {/* Page Header */}
      <section className="page-header">
        <h1>
          Computer Science <span>Courses</span>
        </h1>
        <p>Browse our collection of courses - Login to enroll and track your progress</p>
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

      {/* Available Courses Section */}
      <section className="available-courses-section">
        {/* <h2 className="section-title">Available Courses</h2> */}
        
        <div className="courses-container">
          {filteredCourses.length === 0 ? (
            <div className="no-results">
              <h3>No courses found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
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
                  <button
                    onClick={handleEnrollClick}
                    className="enroll-btn"
                  >
                    Login to Enroll
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PublicCourses;