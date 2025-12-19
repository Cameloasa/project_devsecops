// src/pages/QuizPage.jsx
import { useState, useEffect } from 'react';
import { questionAPI } from '../services/api';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadQuestions();
  }, []);
  
  const loadQuestions = async () => {
    try {
      setLoading(true);
      console.log('Loading quiz questions...');
      const data = await questionAPI.getAll();
      console.log('Questions loaded:', data);
      setQuestions(data);
    } catch (err) {
      console.error('Failed to load questions:', err);
      setError('Could not load quiz questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnswer = (selectedOptionText) => {
    // Set the selected option text
    setSelectedOption(selectedOptionText);
    
    const currentQuestion = questions[currentIndex];
    console.log('Selected:', selectedOptionText, 'Correct:', currentQuestion.correctAnswer);
    
    // Compare selected option text with correct answer
    if (selectedOptionText === currentQuestion.correctAnswer) {
      console.log('Correct answer!');
      setScore(score + 1);
    } else {
      console.log('Wrong answer');
    }
    
    // Move to the next question after 3 seconds
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 3000);
  };
  
  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    loadQuestions();
  };
  
  // Set up states for loading, error, and empty question list
  if (loading) return <div className="quiz-loading">Loading quiz questions...</div>;
  if (error) return <div className="quiz-error">{error}</div>;
  if (questions.length === 0 && !loading) return <div className="quiz-empty">No questions available for quiz.</div>;
  
  if (showResult) {
    return (
      <div className="quiz-result">
        <h2>Quiz Completed! 🎉</h2>
        <p>Your score: {score}/{questions.length}</p>
        <p>Percentage: {Math.round((score / questions.length) * 100)}%</p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }
  
  const currentQuestion = questions[currentIndex];
  
  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <h1>🧠 Quiz Challenge</h1>
        <div className="quiz-progress">
          <p>Question <strong>{currentIndex + 1}</strong> of <strong>{questions.length}</strong></p>
          <p>Score: <strong>{score}</strong></p>
          <p>Difficulty: <span className={`difficulty-${currentQuestion.difficulty}`}>{currentQuestion.difficulty}</span></p>
        </div>
      </header>
      
      <div className="quiz-card">
        <h3 className="question-text">{currentQuestion.question}</h3>
        
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)} // Send option text
              disabled={selectedOption !== null}
              className={`
                option-btn 
                ${selectedOption === option ? 'selected' : ''}
                ${selectedOption !== null && option === currentQuestion.correctAnswer ? 'correct' : ''}
                ${selectedOption !== null && selectedOption !== currentQuestion.correctAnswer && selectedOption === option ? 'wrong' : ''}
              `}
            >
              {option}
            </button>
          ))}
        </div>
        
        {selectedOption !== null && (
          <div className="feedback">
            {selectedOption === currentQuestion.correctAnswer 
              ? (
                <div className="feedback-correct">
                  <span>✅</span> Correct! Well done!
                </div>
              ) 
              : (
                <div className="feedback-wrong">
                  <span>❌</span> Wrong! The correct answer is: <strong>{currentQuestion.correctAnswer}</strong>
                </div>
              )}
          </div>
        )}
        
        <div className="quiz-navigation">
          <p>Click an option to answer. You'll move automatically to the next question.</p>
          {selectedOption && (
            <p className="auto-next">Moving to next question in 1 second...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;