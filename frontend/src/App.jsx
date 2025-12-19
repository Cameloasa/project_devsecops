// frontend/src/App.jsx
import { useState } from 'react';
import AdminPage from './pages/AdminPage';
import QuizPage from './pages/QuizPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('quiz'); // 'quiz' or 'admin'
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Quiz Application</h1>
        <nav className="main-nav">
          <button 
            onClick={() => setCurrentPage('quiz')}
            className={currentPage === 'quiz' ? 'active' : ''}
          >
            🧠 Take Quiz
          </button>
          <button 
            onClick={() => setCurrentPage('admin')}
            className={currentPage === 'admin' ? 'active' : ''}
          >
            📝 Admin Panel
          </button>
        </nav>
      </header>
      
      <main>
        {currentPage === 'quiz' ? <QuizPage /> : <AdminPage />}
      </main>
      
      <footer>
        <p>DevSecOps Project - React Frontend + Node.js Backend</p>
      </footer>
    </div>
  );
}

export default App;