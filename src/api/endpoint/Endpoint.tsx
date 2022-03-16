import axios from 'axios';

const productos = axios.create({
    baseURL: 'http://192.168.1.224:9000'
})

export default productos;