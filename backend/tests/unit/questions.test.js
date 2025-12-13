import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the questions.json file
const dataFilePath = path.join(__dirname, '../../data/questions.json');

// Helpers to read and write questions (exact ca în routes)
const readQuestions = () => JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
const writeQuestions = (questions) => fs.writeFileSync(dataFilePath, JSON.stringify(questions, null, 2));

describe('Questions JSON', () => {
  it('should read questions', () => {
    const data = readQuestions();
    expect(data).toBeInstanceOf(Array);
  });

  it('should have all required fields', () => {
    const data = readQuestions();
    data.forEach(q => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q).toHaveProperty('correctAnswer');
      expect(q).toHaveProperty('difficulty');
    });
  });

  it('should add a new question correctly', () => {
    const questions = readQuestions();
    const newQuestion = {
      id: questions.length ? questions[questions.length - 1].id + 1 : 1,
      question: 'Test question',
      options: ['A', 'B', 'C'],
      correctAnswer: 'A',
      difficulty: 'easy'
    };
    questions.push(newQuestion);
    writeQuestions(questions);

    const updated = readQuestions();
    expect(updated[updated.length - 1].question).toBe('Test question');

    // Clean up after test
    updated.pop();
    writeQuestions(updated);
  });

  it('should update an existing question correctly', () => {
    const questions = readQuestions();
    const index = 0;
    const originalQuestion = { ...questions[index] };
    questions[index].question = 'Updated question';
    writeQuestions(questions);

    const updated = readQuestions();
    expect(updated[index].question).toBe('Updated question');

    // Restore original
    questions[index] = originalQuestion;
    writeQuestions(questions);
  });

  it('should delete a question correctly', () => {
    const questions = readQuestions();
    const newQuestion = {
      id: questions.length ? questions[questions.length - 1].id + 1 : 1,
      question: 'To be deleted',
      options: ['A', 'B'],
      correctAnswer: 'A',
      difficulty: 'easy'
    };
    questions.push(newQuestion);
    writeQuestions(questions);

    const updatedBefore = readQuestions();
    const indexToDelete = updatedBefore.findIndex(q => q.id === newQuestion.id);
    updatedBefore.splice(indexToDelete, 1);
    writeQuestions(updatedBefore);

    const updatedAfter = readQuestions();
    const exists = updatedAfter.find(q => q.id === newQuestion.id);
    expect(exists).toBeUndefined();
  });

  it('should ensure correctAnswer exists in options', () => {
    const data = readQuestions();
    data.forEach(q => {
      expect(q.options).toContain(q.correctAnswer);
    });
  });
});
