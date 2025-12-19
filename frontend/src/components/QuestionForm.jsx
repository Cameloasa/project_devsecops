// src/components/QuestionForm.jsx
import React, { useState, useEffect } from 'react';
import { questionAPI } from '../services/api';
import { DIFFICULTY_LEVELS, DEFAULT_QUESTION } from '../utils/constants';

const QuestionForm = ({ editingQuestion, onSuccess }) => {
  const [formData, setFormData] = useState(DEFAULT_QUESTION);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (editingQuestion) {
      setFormData(editingQuestion);
    }
  }, [editingQuestion]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingQuestion) {
        await questionAPI.update(editingQuestion.id, formData);
      } else {
        await questionAPI.create(formData);
      }
      onSuccess();
      setFormData(DEFAULT_QUESTION);
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Failed to save question. Check console.');
    } finally {
      setLoading(false);
    }
  };
  
  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, '']
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="question-form">
      <div>
        <label>Question:</label>
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
          rows="3"
        />
      </div>
      
      <div>
        <label>Difficulty:</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          {DIFFICULTY_LEVELS.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Options:</label>
        {formData.options.map((option, index) => (
          <div key={index} className="option-row">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
            <label>
              <input
                type="radio"
                name="correctAnswer"
                checked={formData.correctAnswer === index}
                onChange={() => setFormData({...formData, correctAnswer: index})}
              />
              Correct
            </label>
          </div>
        ))}
        <button type="button" onClick={addOption}>+ Add Option</button>
      </div>
      
      <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : editingQuestion ? 'Update Question' : 'Add Question'}
        </button>
        {editingQuestion && (
          <button type="button" onClick={() => onSuccess()}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default QuestionForm;