import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        {/* 🔹 Logo Section */}
        <Link to="/" className="logo">
          MitrEdu
        </Link>

        {/* 🔹 Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li>
            {/* ✅ Added new Score Predictor link */}
            <Link to="/score-predictor">Score Predictor</Link>
          </li>
        </ul>

        {/* 🔹 Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
          <Link to="/signup" className="btn btn-signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
