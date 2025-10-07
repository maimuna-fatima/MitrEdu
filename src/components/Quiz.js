import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { saveQuizAttempt } from './firestoreUtils';
import './Quiz.css';

const QUIZ_DATA = {
  'html-css-js': {
    title: 'HTML, CSS & JavaScript Quiz',
    duration: 480,
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    level: 'Beginner to Advanced',
    description: 'Test your knowledge of fundamental web technologies including HTML markup, CSS styling, and JavaScript programming.',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language',
          'Hyper Text Making Language'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        type: 'true-false',
        question: 'CSS Grid and Flexbox cannot be used together in the same layout.',
        correctAnswer: false
      },
      {
        id: 3,
        type: 'mcq',
        question: 'Which method is used to add an element to the end of an array in JavaScript?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which tag is used to create a hyperlink in HTML?',
        options: ['<a>', '<link>', '<href>', '<url>'],
        correctAnswer: 0
      },
      {
        id: 5,
        type: 'true-false',
        question: 'In CSS, #id is used to select an element by its ID.',
        correctAnswer: true
      },
      {
        id: 6,
        type: 'mcq',
        question: 'Which JavaScript keyword is used to declare a constant?',
        options: ['var', 'let', 'const', 'constant'],
        correctAnswer: 2
      },
      {
        id: 7,
        type: 'mcq',
        question: 'Which HTML tag is used to display an image?',
        options: ['<img>', '<image>', '<src>', '<pic>'],
        correctAnswer: 0
      },
      {
        id: 8,
        type: 'true-false',
        question: 'Inline CSS has higher priority than external CSS.',
        correctAnswer: true
      },
      {
        id: 9,
        type: 'mcq',
        question: 'Which JavaScript function is used to parse a JSON string?',
        options: ['JSON.parse()', 'JSON.stringify()', 'parse.JSON()', 'stringify.JSON()'],
        correctAnswer: 0
      },
      {
        id: 10,
        type: 'mcq',
        question: 'Which attribute is used in HTML to specify inline styles?',
        options: ['class', 'id', 'style', 'css'],
        correctAnswer: 2
      }
    ]
  },

  'react': {
    title: 'React.js Quiz',
    duration: 480,
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    level: 'Intermediate',
    description: 'Evaluate your understanding of React concepts including components, hooks, state management, and JSX.',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is JSX in React?',
        options: [
          'A JavaScript extension',
          'A syntax extension for JavaScript',
          'A new programming language',
          'A React component'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        type: 'true-false',
        question: 'React components must always return a single root element.',
        correctAnswer: true
      },
      {
        id: 3,
        type: 'mcq',
        question: 'Which hook is used for managing state in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which company developed React?',
        options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
        correctAnswer: 1
      },
      {
        id: 5,
        type: 'true-false',
        question: 'React uses a virtual DOM to improve performance.',
        correctAnswer: true
      },
      {
        id: 6,
        type: 'mcq',
        question: 'Which hook is used for performing side effects?',
        options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
        correctAnswer: 1
      },
      {
        id: 7,
        type: 'mcq',
        question: 'React is mainly used for building:',
        options: ['Databases', 'User Interfaces', 'Servers', 'Operating Systems'],
        correctAnswer: 1
      },
      {
        id: 8,
        type: 'true-false',
        question: 'Keys in React lists help improve rendering performance.',
        correctAnswer: true
      },
      {
        id: 9,
        type: 'mcq',
        question: 'Which command is used to create a new React app?',
        options: ['npx create-react-app myApp', 'npm install react', 'npx new react-app', 'node react init'],
        correctAnswer: 0
      },
      {
        id: 10,
        type: 'mcq',
        question: 'Which prop is used to pass data from parent to child in React?',
        options: ['this.state', 'props', 'context', 'data'],
        correctAnswer: 1
      }
    ]
  },

  'python': {
    title: 'Python Programming Quiz',
    duration: 480,
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
    level: 'Beginner to Intermediate',
    description: 'Challenge yourself with Python fundamentals including data types, functions, and object-oriented programming.',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is the output of: print(type(5/2))?',
        options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', 'Error'],
        correctAnswer: 1
      },
      {
        id: 2,
        type: 'true-false',
        question: 'Python lists are mutable.',
        correctAnswer: true
      },
      {
        id: 3,
        type: 'mcq',
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which data type is immutable in Python?',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correctAnswer: 2
      },
      {
        id: 5,
        type: 'true-false',
        question: 'Indentation is optional in Python.',
        correctAnswer: false
      },
      {
        id: 6,
        type: 'mcq',
        question: 'Which function is used to get the length of a list in Python?',
        options: ['count()', 'size()', 'length()', 'len()'],
        correctAnswer: 3
      },
      {
        id: 7,
        type: 'mcq',
        question: 'Which symbol is used for comments in Python?',
        options: ['//', '#', '/* */', '<!-- -->'],
        correctAnswer: 1
      },
      {
        id: 8,
        type: 'true-false',
        question: 'Python supports multiple inheritance.',
        correctAnswer: true
      },
      {
        id: 9,
        type: 'mcq',
        question: 'Which of the following is a Python framework?',
        options: ['Flask', 'Laravel', 'Spring', 'Django'],
        correctAnswer: 0
      },
      {
        id: 10,
        type: 'mcq',
        question: 'What is the output of: bool("")?',
        options: ['True', 'False', 'None', 'Error'],
        correctAnswer: 1
      }
    ]
  },

  'machine-learning': {
    title: 'Machine Learning Quiz',
    duration: 600,
    category: 'AI & Machine Learning',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    level: 'Intermediate',
    description: 'Test your machine learning knowledge covering algorithms, model evaluation, and data science concepts.',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is overfitting in machine learning?',
        options: [
          'When model performs well on training data but poorly on test data',
          'When model performs poorly on both training and test data',
          'When model performs well on both training and test data',
          'When model takes too long to train'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        type: 'true-false',
        question: 'Supervised learning requires labeled training data.',
        correctAnswer: true
      },
      {
        id: 3,
        type: 'mcq',
        question: 'Which algorithm is commonly used for classification problems?',
        options: ['Linear Regression', 'K-Means', 'Decision Tree', 'PCA'],
        correctAnswer: 2
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which evaluation metric is best for imbalanced datasets?',
        options: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
        correctAnswer: 3
      },
      {
        id: 5,
        type: 'true-false',
        question: 'Unsupervised learning does not use labeled data.',
        correctAnswer: true
      },
      {
        id: 6,
        type: 'mcq',
        question: 'Which activation function is commonly used in hidden layers of neural networks?',
        options: ['ReLU', 'Sigmoid', 'Tanh', 'Softmax'],
        correctAnswer: 0
      },
      {
        id: 7,
        type: 'mcq',
        question: 'What does PCA stand for?',
        options: ['Principal Component Analysis', 'Partial Correlation Algorithm', 'Primary Classification Approach', 'Parallel Component Approximation'],
        correctAnswer: 0
      },
      {
        id: 8,
        type: 'true-false',
        question: 'Gradient Descent is an optimization algorithm.',
        correctAnswer: true
      },
      {
        id: 9,
        type: 'mcq',
        question: 'Which ML technique is used for reducing the dimensionality of data?',
        options: ['Regression', 'Clustering', 'PCA', 'Decision Tree'],
        correctAnswer: 2
      },
      {
        id: 10,
        type: 'mcq',
        question: 'Which algorithm is best suited for continuous output prediction?',
        options: ['Logistic Regression', 'Decision Tree', 'Linear Regression', 'Naive Bayes'],
        correctAnswer: 2
      }
    ]
  },

  'computer-networks': {
    title: 'Computer Networks Quiz',
    duration: 600,
    category: 'Computer Networking',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    level: 'Intermediate',
    description: 'Assess your networking knowledge including OSI model, protocols, and network architecture concepts.',
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'Which layer of the OSI model handles routing?',
        options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
        correctAnswer: 2
      },
      {
        id: 2,
        type: 'true-false',
        question: 'TCP is a connectionless protocol.',
        correctAnswer: false
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What does IP stand for in networking?',
        options: ['Internet Provider', 'Internet Protocol', 'Internal Protocol', 'Internet Process'],
        correctAnswer: 1
      },
      {
        id: 4,
        type: 'mcq',
        question: 'Which device is used to connect different networks together?',
        options: ['Switch', 'Router', 'Hub', 'Repeater'],
        correctAnswer: 1
      },
      {
        id: 5,
        type: 'true-false',
        question: 'UDP provides reliable data transmission.',
        correctAnswer: false
      },
      {
        id: 6,
        type: 'mcq',
        question: 'Which layer of the OSI model ensures reliable communication?',
        options: ['Session Layer', 'Presentation Layer', 'Transport Layer', 'Application Layer'],
        correctAnswer: 2
      },
      {
        id: 7,
        type: 'mcq',
        question: 'What is the default port number for HTTP?',
        options: ['21', '25', '80', '443'],
        correctAnswer: 2
      },
      {
        id: 8,
        type: 'true-false',
        question: 'IPv6 addresses are 128 bits long.',
        correctAnswer: true
      },
      {
        id: 9,
        type: 'mcq',
        question: 'Which protocol is used for sending emails?',
        options: ['FTP', 'SMTP', 'HTTP', 'SNMP'],
        correctAnswer: 1
      },
      {
        id: 10,
        type: 'mcq',
        question: 'Which topology connects all devices in a single central cable?',
        options: ['Star', 'Bus', 'Ring', 'Mesh'],
        correctAnswer: 1
      }
    ]
  }
};

const Quiz = () => {
  const { user } = useAuth(); // Get authenticated user
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);

  // Quiz taking states
  const [selectedCourse, setSelectedCourse] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [confirmedAnswers, setConfirmedAnswers] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const categories = [
    "all",
    "Web Development",
    "Programming",
    "Computer Networking",
    "AI & Machine Learning"
  ];

  const quizzes = Object.entries(QUIZ_DATA).map(([key, quiz]) => ({
    id: key,
    ...quiz,
    questionCount: quiz.questions.length
  }));

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesCategory = filterCategory === "all" || quiz.category === filterCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Timer effect - separate from other effects
  useEffect(() => {
    let timer;
    if (currentQuiz && timeLeft > 0 && !quizCompleted) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentQuiz && !quizCompleted) {
      // Auto-submit when time runs out
      handleSubmitQuiz();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, quizCompleted, currentQuiz]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = (courseKey) => {
    const quiz = QUIZ_DATA[courseKey];

    if (!quiz) {
      console.error('Quiz not found for key:', courseKey);
      return;
    }

    setCurrentQuiz(quiz);
    setSelectedCourse(courseKey);
    setTimeLeft(quiz.duration);
    setCurrentQuestion(0);
    setUserAnswers({});
    setConfirmedAnswers(new Set());
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    setConfirmedAnswers(prev => new Set([...prev, currentQuiz.questions[currentQuestion].id]));

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateScore = () => {
    if (!currentQuiz || !currentQuiz.questions) return 0;
    let correct = 0;
    currentQuiz.questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmitQuiz = async () => {
    if (!currentQuiz || !user) return;

    setConfirmedAnswers(prev => new Set([...prev, currentQuiz.questions[currentQuestion].id]));

    const correctAnswers = calculateScore();
    const totalQuestions = currentQuiz.questions.length;
    const percentageScore = Math.round((correctAnswers / totalQuestions) * 100);

    setScore(correctAnswers);
    setQuizCompleted(true);
    setShowResults(true);

    // Save quiz attempt to Firebase
    setSaving(true);
    try {
      await saveQuizAttempt(user.uid, selectedCourse, {
        score: percentageScore,
        totalQuestions: totalQuestions,
        answers: userAnswers
      });
      console.log('Quiz attempt saved to Firebase successfully!');
    } catch (error) {
      console.error('Failed to save quiz attempt:', error);
      // Still show results even if saving fails
    } finally {
      setSaving(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setSelectedCourse('');
    setCurrentQuestion(0);
    setUserAnswers({});
    setConfirmedAnswers(new Set());
    setTimeLeft(0);
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
  };

  // Show quiz selection page (similar to courses page)
  if (!currentQuiz) {
    return (
      <div className={`quiz-page ${isLoaded ? "loaded" : ""}`}>
        {/* Page Header */}
        <section className="page-header">
          <h1>
            Try out <span>Quizzes</span>
          </h1>
          <p>
            Test your knowledge with our collection of programming and technology quizzes
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
                  <button onClick={() => startQuiz(quiz.id)}>
                    Start Quiz
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    );
  }

  // Results view
  if (showResults) {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="quiz-page loaded">
        <div className="quiz-container">
          <div className="results-header">
            <h1 className={passed ? 'results-pass' : 'results-fail'}>Quiz Results</h1><br />
            <h2>{currentQuiz.title}</h2>
            {saving && <p className="saving-indicator">Saving results...</p>}
          </div>

          <div className={`results-summary ${passed ? 'pass' : 'fail'}`}>
            <h3>Score: {score}/{currentQuiz.questions.length} ({percentage}%)</h3>
            <p>{passed ? '🎉 Congratulations! You passed!' : '📚 Keep studying and try again!'}</p>
          </div>

          <div>
            <h3>Question Review:</h3>
            {currentQuiz.questions.map((question, index) => {
              const userAnswer = userAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className={`review-card ${isCorrect ? 'correct' : 'wrong'}`}>
                  <h4>Question {index + 1}: {question.question}</h4>
                  {question.type === 'mcq' && (
                    <div>
                      <p><strong>Your answer:</strong> {userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}</p>
                      <p><strong>Correct answer:</strong> {question.options[question.correctAnswer]}</p>
                    </div>
                  )}
                  {question.type === 'true-false' && (
                    <div>
                      <p><strong>Your answer:</strong> {userAnswer !== undefined ? (userAnswer ? 'True' : 'False') : 'Not answered'}</p>
                      <p><strong>Correct answer:</strong> {question.correctAnswer ? 'True' : 'False'}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="results-actions">
            <button className="btn-retry" onClick={resetQuiz}>Take Another Quiz</button>
            <button className="btn-retake" onClick={() => startQuiz(selectedCourse)}>Retake This Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz taking view
  const question = currentQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="quiz-page loaded">
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>{currentQuiz.title}</h2>
          <div className={`timer ${timeLeft < 60 ? 'timer-warning' : 'timer-normal'}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="question-box">
          <h3>Question {currentQuestion + 1} of {currentQuiz.questions.length}</h3>
          <p>{question.question}</p>

          {question.type === 'mcq' && (
            <div>
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`option ${userAnswers[question.id] === index ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={userAnswers[question.id] === index}
                    onChange={() => handleAnswerSelect(question.id, index)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {question.type === 'true-false' && (
            <div>
              {[true, false].map((option) => (
                <label
                  key={option.toString()}
                  className={`option ${userAnswers[question.id] === option ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={userAnswers[question.id] === option}
                    onChange={() => handleAnswerSelect(question.id, option)}
                  />
                  {option ? 'True' : 'False'}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="nav-buttons">
          <button className="btn btn-prev" onClick={previousQuestion} disabled={currentQuestion === 0}>Previous</button>
          <span>{currentQuestion + 1} / {currentQuiz.questions.length}</span>
          {currentQuestion === currentQuiz.questions.length - 1 ? (
            <button className="btn btn-submit" onClick={handleSubmitQuiz} disabled={saving}>
              {saving ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button className="btn btn-next" onClick={nextQuestion}>Next</button>
          )}
        </div>

        <div className="overview">
          <h4>Question Overview:</h4>
          <div className="overview-buttons">
            {currentQuiz.questions.map((_, index) => (
              <button
                key={index}
                className={`overview-btn ${userAnswers[currentQuiz.questions[index].id] !== undefined
                  ? 'answered'
                  : index === currentQuestion
                    ? 'current'
                    : 'unanswered'
                  }`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <p>Green: Answered | Blue: Current | Gray: Unanswered</p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;