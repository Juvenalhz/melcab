import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { AppBar } from '../componentes/AppBar';
import { Producto } from '../componentes/Producto';
import { ProductoContext } from '../context/ProductoContext';
import { HookProductos } from '../hook/HookProductos';

interface Props extends NativeStackScreenProps<any, any> {
}

export const Productos = ({ navigation }: Props) => {

    const {pedidoState, addPedido} = useContext(ProductoContext);

    console.log(pedidoState);

    const datosproducto = [{
        id: '1',
        nombre: 'pepsi',
        precio: 2
    }, {
        id: '2',
        nombre: 'doritos',
        precio: 0.5
    },
    {
        id: '3',
        nombre: 'mantequilla',
        precio: 1.5
    },
    {
        id: '4',
        nombre: 'platanito',
        precio: 1.5
    },
    {
        id: '5',
        nombre: 'harina',
        precio: 1.5
    },
    {
        id: 'd',
        nombre: 'compota',
        precio: 1.5
    }]

    const { restarProducto,
        sumarProducto,
        cantidadProducto,
        total } = HookProductos();

    return (
        <>
            <AppBar />

            <View style={{ flex: 1, }}>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    {datosproducto.map((user) => (
                        <Producto key={user.id} restarProducto={restarProducto} sumarProducto={sumarProducto} datos={user} producto={user} />
                    ))}




                </ScrollView>
            </View>
            <TouchableOpacity style={{ flex: 0.1 }} onPress={() => navigation.navigate('Pedido', { cantidadProducto })}>
                <View style={{
                    elevation: 10,
                    shadowColor: 'black',
                    flex: 1, backgroundColor: "white", borderTopEndRadius: 10, borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center'

                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ color: '#0D3084', fontSize: 18 }}>TOTAL </Text>
                        <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> - </Text>
                        <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> $ {total} </Text>
                    </View>
                </View>
            </TouchableOpacity>


        </>
    )
}
