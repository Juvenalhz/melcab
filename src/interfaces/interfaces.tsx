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
usuarios: Usuario;
token: string;

}
export interface Usuario {
    id: number,
    nombre: string,
    email: string,
    direccion: string,
    tlf: string,
    tn: string | null,
    imagen?: string | null,
    cuandrante: 1,
    pass: string,
    codigo_aprobacion: string,
    user: string,
    aprobado: number,
    tipouser: number
}

export interface LoginData {
    user: string,
    pass: string
}

export interface RegisterData {
    name: string ,
    user: string,
    pass: string
    email: string,
    tlf: string,
    direccion: string,
}

