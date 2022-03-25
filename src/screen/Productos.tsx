import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Component, useContext, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { AppBar } from '../componentes/AppBar';
import { Producto } from '../componentes/Producto';
import { ProductoContext } from '../context/ProductoContext';
import { HookProductos } from '../hook/HookProductos';
import * as Progress from 'react-native-progress';
import { SearchBar } from 'react-native-elements';
import { JSONProductos, dataProducto } from '../interfaces/productosInterfaces';
import { DrawerScreenProps } from '@react-navigation/drawer';
import api from '../api/endpoint/Endpoint';

interface Props extends DrawerScreenProps<any, any> {
}

export const Productos = ({ navigation, route }: Props) => {


    const { pedidoState, addPedido } = useContext(ProductoContext);

    console.log(pedidoState);

    const [datosproducto, setdatosproducto] = useState<dataProducto[]>([])
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        setisLoading(true);
        api.get<JSONProductos>('/marcas/' + route.params?.marcaid).then(resp => {
            console.log(resp.data)
            setdatosproducto(resp.data.productos);
            setfilterDataProducto(resp.data.productos);

            setisLoading(false);
        })
    }, [route.params?.marcaid])

   

    const { restarProducto,
        sumarProducto,
        cantidadProducto,
        total } = HookProductos();


    const [search, setsearch] = useState('');

    const [filterDataProducto, setfilterDataProducto] = useState<dataProducto[]>();



    const searchFilter = (text: string) => {
        if (text) {
            const productoBuscado = datosproducto?.filter((item) => {
                const itemSelec = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemSelec.indexOf(textData) > -1;
            });
            setsearch(text);
            setfilterDataProducto(productoBuscado)
            
        } else {
            setfilterDataProducto(datosproducto);
            setsearch(text);
        }
    }

    return (
        <>
            <AppBar titulo='Planeta Dulce' navigation={navigation} route={route} />
            <View style={{ flex: 1 }}>
                <View>
                    <TextInput style={{ height: 40, borderWidth: 1, paddingLeft: 20, margin: 5, borderColor: '#009688', backgroundColor: 'white', borderRadius: 10 }}
                        placeholder="Buscar Producto"
                        underlineColorAndroid="transparent"
                        value={search}
                        onChangeText={(text) => searchFilter(text)} />
                </View>

                {isLoading ?
                
                < View style={{flex:1, justifyContent:'center',alignContent:'center'}}>
                    <ActivityIndicator color="blue" size={50} />
                </View>

                :
                
                <ScrollView style={{ backgroundColor: 'white' }}>
                    {filterDataProducto?.map((user) => (
                        <Producto key={user.id} restarProducto={restarProducto} sumarProducto={sumarProducto} datos={user} producto={user} />
                    ))}
                </ScrollView>
            }
                
            </View>
            <View style={{ flexDirection: 'row', flex: 0.1 }}>

                <TouchableOpacity style={{ flex: 1}} onPress={() => navigation.navigate('Pedido')}>
                    <View style={{
                        elevation: 10,
                        shadowColor: 'black',
                        flex: 1, backgroundColor: "white", borderTopEndRadius: 10, borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center'

                    }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#0D3084', fontSize: 18 }}> TOTAL </Text>
                                <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> - </Text>
                                <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> $ {Math.round((pedidoState.total + Number.EPSILON) * 100) / 100} </Text>
                            </View>
                            <Text style={{ color: '#0D3084', fontSize: 12, alignSelf: 'center' }}> Ver Pedido </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>



        </>
    )
}
