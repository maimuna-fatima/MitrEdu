// CourseCard.js
import { Link } from 'react-router-dom';

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '10px',
  margin: '10px',
  width: '300px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
};

const CourseCard = ({ id, title, description, instructor, progress }) => {
  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Instructor: {instructor}</p>
      {progress !== undefined && <p>Progress: {progress}%</p>}
      <Link to={`/courses/${id}`}>
        <button style={buttonStyle}>View Details</button>
      </Link>
    </div>
  );
};

export default CourseCard;