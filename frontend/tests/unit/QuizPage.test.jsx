// tests/unit/QuizPage.test.jsx
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import QuizPage from '../../src/pages/QuizPage';
import { questionAPI } from '../../src/services/api';

// Mock the API module
vi.mock('../../src/services/api', () => ({
  questionAPI: {
    getAll: vi.fn()
  }
}));

// Simple tests for QuizPage component
describe('QuizPage - Simple Tests', () => {
  const mockQuestions = [
    {
      id: 1,
      question: 'What is JavaScript?',
      difficulty: 'easy',
      options: ['Language', 'Framework', 'Database'],
      correctAnswer: 'Language'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loading then displays question', async () => {
    // 1. Setup mock
    questionAPI.getAll.mockResolvedValue(mockQuestions);
    
    // 2. Render component under test
    render(<QuizPage />);
    
    // 3. Verify loading state to be in the document
    expect(screen.getByText('Loading quiz questions...')).toBeInTheDocument();
    
    // 4. Wait for question to appear
    await waitFor(() => {
      expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();
    });

    // 5. Verify that loading has disappeared
    expect(screen.queryByText('Loading quiz questions...')).toBeNull();
    
    // 6. Verify options
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Database')).toBeInTheDocument();
  });

  test('user can select an answer', async () => {
    questionAPI.getAll.mockResolvedValue(mockQuestions);
    
    render(<QuizPage />);
    
    // Await for question to appear
    await waitFor(() => {
      expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();
    });
    
    // Find the button for the correct 'Language' answer
    const languageButton = screen.getByText('Language');
    
    // Click on the answer button
    fireEvent.click(languageButton);
    
    // Verify feedback is shown
    await waitFor(() => {
      // Fint the feedback element
      const hasFeedback = screen.queryByText(/correct|wrong/i);
      expect(hasFeedback).toBeTruthy();
    });
    
    // Verify that all buttons are disabled after an answer is selected
    const allButtons = screen.getAllByRole('button');
    allButtons.forEach(button => {
      if (button.textContent !== 'Restart Quiz') { 
        expect(button).toBeDisabled();
      }
    });
  });
});