import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AppBar } from '../componentes/AppBar';
import { Producto } from '../componentes/Producto';
import { ProductoContext } from '../context/ProductoContext';
import { HookPedidos } from '../hook/HookPedidos';
import { Pedido } from '../interfaces/interfaces';
import * as Progress from 'react-native-progress';


interface Props extends NativeStackScreenProps<any, any> {
}



export const PedidoScreen = ({ route, navigation }: Props) => {

    const { pedidoState, addPedido } = useContext(ProductoContext);





    return (<>
        <AppBar />
        <View style={{ flex: 1 }}>
            <ScrollView>
                {pedidoState.pedidos.map((e: Pedido) => (
                    <>
                        <Producto key={e.id} producto={e} />
                    </>))}
            </ScrollView>
        </View>
        <TouchableOpacity  onPress={() => navigation.navigate('Pagar')} style={{ width: '80%', height: 40, backgroundColor: '#0D3084', borderRadius: 30, alignSelf: 'center', alignItems:'center', marginVertical: 15 }}>
            <Text style={{fontSize:20, fontWeight: '300', color: 'white', alignItems:'center'}}>Pagar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 0.1 }}>
            <View style={{
                elevation: 10,
                shadowColor: 'black',
                flex: 1, backgroundColor: "white", borderTopEndRadius: 10, borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center'

            }}>
                <Text style={{ color: '#0D3084', fontSize: 12 }} >Te faltan {50 - pedidoState.total}$ para que tu pedido sea procesado</Text>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ color: '#0D3084', fontSize: 12, marginHorizontal: 5 }}> Total </Text>
                    <Progress.Bar progress={((pedidoState.total / 50))} width={150} height={15} />
                    <Text style={{ color: '#0D3084', fontSize: 12 }}>  {pedidoState.total}$ </Text>
                    {/* <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> - </Text>
                        <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> $ {pedidoState.total} </Text> */}
                </View>
            </View>
        </TouchableOpacity>

    </>)
};

