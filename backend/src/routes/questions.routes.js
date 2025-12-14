import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { adminOnly } from '../admin/admin';

const router = Router();

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the questions data file
const dataFilePath = path.join(__dirname, '../../data/questions.json');

// Helpers to read questions data
const readQuestions = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helpers to write questions data
const writeQuestions = (questions) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(questions, null, 2));
};

// GET all questions
router.get('/', (req, res) => {
  const questions = readQuestions();
  res.json(questions);
});

// GET a single question by ID
router.get('/:id', (req, res) => {
  const questions = readQuestions();
  const question = questions.find(
    (q) => q.id === parseInt(req.params.id)
  );
  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }
  res.json(question);
});

// POST create a new question
router.post('/', adminOnly,(req, res) => {
  const questions = readQuestions();
  const newQuestion = {
    id: questions.length ? questions[questions.length - 1].id + 1 : 1,
    ...req.body
  };
  questions.push(newQuestion);
  writeQuestions(questions);
  res.status(201).json(newQuestion);
});

// PUT update a question by ID
router.put('/:id', adminOnly, (req, res) => {
  const questions = readQuestions();
  const index = questions.findIndex(
    (q) => q.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).json({ message: 'Question not found' });
  }
  questions[index] = { id: questions[index].id, ...req.body };
  writeQuestions(questions);
  res.json(questions[index]);
});

// DELETE a question by ID
router.delete('/:id', adminOnly, (req, res) => {
  const questions = readQuestions();
  const index = questions.findIndex(
    (q) => q.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).json({ message: 'Question not found' });
  }
  const deleted = questions.splice(index, 1);
  writeQuestions(questions);
  res.json(deleted[0]);
});

export default router;
