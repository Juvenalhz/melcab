import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { AppBar } from '../componentes/AppBar';
import { Producto } from '../componentes/Producto';
import { ProductoContext } from '../context/ProductoContext';
import { HookProductos } from '../hook/HookProductos';
import * as Progress from 'react-native-progress';
import { SearchBar } from 'react-native-elements';

interface Props extends NativeStackScreenProps<any, any> {
}

export const Productos = ({ navigation }: Props) => {

    const { pedidoState, addPedido } = useContext(ProductoContext);

    console.log(pedidoState);

    const datosproducto = [{
        id: '1',
        nombre: ' Pepsi 2LT paquete de 6 UND',
        precio: 2
    }, {
        id: '2',
        nombre: ' Doritos XXL caja de 12 UND',
        precio: 0.5
    },
    {
        id: '3',
        nombre: ' Mantequilla 1 Kg caja de 12 UND',
        precio: 1.5
    },
    {
        id: '4',
        nombre: ' Platanito 120 gr caja de 20 UND',
        precio: 1.5
    },
    {
        id: '5',
        nombre: ' Harina 1KG bolsa de 20 UND',
        precio: 1.5
    },
    {
        id: '6',
        nombre: ' Compota caja de 30 UND',
        precio: 1.5
    }]

    const { restarProducto,
        sumarProducto,
        cantidadProducto,
        total } = HookProductos();


    const [search, setsearch] = useState('');
    const [filterdData, setfilterdData] = useState({});
    const [dataProducto, setdataProducto] = useState([
        {
            id: '1',
            nombre: ' Pepsi 2LT paquete de 6 UND',
            precio: 2
        }, {
            id: '2',
            nombre: ' Doritos XXL caja de 12 UND',
            precio: 0.5
        },
        {
            id: '3',
            nombre: ' Mantequilla 1 Kg caja de 12 UND',
            precio: 1.5
        },
        {
            id: '4',
            nombre: ' Platanito 120 gr caja de 20 UND',
            precio: 1.5
        },
        {
            id: '5',
            nombre: ' Harina 1KG bolsa de 20 UND',
            precio: 1.5
        },
        {
            id: '6',
            nombre: ' Compota caja de 30 UND',
            precio: 1.5
        }
    ]);



    const searchFilter = (text: string) => {
        if (text) {
            const productoBuscado = datosproducto.filter((item) => {
                const itemSelec = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemSelec.indexOf(textData) > -1;
            });
            setfilterdData(productoBuscado);
            setsearch(text);
            setdataProducto(productoBuscado)
            
        } else {
            setdataProducto(datosproducto);
            setsearch(text);
        }
    }

    return (
        <>
            <AppBar titulo='Planeta Dulce' />
            <View style={{ flex: 1 }}>
                <View>
                    <TextInput style={{ height: 40, borderWidth: 1, paddingLeft: 20, margin: 5, borderColor: '#009688', backgroundColor: 'white', borderRadius: 10 }}
                        placeholder="Buscar Producto"
                        underlineColorAndroid="transparent"
                        value={search}
                        onChangeText={(text) => searchFilter(text)} />
                </View>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    {dataProducto.map((user) => (
                        <Producto key={user.id} restarProducto={restarProducto} sumarProducto={sumarProducto} datos={user} producto={user} />
                    ))}




                </ScrollView>
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
                                <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> $ {pedidoState.total} </Text>
                            </View>
                            <Text style={{ color: '#0D3084', fontSize: 12, alignSelf: 'center' }}> Ver Pedido </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ flex: 0.2 }}  onPress={() => navigation.navigate('Pagar')}>
                    <View style={{
                        elevation: 10,
                        shadowColor: 'black',
                        flex: 1,  borderTopEndRadius: 10, borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center',
                        backgroundColor : '#0D3084' 
                    }}>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Pagar </Text>
                        </View>
                    </View>
                </TouchableOpacity> */}
            </View>



        </>
    )
}
