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
    registro: ( registerData : RegisterData) => void;
    login: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
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
        //no hay token
        if (!token)  return dispatch({type:'notAuthenticate', payload:'notAuthenticate'})
        //si hay token, valindando token
        //if (condition) {} hacer validacion de token en backend
        //await AsyncStorage.setItem('token', data.token);
        // dispatch({
        //     type: 'loginRegistro',
        //     payload: { status, user: data.usuario, token: data.token }
        // })
    }

    const login = async ({ user, pass }: LoginData) => {
        try {
            const { data } = await api.post<LoginResponse>('/login', { user, pass });
            console.log(data);
            var status = data.usuario.tipouser == 1 ? 'authenticated-cliente' : 'authenticated-delivery';
            dispatch({
                type: 'loginRegistro',
                payload: { status, user: data.usuario, token: data.token }
            })
            await AsyncStorage.setItem('token', data.token);
            
        } catch (error) {
            dispatch({ type: 'addError', payload: 'El usuario o la clave son incorrectos' })
        }
        
    };
    const registro = async ({user, pass, name, tlf, email, direccion} : RegisterData) => { 
        
        try {
            const { data } = await api.post<LoginResponse>('/register', { user, pass, name, tlf, email, direccion });
            var status = data.usuario.tipouser == 1 ? 'authenticated-cliente' : 'authenticated-delivery';
            dispatch({
                type: 'loginRegistro',
                payload: { status, user: data.usuario, token: data.token }
            })
        } catch (error) {
            dispatch({ type: 'addError', payload: 'El usuario o la clave son incorrectos' })

        }


    };
    const logOut = async () => { 
        await AsyncStorage.removeItem('token');
        dispatch({type: 'logOut', payload:'notAuthenticate'})
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
        }}>
            {children}
        </AuthContext.Provider>
    )
}
