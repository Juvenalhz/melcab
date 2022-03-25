import React, { createContext } from 'react';
import { LoginData, LoginResponse, Usuario } from '../interfaces/interfaces';
import { useReducer } from 'react';
import { authReducer, AuthState } from './authReducer';
import api from '../api/endpoint/Endpoint';



type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null,
    status: string|'checking' | 'authenticated-cliente' | 'authenticated-delivery' | 'not-authenticated';
    registro: () => void;
    login: ( loginData : LoginData ) => void;
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


export const AuthProvider = ({children} : props) => {
    const [state, dispatch] = useReducer(authReducer, authInicialState)

    const login = async({user, pass} : LoginData) => {

        try {
            const resp = await api.post<LoginResponse>('/login', {user, pass});
            console.log(resp.data);
        } catch (error) {
            
        }

    };
    const registro = () => {};
    const logOut = () => {};
    const removeError = () => {};

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
