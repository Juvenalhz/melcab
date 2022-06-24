import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tuplanetadulce.com',
    timeout: 1000
})

const apis = axios.create({
    baseURL: 'https://tuplanetadulce.com'
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