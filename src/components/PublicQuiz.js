// PublicQuiz.js - Standard quiz catalog for non-logged-in users
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const PublicQuiz = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const categories = [
    "all",
    "Web Development",
    "Programming",
    "Computer Networking",
    "AI & Machine Learning"
  ];

  // All available quizzes
  const quizzes = [
    {
      id: 'html-css-js',
      title: 'HTML, CSS & JavaScript Quiz',
      duration: 480,
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      level: 'Beginner to Advanced',
      description: 'Test your knowledge of fundamental web technologies including HTML markup, CSS styling, and JavaScript programming.',
      questionCount: 10
    },
    {
      id: 'react',
      title: 'React.js Quiz',
      duration: 480,
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      level: 'Intermediate',
      description: 'Evaluate your understanding of React concepts including components, hooks, state management, and JSX.',
      questionCount: 10
    },
    {
      id: 'python',
      title: 'Python Programming Quiz',
      duration: 480,
      category: 'Programming',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      level: 'Beginner to Intermediate',
      description: 'Challenge yourself with Python fundamentals including data types, functions, and object-oriented programming.',
      questionCount: 10
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning Quiz',
      duration: 600,
      category: 'AI & Machine Learning',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
      level: 'Intermediate',
      description: 'Test your machine learning knowledge covering algorithms, model evaluation, and data science concepts.',
      questionCount: 10
    },
    {
      id: 'computer-networks',
      title: 'Computer Networks Quiz',
      duration: 600,
      category: 'Computer Networking',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
      level: 'Intermediate',
      description: 'Assess your networking knowledge including OSI model, protocols, and network architecture concepts.',
      questionCount: 10
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesCategory = filterCategory === "all" || quiz.category === filterCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartQuiz = () => {
    navigate("/login");
  };

  return (
    <div className={`quiz-page ${isLoaded ? "loaded" : ""}`}>
      {/* Page Header */}
      <section className="page-header">
        <h1>
          Try out <span>Quizzes</span>
        </h1>
        <p>
          Test your knowledge with our collection of programming and technology quizzes - Login to track your scores
        </p>
      </section>

      {/* Controls */}
      <section className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search quizzes..."
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

      {/* Quizzes */}
      <section className="courses-container">
        {filteredQuizzes.length === 0 ? (
          <div className="no-results">
            <h3>No quizzes found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="course-card"
            >
              <img src={quiz.image} alt={quiz.title} />
              <div className="course-content">
                <div>
                  <span className="category">{quiz.category}</span>
                  <h3>{quiz.title}</h3>
                  <div className="meta">
                    <p><strong>Questions:</strong> {quiz.questionCount}</p>
                    <p><strong>Duration:</strong> {Math.floor(quiz.duration / 60)} minutes</p>
                    <p><strong>Level:</strong> {quiz.level}</p>
                  </div>
                  <p className="description">{quiz.description}</p>
                </div>
                <button onClick={handleStartQuiz}>
                  Login to Start Quiz
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default PublicQuiz;