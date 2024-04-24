// api.ts
import axios from 'axios';

const API_URL = 'https://jelou-prueba-tecnica1-frontend.rsbmk.workers.dev';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/default/library`);
    return response.data.default.library;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
