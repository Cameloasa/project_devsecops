// src/components/QuestionList.jsx
import React, { useState, useEffect } from 'react';
import { questionAPI } from '../services/api';
import QuestionCard from './QuestionCard';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await questionAPI.getAll();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchQuestions}>Retry</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="no-questions">No questions found.</div>;
  }

  return (
    <div className="question-list" data-testid="question-list">
      <h2>Quiz Questions ({questions.length})</h2>
      <div className="questions-grid">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            question={q.question}
            difficulty={q.difficulty}
            options={q.options}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;