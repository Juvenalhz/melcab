import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { AppBar } from '../componentes/AppBar';
import { Producto } from '../componentes/Producto';
import { ProductoContext } from '../context/ProductoContext';
import { HookPedidos } from '../hook/HookPedidos';
import { Pedido } from '../interfaces/interfaces';


interface Props extends NativeStackScreenProps<any, any> {
}



export const PedidoScreen = ({ route }: Props) => {

    const {pedidoState, addPedido} = useContext(ProductoContext);



        

    return (<>
        <AppBar />
        <Text style={{ fontSize: 20 }}>{JSON.stringify(pedidoState)}</Text>

        <ScrollView>

        

        {pedidoState.pedidos.map((e: Pedido ) => (
                        <><Text style={{ fontSize: 20 }}>{JSON.stringify(e)}</Text>
                        <Producto key={e.id} producto={e} />
                        </> ))}  
                    </ScrollView>
    </>)
};

