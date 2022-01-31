import React, { useState } from 'react';
import { Producto } from '../componentes/Producto';

export const HookProductos = () => {``

    const [total, settotal] = useState(0);
    const [cantidadProducto, setcantidadProducto] = useState([{
        producto: '',
        cantidad: 0,
        precio: 0
    }
    ]);

    const actState = (productos: Array<{producto: string, cantidad: number, precio:number}>) => {
        setcantidadProducto(productos);
    } 

    const sumarProducto = (producto: string, precio: number) => {

        const existe = cantidadProducto.find(
            Productos => Productos.producto == producto
        );

        if (existe) {
            const cantidad = cantidadProducto.find(
                Productos => Productos.producto == producto
            )?.cantidad;

            const array = cantidadProducto.filter(
                Productos => Productos.producto != producto
            )

            setcantidadProducto([...array, {
                producto: producto,
                cantidad: ((cantidad ?? 0) + 1),
                precio: 100
            }])
        } else {
            setcantidadProducto([...cantidadProducto, {
                producto: producto,
                cantidad: 1,
                precio: 100
            }])
        };
        //suma a total de pedido
        settotal(total+precio)



    }


    const restarProducto = (producto: string, precio: number) => {

        const existe = cantidadProducto.find(
            Productos => Productos.producto == producto
        );

        if (existe) {
            const cantidad = cantidadProducto.find(
                Productos => Productos.producto == producto
            )?.cantidad;

            if (cantidad === 0) return
            else {
                const array = cantidadProducto.filter(
                    Productos => Productos.producto != producto
                )

                setcantidadProducto([...array, {
                    producto: producto,
                    cantidad: ((cantidad ?? 0) - 1),
                    precio:100
                }])
            }

        }
    //resta a total de pedido
        settotal(total-precio);
    }
  return {
    restarProducto,
    sumarProducto,
    cantidadProducto,
    total,
    setcantidadProducto,
    actState
  } ;
};
