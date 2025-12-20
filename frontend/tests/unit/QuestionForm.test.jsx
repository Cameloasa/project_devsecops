// tests/unit/QuestionForm.test.jsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionForm from '../../src/components/QuestionForm';

// Mock the API module
vi.mock('../../src/services/api');

// Simple tests for QuestionForm component
describe('QuestionForm - Simple Tests', () => {
  const mockOnSuccess = vi.fn();
  
  const defaultProps = {
    onSuccess: mockOnSuccess,
    editingQuestion: null
  };

  test('renders form with basic fields', () => {
    render(<QuestionForm {...defaultProps} />);
    
    // Check form elements exist
    expect(screen.getByLabelText(/Question Text/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Difficulty/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Option 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Question/i)).toBeInTheDocument();
  });

  // Test edit mode
  test('shows edit mode when editingQuestion is provided', () => {
    const editingQuestion = {
      id: 1,
      question: 'Test question',
      difficulty: 'medium',
      options: ['A', 'B', 'C'],
      correctAnswer: 'A'
    };
    
    render(<QuestionForm {...defaultProps} editingQuestion={editingQuestion} />);
    
    // Should show "Update Question" instead of "Add Question"
    expect(screen.getByText(/Update Question/i)).toBeInTheDocument();
    
    // Form should be pre-filled
    expect(screen.getByDisplayValue('Test question')).toBeInTheDocument();
  });

  test('allows adding more options', () => {
    render(<QuestionForm {...defaultProps} />);
    
    // Initially should have 3 option fields
    const optionInputs = screen.getAllByPlaceholderText(/Option \d+/i);
    expect(optionInputs).toHaveLength(3);
    
    // Click add option button
    const addButton = screen.getByText(/Add Another Option/i);
    fireEvent.click(addButton);
    
    // Should now have 4 option fields
    const updatedOptionInputs = screen.getAllByPlaceholderText(/Option \d+/i);
    expect(updatedOptionInputs).toHaveLength(4);
  });
});