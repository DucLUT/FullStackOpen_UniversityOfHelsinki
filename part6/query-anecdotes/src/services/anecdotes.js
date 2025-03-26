import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => {
  return axios.get(baseURL).then(res => res.data);
};

export const createAnecdote = (anecdote) => {
    return axios.post(baseURL, anecdote).then(res => res.data)
}

export const updateAnecdote = (id, newAnecdote) => {
    return axios.put(`${baseURL}/${id}`, newAnecdote).then(res => res.data)
}