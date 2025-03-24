import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}
const createNew = async (content) => {
    const anecdote = {content, votes: 0}
    const response = await axios.post(baseURL,anecdote)
    return response.data
}

const updateAnecdote = async (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject).then(response=>response.data)
}

export default {getAll, createNew, updateAnecdote}