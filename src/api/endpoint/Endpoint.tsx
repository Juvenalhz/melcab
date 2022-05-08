import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://tuplanetadulce.com:3000'
=======
    baseURL: 'http://192.168.1.93:5000'
>>>>>>> 11b9a1655d15cea97cde5a4726cd094ac63c4cb2
})

const apis = axios.create({
    baseURL: 'http://192.168.1.93:5000'
})

api.interceptors.request.use(
    async(config : any) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['x-token'] = token;
        }
        console.log({token})
        return config;
    }
)

export default api; 