// frontend/src/App.jsx
import { useState } from 'react';
import AdminPage from './pages/AdminPage';
import QuizPage from './pages/QuizPage';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  // application state
   const [userRole, setUserRole] = useState(null); // null, 'user', sau 'admin'
  
   // navigation state
   const renderPage = () => {
    switch(userRole) {
      case 'user':
        return <QuizPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage setUserRole={setUserRole} />;
    }
  };
  
  const handleLogout = () => {
    setUserRole(null); // Back to HomePage
  };

  return (
    <div className="App">

      {userRole && (
      <header className="App-header">
        <h1>📚 Quiz Application</h1>
        <nav className="main-nav">
          <button onClick={handleLogout} className="btn-logout">
             ↩️ Back to Home
          </button>
            <span className="user-badge">
              {userRole === 'admin' ? '👑 Admin' : '👤 User'}
            </span>
        </nav>
      </header>
      )}
      
      <main>
         {renderPage()}
      </main>
      
      <footer>
        <p>DevSecOps Project - React Frontend + Node.js Backend</p>
      </footer>
    </div>
  );
}

export default App;