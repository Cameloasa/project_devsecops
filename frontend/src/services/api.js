import axios from 'axios';

const API_BASE_URL = '/api'; // redirect to localhost:3000

export const questionAPI = {
  // GET all questions
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },

  // GET single question by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching question ${id}:`, error);
      throw error;
    }
  },

  // POST create new question
  create: async (questionData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/questions`, questionData, {
        headers: {
          'x-role': 'admin' // Required for admin routes
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  },

  // PATCH update question
  update: async (id, updates) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/questions/${id}`, updates, {
        headers: {
          'x-role': 'admin'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating question ${id}:`, error);
      throw error;
    }
  },

  // DELETE question
  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/questions/${id}`, {
        headers: {
          'x-role': 'admin'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting question ${id}:`, error);
      throw error;
    }
  }
};