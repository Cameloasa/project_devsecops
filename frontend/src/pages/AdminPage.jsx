// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react';
import QuestionList from '../components/QuestionList';
import QuestionCard from '../components/QuestionCard';
import { questionAPI } from '../services/api';

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await questionAPI.getAll();
      console.log('Admin questions:', data);
      setQuestions(data);
      setError(null);
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
        fetchQuestions(); // Refresh the list
        alert('Question deleted successfully!');
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete question. Make sure you have admin privileges (x-role: admin header is sent).');
      }
    }
  };
  
  const handleEdit = (question) => {
    setEditingQuestion(question);
    // Scroll to form
    document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleCreateNew = () => {
    setEditingQuestion(null);
  };
  
  useEffect(() => {
    fetchQuestions();
  }, []);
  
  if (loading) return <div className="admin-loading">Loading admin panel...</div>;
  if (error) return <div className="admin-error">{error}</div>;
  
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>📝 Admin Panel</h1>
        <p className="admin-subtitle">Manage quiz questions. Admin operations require x-role: admin header.</p>
        
        <div className="admin-controls">
          <button 
            onClick={handleCreateNew}
            className="btn-new"
            disabled={editingQuestion === null}
          >
            {editingQuestion ? 'Cancel Edit' : 'Create New Question'}
          </button>
          <button onClick={fetchQuestions} className="btn-refresh">
            ↻ Refresh List
          </button>
        </div>
      </header>
      
      <div className="admin-content">
        <section className="form-section">
          <h2>{editingQuestion ? `Edit Question #${editingQuestion.id}` : 'Add New Question'}</h2>
          <p className="form-info">
            {editingQuestion 
              ? 'Modify the question below. All fields are required.' 
              : 'Fill out all fields to create a new question.'}
          </p>
          
          {/* Temporary simple form - we'll create QuestionForm component later */}
          <div className="temp-form">
            <p><strong>Note:</strong> The QuestionForm component needs to be created.</p>
            <p>For now, you can only view and delete questions.</p>
            {editingQuestion && (
              <div className="editing-preview">
                <h4>Currently editing:</h4>
                <p><strong>Question:</strong> {editingQuestion.question}</p>
                <p><strong>Correct Answer:</strong> {editingQuestion.correctAnswer}</p>
              </div>
            )}
          </div>
        </section>
        
        <section className="list-section">
          <div className="section-header">
            <h2>Existing Questions ({questions.length})</h2>
            <span className="question-count">{questions.length} questions</span>
          </div>
          
          {questions.length === 0 ? (
            <div className="no-questions">
              <p>No questions found. Create your first question!</p>
            </div>
          ) : (
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
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(q.id)}
                      className="btn-delete"
                      aria-label={`Delete question ${q.id}`}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      
      <div className="admin-footer">
        <p className="api-info">
          <strong>API Info:</strong> DELETE/PATCH/POST require <code>x-role: admin</code> header.
          Current backend: <code>{window.location.origin}/api/questions</code>
        </p>
      </div>
    </div>
  );
};

export default AdminPage;