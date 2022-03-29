import React, { createContext, useEffect } from 'react';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/interfaces';
import { useReducer } from 'react';
import { authReducer, AuthState } from './authReducer';
import api from '../api/endpoint/Endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';



type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null,
    status: string | 'checking' | 'authenticated-cliente' | 'authenticated-delivery' | 'not-authenticated';
    registro: (registerData: RegisterData) => Promise<boolean>;
    login: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
    checkToken: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}


export const AuthContext = createContext({} as AuthContextProps);

interface props {
    children: JSX.Element | JSX.Element[]
}


export const AuthProvider = ({ children }: props) => {
    const [state, dispatch] = useReducer(authReducer, authInicialState)


    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {

        const token = await AsyncStorage.getItem('token');
        console.log(token)
        //no hay token
        if (!token) return dispatch({ type: 'notAuthenticate', payload: 'not-Authenticate' })
        //si hay token, valindando token
        //if (condition) {} hacer validacion de token en backend
        const resp = await api.get('/tokenValidate');

        console.log(resp);
        // if (status !== 200) {
        //     dispatch({ type: 'notAuthenticate', payload: 'not-Authenticate' })
        // }

        // await AsyncStorage.setItem('token', data.token);
        // dispatch({
        //     type: 'loginRegistro',
        //     payload: { status: data.usuarios.tipouser === 1 ? 'authenticated-cliente' : 'authenticated-delivery', user: data.usuarios, token: data.token }
        // })
    }

    const login = async ({ user, pass }: LoginData) => {
        try {
            const { data } = await api.post<LoginResponse>('/login', { user, pass });
            console.log(data);

            dispatch({
                type: 'loginRegistro',
                payload: { status: data.usuarios.tipouser === 1 ? 'authenticated-cliente' : 'authenticated-delivery', user: data.usuarios, token: data.token }
            })
             await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {

            console.log(error.response.data.msg)
            dispatch({ type: 'addError', payload: error.response.data.msg })
        }

    };
    const registro = async ({ user, pass, name, tlf, email, direccion }: RegisterData) => {

        try {
            const { data } = await api.post<LoginResponse>('/register', { user, pass, name, tlf, email, direccion });
            console.log(data.usuarios);
            dispatch({
                type: 'loginRegistro',
                payload: { status: 'authenticated-cliente', user: data.usuarios, token: data.token }
            })
             await AsyncStorage.setItem('token', data.token);

             return true
        } catch (error) {
            dispatch({ type: 'addError', payload: 'El usuario o la clave son incorrectos' })
            return false
        }


    };
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logOut', payload: 'not-Authenticate' })
    };


    const removeError = () => {
        dispatch({ type: 'removeError' })
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            registro,
            login,
            logOut,
            removeError,
            checkToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}
