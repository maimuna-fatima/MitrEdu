// Navbar.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  // const [user, setUser] = useState({ name: 'John Doe' });

  // const logout = () => {
  //   setUser(null);
  // };

  return (
    <nav>
      {/* <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/courses" style={linkStyle}>Courses</Link>
        <Link to="/quiz" style={linkStyle}>Quiz</Link>
        {user && <Link to="/dashboard" style={linkStyle}>Dashboard</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.name} | </span>
            <button onClick={logout} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div> */}
              <div className="nav-container">
                <Link to="/" className="logo">MitrEdu</Link>
                <nav>
                  <ul className="nav-links">
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                  </ul>
                </nav>
                <div className="auth-buttons">
                  <Link to="/login" className="btn btn-login">Login</Link>
                  <Link to="/register" className="btn btn-signup">Sign Up</Link>
                </div>
              </div>
    </nav>
  );
};

export default Navbar;
