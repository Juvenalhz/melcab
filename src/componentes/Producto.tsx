import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { ProductoContext } from '../context/ProductoContext';
import { Pedido } from '../interfaces/interfaces';
import { dataProducto } from '../interfaces/productosInterfaces';

interface Props {
    restarProducto?: Function
    sumarProducto?: Function
    cantidadProductos?: Array<{ producto: string, cantidad: number, precio: number }>
    producto: Pedido
    datos?: { nombre: string, precio: number, id: number }
}

export const Producto = ({ datos, producto }: Props) => {

    const { pedidoState, addPedido, resPedido } = useContext(ProductoContext);

    const { pedidos } = pedidoState

    return <>
        <View style={{ flexDirection: 'row', height: 115, marginHorizontal: 10, marginVertical: 10 }}>
            <View style={{ backgroundColor: '#BFBFBF', width: 115, height: 115, borderRadius: 10 }}>
                <Image style={{ width: 120, height: 120, marginBottom: 15 }}  source={{ uri: 'http://192.168.1.224:9000/' + datos?.id + 'prod-planetadulce.png' }} />
            </View>

            <View style={{  flexDirection: 'column', justifyContent: 'flex-end', flex: 1, marginHorizontal: 20, marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-evenly' }}>
                        <Text style={{ fontSize: 14, position: 'absolute', top: 0, right: 30 }}>Disponible</Text>
                        <Text style={{ fontSize: 14, position: 'absolute', top: 25, right: 55 }}>25</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 18, }}>Costo:</Text>
                <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                    <Text style={{ fontSize: 18, color: '#0D3084', fontWeight: '700' }}>{producto?.precio}$</Text>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity style={{
                            height: 35,
                            width: 35, backgroundColor: '#0D3084',
                            borderRadius: 100,
                            marginHorizontal: 10,
                            justifyContent: 'center'
                        }}
                            onPress={() => resPedido(producto)}><Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}
                            >-</Text></TouchableOpacity>
                        <Text style={{ fontSize: 16, color: '#0D3084', fontWeight: '700', alignSelf: 'center' }}>
                            {
                                pedidos.find((pedido) => pedido.id == producto.id)?.cantidad ?? 0}
                        </Text>
                        <TouchableOpacity style={{
                            height: 35,
                            width: 35, backgroundColor: '#0D3084',
                            borderRadius: 100,
                            marginHorizontal: 10,
                            justifyContent: 'center'
                        }}
                            // onPress={() => sumarProducto(producto?.producto == null ? datos?.nombre : producto?.producto, datos?.precio)
                            onPress={() => addPedido(producto)
                            }><Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>+</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <Text style={{ fontSize: 18, marginHorizontal: 10, marginVertical:10, borderColor:'rgba(13,48,132,0.5)', borderTopColor:'white', borderWidth:2, borderRadius:8 }}>{datos?.nombre ?? producto?.nombre}</Text>
        
    </>;
};
