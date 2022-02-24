export interface Pedido {
    id: number;
    nombre: string;
    cantidad?: number;
    precio: number;
}

export interface TotalPedido {
    total: number,
    pedidos: Pedido[]
}