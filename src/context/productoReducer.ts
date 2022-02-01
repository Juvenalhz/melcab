import { TotalPedido, Pedido } from '../interfaces/interfaces';

type PedidoAction = { type: 'addPedido', payload: Pedido } | { type: 'resPedido', payload: Pedido } | { type: 'nuevoPedido', payload: Pedido }

export const productoReducer = (state: TotalPedido, action: PedidoAction) => {

    switch (action.type) {
        case 'nuevoPedido':
            return {
                ...state, pedidos : [ action.payload,  ...state.pedidos]
            }

        case 'addPedido':

           return {
               ...state, pedidos : state.pedidos.map (({...pedido}) => {
                   if (pedido.id === action.payload.id) {
                       pedido.cantidad = (pedido.cantidad ?? 0) + 1;
                   }
                   return pedido
               })
           }

        default:
           return state;
    }
}