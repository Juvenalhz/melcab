import { createContext } from 'react';
import { TotalPedido, Pedido } from '../interfaces/interfaces';

 
export type TotalContextProps = {
    pedidoState: TotalPedido,
    addPedido: (pedido: Pedido) => void,
    resPedido: (pedido: Pedido) => void ,
    borrarPedido: () => void,
    statusPedidoPendiente: () => void
    recuperandoPedido: (data : TotalPedido) => void
}

 export const ProductoContext = createContext<TotalContextProps>( {} as TotalContextProps);