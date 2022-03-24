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

export interface LoginResponse {
usuario: Usuario;
token: string;

}
export interface Usuario {
rol: string;
estado: boolean;
google: boolean;
nombre: string;
correo: string;
uid: string;
img?: string;
}
