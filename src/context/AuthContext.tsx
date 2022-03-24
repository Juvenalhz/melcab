import React, { createContext } from 'react';
import { Usuario } from '../interfaces/interfaces';
import { useReducer } from 'react';
import { authReducer, AuthState } from './authReducer';



type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null,
    status: string|'checking' | 'authenticated-cliente' | 'authenticated-delivery' | 'not-authenticated';
    registro: () => void;
    login: () => void;
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



export const AuthProvider = (children: JSX.Element | JSX.Element[]) => {
    const [state, dispatch] = useReducer(authReducer, authInicialState)

    const registro = () => {};
    const login = () => {};
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
