// tests/unit/QuestionList.test.jsx
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import QuestionList from '../../src/components/QuestionList';
import { questionAPI } from '../../src/services/api';

// Mock the API
vi.mock('../../src/services/api', () => ({
  questionAPI: {
    getAll: vi.fn()
  }
}));

describe('QuestionList Component', () => {
  const mockQuestions = [
    {
      id: 1,
      question: 'What is JavaScript?',
      difficulty: 'easy',
      options: ['Language', 'Framework', 'Database'],
      correctAnswer: 'Language'
    },
    {
      id: 2,
      question: 'What is React?',
      difficulty: 'medium',
      options: ['Library', 'Framework', 'Language'],
      correctAnswer: 'Library'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loading state initially', () => {
    questionAPI.getAll.mockResolvedValue([]);
    
    render(<QuestionList />);
    
    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
  });

  test('shows error message when API fails', async () => {
    questionAPI.getAll.mockRejectedValue(new Error('Network error'));
    
    render(<QuestionList />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load questions. Please try again.')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  test('renders questions when API succeeds', async () => {
    questionAPI.getAll.mockResolvedValue(mockQuestions);
    
    render(<QuestionList />);
    
    await waitFor(() => {
      expect(screen.getByText('Quiz Questions (2)')).toBeInTheDocument();
    });
    
    expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();
    expect(screen.getByText('What is React?')).toBeInTheDocument();
  });

  test('retry button works after error', async () => {
    // First call fails
    questionAPI.getAll.mockRejectedValueOnce(new Error('First error'));
    // Second call succeeds
    questionAPI.getAll.mockResolvedValueOnce(mockQuestions);
    
    render(<QuestionList />);
    
    // Wait for error
    await waitFor(() => {
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
    
    // Click retry
    fireEvent.click(screen.getByText('Retry'));
    
    // Should show loading, then questions
    await waitFor(() => {
      expect(screen.getByText('Quiz Questions (2)')).toBeInTheDocument();
    });
    
    expect(questionAPI.getAll).toHaveBeenCalledTimes(2);
  });

  test('shows empty state when no questions', async () => {
    questionAPI.getAll.mockResolvedValue([]);
    
    render(<QuestionList />);
    
    await waitFor(() => {
      expect(screen.getByText('No questions found.')).toBeInTheDocument();
    });
  });
});