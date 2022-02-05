import React from 'react'
import { ProductoContext } from './ProductoContext';
import { TotalPedido, Pedido } from '../interfaces/interfaces';
import { productoReducer } from './productoReducer';
import { useReducer } from 'react';

const INITIAL_STATE: TotalPedido = {
    total: 0,
    pedidos: []
}

interface props {
    children: JSX.Element | JSX.Element[]
}

export const ProductoProvider = ({ children }: props) => {

    const [pedidoState, dispatch] = useReducer(productoReducer, INITIAL_STATE);

    const addPedido = (pedidoAct: Pedido) => {

        const query = pedidoState.pedidos.find((pedido) => 
            pedido.nombre == pedidoAct.nombre );

        console.log('addpedido: ' + JSON.stringify(query))

        if (query) {
            dispatch({type:'addPedido' , payload: pedidoAct})
        } else  {
            pedidoAct.cantidad=1;
            dispatch({type:'nuevoPedido' , payload: pedidoAct})}
    }

    const resPedido = (pedidoAct: Pedido) => {

        const query = pedidoState.pedidos.find((pedido) => 
            pedido.nombre == pedidoAct.nombre );

        console.log('addpedido: ' + JSON.stringify(query))

        if (query) {
            const cantidad = pedidoState.pedidos.find((pedido) => 
            pedido.nombre == pedidoAct.nombre )?.cantidad;

            if (cantidad == 1) {
                dispatch({type:'eliminarPedido' , payload: pedidoAct})
            }else dispatch({type:'resPedido' , payload: pedidoAct})
        } else  return
    }

    return (
    <ProductoContext.Provider value={{pedidoState, addPedido, resPedido}}>
        { children }
    </ProductoContext.Provider>)
};
