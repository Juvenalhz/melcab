import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.224:9000'
})

export default api; 