import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => {
  return axios.get(baseURL).then(res => res.data);
};