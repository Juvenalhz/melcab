import axios from 'axios';

const productos = axios.create({
    baseURL: 'http://192.168.1.224:3000'
})

export default productos;