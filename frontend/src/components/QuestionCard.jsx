// frontend/src/components/QuestionCard.jsx

const QuestionCard = ({ question, difficulty, options, id, correctAnswer }) => {
  return (
    <div className="question-card" data-testid={`question-${id}`}>
      <h3>Question #{id}</h3>
      <p><strong>Question:</strong> {question}</p>
      <p><strong>Difficulty:</strong> 
        <span className={`difficulty-${difficulty}`}>{difficulty}</span>
      </p>
      
      <div className="options">
        <p><strong>Options:</strong></p>
        <ul>
          {options.map((option, index) => (
            <li 
              key={index} 
              className={option === correctAnswer ? "correct-option" : ""}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      
      <p><strong>Correct Answer:</strong> {correctAnswer}</p>
    </div>
  );
};

export default QuestionCard;