import { createContext } from "react";


type OrdeneshContextProps = {

}

interface OrdenState {


}

const Orden: OrdenState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const OrderContext = createContext({} as OrdeneshContextProps);


interface props {
    children: JSX.Element | JSX.Element[]
}


export const OrderProvider = ({ children }: props) => {


    const aggDireccion = async () => {

        try {
            // const { data } = await api.post('/direccionLocal', { direccion, region, iduser });
            // console.log(data);
            // dispatch({
            //     type: 'loginRegistro',
            //     payload: { status: data.usuarios.tipouser === 1 ? 'authenticated-cliente' : 'authenticated-delivery', user: data.usuarios, token: data.token }
            // })
            return true
        } catch (error) {
            return false
        }


    };

    return (
        <OrderContext.Provider value={{
            
           
        }}>
            {children}
        </OrderContext.Provider>
    )
 }