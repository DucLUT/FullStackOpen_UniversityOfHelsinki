import axios from 'axios'
const baseUrl = '/api/notes/'

const getAll = () => {
    const fakeobject = {
        content: 'fake note',
        date: '2020-01-01T00:00:00.000Z',
        important: true,
        id: 200
    }
    return axios.get(baseUrl).then(response => response.data.concat(fakeobject))
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default {getAll, create, update}
