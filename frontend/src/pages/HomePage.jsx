// src/pages/HomePage.jsx
import { useState } from 'react';


const HomePage = ({ setUserRole }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleUserLogin = () => {
    setUserRole('user'); // Send to Quiz Page
  };
  
  const handleAdminLogin = () => {
    if (password === '123') { // Simple password check
      setUserRole('admin'); // Send to Admin Page
    } else {
      setError('Incorrect admin password');
    }
  };
  
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>📚 Welcome to Quiz App</h1>
        <p>Test your knowledge or manage questions</p>
      </header>
      
      <div className="login-options">
        <div className="option-card user-option">
          <h2>🧠 Take Quiz</h2>
          <p>Answer questions and test your knowledge</p>
          <button onClick={handleUserLogin} className="btn-user">
            Start Quiz as User
          </button>
        </div>
        
        <div className="option-card admin-option">
          <h2>📝 Admin Panel</h2>
          <p>Manage questions (requires password)</p>
          
          <div className="admin-login">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <button onClick={handleAdminLogin} className="btn-admin">
              Login as Admin
            </button>
          </div>
          
          {error && <p className="error-message">❌ {error}</p>}
          
          <div className="password-hint">
            <small>Hint: Admin password is <code>123</code> (for demo)</small>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;