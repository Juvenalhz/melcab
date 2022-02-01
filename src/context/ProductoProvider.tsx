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

    return (
    <ProductoContext.Provider value={{pedidoState, addPedido}}>
        { children }
    </ProductoContext.Provider>)
};
