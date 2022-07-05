import { TotalPedido, Pedido } from '../interfaces/interfaces';

type PedidoAction = { type: 'addPedido', payload: Pedido } | { type: 'resPedido', payload: Pedido } | { type: 'nuevoPedido', payload: Pedido }
    | { type: 'resPedido', payload: Pedido } | { type: 'eliminarPedido', payload: Pedido } | { type: 'borrarPedido' }
    | { type: 'pedidoActivo' }

export const productoReducer = (state: TotalPedido, action: PedidoAction) => {

    switch (action.type) {
        case 'nuevoPedido':
            return {
                ...state, pedidos: [action.payload, ...state.pedidos], total: state.total = state.total + action.payload.precio
            }

        case 'addPedido':

            return {
                ...state, pedidos: state.pedidos.map(({ ...pedido }) => {
                    if (pedido.id === action.payload.id) {
                        pedido.cantidad = (pedido.cantidad ?? 0) + 1;

                    }
                    return pedido
                }), total: state.total = state.total + action.payload.precio
            }

        case 'resPedido':

            return {
                ...state, pedidos: state.pedidos.map(({ ...pedido }) => {
                    if (pedido.id === action.payload.id) {
                        pedido.cantidad = (pedido.cantidad ?? 0) - 1;

                    }
                    return pedido
                }), total: state.total = state.total - action.payload.precio
            }

        case 'eliminarPedido':

            return {
                ...state, pedidos: state.pedidos.filter(({ ...pedido }) =>
                    pedido.id != action.payload.id

                ), total: state.total = state.total - action.payload.precio
            }

        case 'borrarPedido': 
        return{
            ...state,
            pedidos: [], total: 0
        }
        case 'pedidoActivo': 
        return{
            ...state,
            pedidoPendiente: !state.pedidoPendiente
        }

     


        default:
            return state;
    }
}