import axios from 'axios';

const productos = axios.create({
    baseURL: 'http://192.168.43.134:9000'
})

export default productos;