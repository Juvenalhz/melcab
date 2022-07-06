export interface Pedido {
    id: number;
    nombre: string;
    cantidad?: number;
    precio: number;
    precio2: number;
    precio3: number;
    stock: number;
    descripcion: string
}

export interface TotalPedido {
    total: number ,
    pedidos: Pedido[],
    pedidoPendiente?: boolean
}

export interface LoginResponse {
usuarios: Usuario;
token: string;
msg?: string
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
    tipouser: number,
    longitud: number,
    latitud: number,
    rango: number
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
    longitud: number,
    latitud: number,
    rif: string,
    Tnegocio:number
}

export interface UbicacionLocal {
        direccion: string,
        region: any,
        
}
export interface Orden {
    banco: string,
    cantidad: number,
    email: string,
    fecha: string,
    id_pedido: number,
    id_producto_pedido: number,
    monto:number,
    nombre: string,
    num_ref: number,
    producto: string,
    tlf: string,
    cantidadT:number,
    delivery:string,
    id_producto: number
}

export interface TiposNegocios {
    id_tn: number,
    nombre_tn: string
    
}
