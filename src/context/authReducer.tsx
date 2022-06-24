import { Usuario } from "../interfaces/interfaces";

export interface AuthState {
    status:  string;
    token: string | null;
    errorMessage: string;
    user: Usuario | null;
    modalLogin: boolean
}

type AuthAction = 
| {type: 'loginRegistro', payload: { token: string, user: Usuario, status: string}}
| {type: 'addError', payload: string}
| {type: 'removeError'}
| {type: 'notAuthenticate', payload: string}
| {type: 'logOut', payload: string}
| {type: 'actDatosUser', payload: {user: Usuario}}

export const authReducer = (state: AuthState, action: AuthAction) : AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'loginRegistro':
            return{
              ...state,
              errorMessage: '' ,
              status: action.payload.status,
              token: action.payload.token,
              user: action.payload.user
            }
        
        case 'logOut':
        case 'notAuthenticate': 
        return {
            ...state,
            status: action.payload,
            token: null,
            user: null
        }
        case 'actDatosUser':
            return {
                ...state,
                user: action.payload.user
            }

            
            
    
        default:
            return state;
    }
}