// src/components/QuestionForm.jsx
import { useState, useEffect } from 'react';
import { questionAPI } from '../services/api';
import { DIFFICULTY_LEVELS, DEFAULT_QUESTION } from '../utils/constants';

const QuestionForm = ({ editingQuestion, onSuccess }) => {
  const [formData, setFormData] = useState(DEFAULT_QUESTION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (editingQuestion) {
      // Ensure we have the question data
      console.log('Editing question:', editingQuestion);
      setFormData(editingQuestion);
    } else {
      setFormData(DEFAULT_QUESTION);
    }
  }, [editingQuestion]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    
    // If we're editing the option that was marked as correct,
    // update the correctAnswer too
    let newCorrectAnswer = formData.correctAnswer;
    if (formData.correctAnswer === formData.options[index]) {
      newCorrectAnswer = value;
    }
    
    setFormData({ 
      ...formData, 
      options: newOptions, 
      correctAnswer: newCorrectAnswer 
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validate form
    if (!formData.question.trim()) {
      setError('Question text is required');
      setLoading(false);
      return;
    }
    
    if (formData.options.some(opt => !opt.trim())) {
      setError('All options must be filled');
      setLoading(false);
      return;
    }
    
    if (!formData.correctAnswer) {
      setError('Please select a correct answer');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Submitting question:', formData);
      
      if (editingQuestion) {
        await questionAPI.update(editingQuestion.id, formData);
        console.log('Question updated successfully');
      } else {
        await questionAPI.create(formData);
        console.log('Question created successfully');
      }
      
      onSuccess();
      setFormData(DEFAULT_QUESTION);
    } catch (error) {
      console.error('Error saving question:', error);
      setError(`Failed to save question: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };
  
  const addOption = () => {
    if (formData.options.length < 6) { // Limit to 6 options
      setFormData({
        ...formData,
        options: [...formData.options, '']
      });
    }
  };
  
  const removeOption = (index) => {
    if (formData.options.length > 2) { // Minimum 2 options
      const newOptions = formData.options.filter((_, i) => i !== index);
      const wasCorrect = formData.correctAnswer === formData.options[index];
      
      setFormData({
        ...formData,
        options: newOptions,
        correctAnswer: wasCorrect ? '' : formData.correctAnswer
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="question-form" data-testid="question-form">
      {error && (
        <div className="form-error" role="alert">
          ⚠️ {error}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="question">Question Text:</label>
        <textarea
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Enter your question here..."
          disabled={loading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          disabled={loading}
        >
          {DIFFICULTY_LEVELS.map(level => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Options:</label>
        <div className="options-list">
          {formData.options.map((option, index) => (
            <div key={index} className="option-item">
              <div className="option-input">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                  disabled={loading}
                  aria-label={`Option ${index + 1}`}
                />
                {formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="btn-remove"
                    disabled={loading}
                    aria-label={`Remove option ${index + 1}`}
                  >
                    ×
                  </button>
                )}
              </div>
              <label className="correct-label">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctAnswer === option}
                  onChange={() => setFormData({...formData, correctAnswer: option})}
                  disabled={loading}
                />
                <span>Correct Answer</span>
              </label>
            </div>
          ))}
        </div>
        
        {formData.options.length < 6 && (
          <button 
            type="button" 
            onClick={addOption}
            className="btn-add-option"
            disabled={loading}
          >
            + Add Another Option
          </button>
        )}
        
        <div className="options-info">
          <small>Minimum 2 options, maximum 6. Select one correct answer.</small>
        </div>
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          disabled={loading}
          className="btn-submit"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Saving...
            </>
          ) : editingQuestion ? 'Update Question' : 'Add Question'}
        </button>
        
        {editingQuestion && (
          <button 
            type="button" 
            onClick={() => onSuccess()}
            className="btn-cancel"
            disabled={loading}
          >
            Cancel Edit
          </button>
        )}
        
        <button 
          type="button" 
          onClick={() => setFormData(DEFAULT_QUESTION)}
          className="btn-reset"
          disabled={loading}
        >
          Reset Form
        </button>
      </div>
      
      <div className="form-debug" style={{ display: 'none' }}>
        <p><strong>Debug:</strong> {JSON.stringify(formData)}</p>
      </div>
    </form>
  );
};

export default QuestionForm;