import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    restarProducto: Function
    sumarProducto: Function
    cantidadProductos: Array<{producto: string, cantidad: number, precio:number}>
    producto?:{producto: string, cantidad: number, precio:number}
    datos?: {nombre: string,  precio:number}
}

export const Producto = ({restarProducto, sumarProducto, cantidadProductos, datos, producto}: Props) => {
    
  return <>
  <View style={{ flexDirection: 'row', height: 115, marginHorizontal: 20, marginVertical: 20 }}>
                        <View style={{ backgroundColor: '#BFBFBF', width: 115, height: 115, borderRadius: 10 }}>

                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', flex: 1, marginHorizontal: 20, marginVertical: 15 }}>
                            <Text style={{ fontSize: 16, position: 'absolute', top: 0 }}>{datos?.nombre ?? producto?.producto}</Text>
                            <Text style={{ fontSize: 16, }}>Costo:</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontSize: 16, color: '#0D3084', fontWeight: '700' }}>{datos?.precio}</Text>
                                <View style={{ flexDirection: 'row', position: 'absolute', right: 10 }}>
                                    <TouchableOpacity style={{
                                        height: 25,
                                        width: 25, backgroundColor: '#0D3084',
                                        borderRadius: 100,
                                        marginHorizontal: 10
                                    }}
                                        onPress={() => restarProducto(producto?.producto == null ? datos?.nombre : producto?.producto, datos?.precio)}><Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}
                                        >-</Text></TouchableOpacity>
                                    <Text style={{ fontSize: 16, color: '#0D3084', fontWeight: '700' }}>{
                                    cantidadProductos.find(
                                        Productos => Productos.producto ===  (producto?.producto == null ? datos?.nombre : producto?.producto)
                                    )?.cantidad
                                     ?? 0}</Text>
                                    <TouchableOpacity style={{
                                        height: 25,
                                        width: 25, backgroundColor: '#0D3084',
                                        borderRadius: 100,
                                        marginHorizontal: 10
                                    }}
                                        onPress={() => sumarProducto(producto?.producto == null ? datos?.nombre : producto?.producto, datos?.precio)}><Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>+</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View></>;
};
