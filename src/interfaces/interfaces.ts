export interface Pedido {
    id: string;
    nombre: string;
    cantidad?: number;
    precio: number;
}

export interface TotalPedido {
    total: number,
    pedidos: Pedido[]
}