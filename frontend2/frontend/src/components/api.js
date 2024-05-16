import axios from 'axios'

const api_backend = axios.create({
    baseURL: 'localhost:8000'
});

const api_analytics = axios.create({
    baseURL: 'localhost:8001'
});

export {api_backend, api_analytics};