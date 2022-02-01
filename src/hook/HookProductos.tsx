import React, { useState } from 'react';
import { Producto } from '../componentes/Producto';
import { Pedido } from '../interfaces/interfaces';

export const HookProductos = () => {

    const INITIAL_STATE: Pedido = {
        id: '',
        nombre: '',
        cantidad: 0,
        precio: 0
    }

    const [total, settotal] = useState(0);
    const [cantidadProducto, setcantidadProducto] = useState([INITIAL_STATE]);

   

    const sumarProducto = (producto: string, precio: number) => {

        // const existe = cantidadProducto.find(
        //     Productos => Productos.nombre == producto
        // );

        // if (existe) {
        //     const cantidad = cantidadProducto.find(
        //         Productos => Productos.nombre == producto
        //     )?.cantidad;

        //     const array = cantidadProducto.filter(
        //         Productos => Productos.nombre != producto
        //     )

        //     setcantidadProducto([...array, {
        //         id: 
        //         nombre: producto,
        //         cantidad: ((cantidad ?? 0) + 1),
        //         precio: 100
        //     }])
        // } else {
        //     setcantidadProducto([...cantidadProducto, {
        //         id: 
        //         nombre: producto,
        //         cantidad: 1,
        //         precio: 100
        //     }])
        // };
        // //suma a total de pedido
        // settotal(total+precio)



    }


    const restarProducto = (producto: string, precio: number) => {

    //     const existe = cantidadProducto.find(
    //         Productos => Productos.nombre == producto
    //     );

    //     if (existe) {
    //         const cantidad = cantidadProducto.find(
    //             Productos => Productos.nombre == producto
    //         )?.cantidad;

    //         if (cantidad === 0) return
    //         else {
    //             const array = cantidadProducto.filter(
    //                 Productos => Productos.nombre != producto
    //             )

    //             setcantidadProducto([...array, {
    //                 nombre: producto,
    //                 cantidad: ((cantidad ?? 0) - 1),
    //                 precio:100
    //             }])
    //         }

    //     }
    // //resta a total de pedido
    //     settotal(total-precio);
    }
  return {
    restarProducto,
    sumarProducto,
    cantidadProducto,
    total,
    setcantidadProducto,
   
  } ;
};
