import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:5404"
})

export default instance