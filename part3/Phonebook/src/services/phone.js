import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const deletePerson = async (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const updateNumber = async (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}


export default {getAll, create, deletePerson, updateNumber}