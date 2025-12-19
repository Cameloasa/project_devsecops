// tests/unit/QuestionCard.test.jsx
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionCard from '../../src/components/QuestionCard';
import '@testing-library/jest-dom'; 

describe('QuestionCard Component', () => {
  const mockQuestion = {
    id: 1,
    question: 'What is JavaScript?',
    difficulty: 'easy',
    options: ['Language', 'Framework', 'Database'],
    correctAnswer: 'Language'
  };

  beforeEach(() => {
    render(<QuestionCard {...mockQuestion} />);
  });

  test('renders basic question information', () => {
    expect(screen.getByText('Question #1')).toBeInTheDocument();
    expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();
    expect(screen.getByText('easy')).toBeInTheDocument();
    expect(screen.getByText('Correct Answer:')).toBeInTheDocument();
  });

  test('renders all options in the list', () => {
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    
    const texts = listItems.map(item => item.textContent);
    expect(texts).toContain('Language');
    expect(texts).toContain('Framework');
    expect(texts).toContain('Database');
  });

  test('highlights the correct answer in the options list', () => {
    const listItems = screen.getAllByRole('listitem');
    const correctItem = listItems.find(item => item.textContent === 'Language');
    const wrongItems = listItems.filter(item => item.textContent !== 'Language');
    
    expect(correctItem).toHaveClass('correct-option');
    wrongItems.forEach(item => {
      expect(item).not.toHaveClass('correct-option');
    });
  });

  test('displays the correct answer separately', () => {
    const correctAnswerPara = screen.getByText('Correct Answer:').closest('p');
    expect(correctAnswerPara).toHaveTextContent('Language');
  });
});