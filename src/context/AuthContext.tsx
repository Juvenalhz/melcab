import React, { createContext, useEffect } from 'react';
import { LoginData, LoginResponse, RegisterData, Usuario, UbicacionLocal } from '../interfaces/interfaces';
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
    aggDireccion: (ubicacion: UbicacionLocal, iduser : any) => void;
    actDatosUser: (user : Usuario) => void
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

        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            //no hay token
            if (!token) return dispatch({ type: 'notAuthenticate', payload: 'not-Authenticate' })
            //si hay token, valindando token
            //if (condition) {} hacer validacion de token en backend
            const resp = await api.get('/tokenValidate');

            await AsyncStorage.setItem('token', resp.data.token);
            
            dispatch({
                type: 'loginRegistro',
                payload: { status: resp.data.usuarios.tipouser === 1 ? 'authenticated-cliente' : 'authenticated-delivery', user: resp.data.usuarios, token: resp.data.token }
            })
        } catch (error) {
            return  dispatch({ type: 'notAuthenticate', payload: 'not-Authenticate' })
        }


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
    
    const registro = async ({ user, pass, name, tlf, email, direccion, latitud, longitud, rif}: RegisterData) => {
        console.log( user, pass, name, tlf, email, direccion, latitud, longitud)
        try {
            const { data } = await api.post<LoginResponse>('/register', { user, pass, name, tlf, email,  direccion, latitud, longitud, rif });
            console.log( data);
            if (data.msg) {
                dispatch({ type: 'addError', payload: data.msg })
                return false
            } else {
                dispatch({
                    type: 'loginRegistro',
                    payload: { status: 'authenticated-cliente', user: data.usuarios, token: data.token }
                })
                await AsyncStorage.setItem('token', data.token);
    
                return true
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: 'addError', payload: 'Datos invalidos' })
            return false
        }
    };

    const aggDireccion = async ({ direccion, region }: UbicacionLocal, iduser: any) => {

        try {
            const { data } = await api.post('/direccionLocal', { direccion, region, iduser });
            console.log(data);
            dispatch({
                type: 'loginRegistro',
                payload: { status: data.usuarios.tipouser === 1 ? 'authenticated-cliente' : 'authenticated-delivery', user: data.usuarios, token: data.token }
            })
            return true
        } catch (error) {
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

    const actDatosUser = (user: Usuario) => {
        //console.log('funcion actDatosUser: ', user)
        dispatch({ type: 'actDatosUser', payload: {user}  })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            registro,
            login,
            logOut,
            removeError,
            checkToken,
            aggDireccion,
            actDatosUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}
 