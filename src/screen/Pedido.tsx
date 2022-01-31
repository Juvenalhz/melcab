import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { AppBar } from '../componentes/AppBar';
import { Producto } from '../componentes/Producto';
import { HookPedidos } from '../hook/HookPedidos';


interface Props extends NativeStackScreenProps<any, any> {
}



export const Pedido = ({ route }: Props) => {

    const { restarProducto,
        sumarProducto,
        cantidadProducto,
        total,
        setcantidadProducto, actState } = HookPedidos();

        useEffect(() => {
            actState(route.params?.cantidadProducto);
        }, []);
        

        // 


    return (<>
        <AppBar />
        <Text style={{ fontSize: 20 }}>{JSON.stringify(cantidadProducto)}</Text>

        <ScrollView>

        

        {cantidadProducto.map((e: { producto: string; cantidad: number; precio: number; }) => (
                        <><Text style={{ fontSize: 20 }}>{JSON.stringify(e)}</Text>
                        <Producto restarProducto={restarProducto} sumarProducto={sumarProducto} producto={e} cantidadProductos={cantidadProducto}/>
                        </> ))}  
                    </ScrollView>
    </>)
};

