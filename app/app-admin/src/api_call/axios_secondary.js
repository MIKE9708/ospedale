import axios from 'axios'

const BASE_URL='http://localhost:8060/';

const service = axios.create({
    baseURL: BASE_URL
})

export default service