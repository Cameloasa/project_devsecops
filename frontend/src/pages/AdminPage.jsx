// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import QuestionForm from '../components/QuestionForm'; 
import { questionAPI } from '../services/api';

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await questionAPI.getAll();
      console.log('Admin questions:', data);
      setQuestions(data);
    } catch (err) {
      console.error('Failed to load questions:', err);
      setError('Could not load questions. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await questionAPI.delete(id);
        await fetchQuestions(); // Refresh the list
        setFormSuccess('Question deleted successfully!');
        setTimeout(() => setFormSuccess(null), 3000);
      } catch (err) {
        console.error('Delete error:', err);
        setError(`Failed to delete question: ${err.message || 'Check admin privileges (x-role: admin)'}`);
        setTimeout(() => setError(null), 5000);
      }
    }
  };
  
  const handleEdit = (question) => {
    setEditingQuestion(question);
    // Scroll to form
    setTimeout(() => {
      document.querySelector('.form-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };
  
  const handleCreateNew = () => {
    setEditingQuestion(null);
    setFormSuccess(null);
    setError(null);
  };
  
  const handleFormSuccess = () => {
    setFormSuccess(
      editingQuestion 
        ? 'Question updated successfully!' 
        : 'Question created successfully!'
    );
    setEditingQuestion(null);
    fetchQuestions();
    
    // Auto-hide success message
    setTimeout(() => setFormSuccess(null), 3000);
  };
  
  useEffect(() => {
    fetchQuestions();
  }, []);
  
  if (loading) return <div className="admin-loading">Loading admin panel...</div>;
  
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>📝 Admin Panel</h1>
        <p className="admin-subtitle">
          Manage quiz questions. Admin operations require <code>x-role: admin</code> header.
        </p>
        
        <div className="admin-controls">
          <button 
            onClick={handleCreateNew}
            className={`btn-new ${editingQuestion ? 'btn-cancel' : ''}`}
          >
            {editingQuestion ? '✖ Cancel Edit' : '➕ Create New Question'}
          </button>
          <button 
            onClick={fetchQuestions} 
            className="btn-refresh"
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '↻ Refresh List'}
          </button>
        </div>
        
        {/* Status Messages */}
        {formSuccess && (
          <div className="alert alert-success" role="alert">
            ✅ {formSuccess}
          </div>
        )}
        {error && (
          <div className="alert alert-error" role="alert">
            ⚠️ {error}
          </div>
        )}
      </header>
      
      <div className="admin-content">
        <section className="form-section" id="question-form">
          <div className="section-header">
            <h2>{editingQuestion ? `Edit Question #${editingQuestion.id}` : 'Add New Question'}</h2>
            {editingQuestion && (
              <button 
                onClick={handleCreateNew}
                className="btn-cancel-small"
              >
                Cancel Edit
              </button>
            )}
          </div>
          
          <p className="form-info">
            {editingQuestion 
              ? 'Modify the question below. All fields are required.' 
              : 'Fill out all fields to create a new question.'}
          </p>
          
          {/* QuestionForm Component */}
          <QuestionForm 
            editingQuestion={editingQuestion}
            onSuccess={handleFormSuccess}
          />
          
          <div className="form-tips">
            <h4>💡 Tips:</h4>
            <ul>
              <li>Ensure each option is unique</li>
              <li>Select exactly one correct answer</li>
              <li>Questions require at least 2 options</li>
              <li>API calls require <code>x-role: admin</code> header</li>
            </ul>
          </div>
        </section>
        
        <section className="list-section">
          <div className="section-header">
            <div>
              <h2>Existing Questions</h2>
              <p className="questions-count">{questions.length} question{questions.length !== 1 ? 's' : ''} in database</p>
            </div>
            <div className="list-controls">
              <span className="question-count">{questions.length} total</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-scroll-top"
              >
                ↑ Top
              </button>
            </div>
          </div>
          
          {questions.length === 0 ? (
            <div className="no-questions">
              <div className="empty-state">
                <h3>📭 No Questions Yet</h3>
                <p>Create your first question using the form on the left!</p>
                <button 
                  onClick={() => document.querySelector('#question-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-create-first"
                >
                  Create First Question
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="questions-grid">
                {questions.map(q => (
                  <div key={q.id} className="question-item" data-testid={`admin-question-${q.id}`}>
                    <QuestionCard
                      id={q.id}
                      question={q.question}
                      difficulty={q.difficulty}
                      options={q.options}
                      correctAnswer={q.correctAnswer}
                    />
                    <div className="admin-actions">
                      <button 
                        onClick={() => handleEdit(q)}
                        className="btn-edit"
                        aria-label={`Edit question ${q.id}`}
                        title="Edit this question"
                      >
                        <span role="img" aria-label="edit">✏️</span> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(q.id)}
                        className="btn-delete"
                        aria-label={`Delete question ${q.id}`}
                        title="Delete this question"
                      >
                        <span role="img" aria-label="delete">🗑️</span> Delete
                      </button>
                    </div>
                    <div className="question-meta">
                      <small>ID: {q.id} • Difficulty: {q.difficulty}</small>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="list-footer">
                <p>
                  Showing all {questions.length} questions. 
                  Use edit/delete buttons to manage.
                </p>
                <button 
                  onClick={fetchQuestions}
                  className="btn-load-more"
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh Questions'}
                </button>
              </div>
            </>
          )}
        </section>
      </div>
      
      <div className="admin-footer">
        <div className="footer-content">
          <p className="api-info">
            <strong>🔧 API Endpoint:</strong> 
            <code>{window.location.origin}/api/questions</code>
          </p>
          <p className="auth-info">
            <strong>🔐 Authentication:</strong> 
            POST/PATCH/DELETE require <code>x-role: admin</code> header
          </p>
          <p className="tech-info">
            <strong>🛠️ Tech:</strong> React Frontend • Node.js Backend • JSON Database
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;