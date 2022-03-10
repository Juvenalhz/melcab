import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppBar } from '../componentes/AppBar'
import { Categorias } from '../componentes/Categorias'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductoProvider } from '../context/ProductoProvider';
import { useWindowDimensions } from 'react-native';
import { ProductoContext } from '../context/ProductoContext';




interface Props extends NativeStackScreenProps<any, any> {
}

export const Inicio = ({ navigation, route }: Props) => {
    const { pedidoState, addPedido } = useContext(ProductoContext);
    return (


        <>
            {/* appbar */}
            <AppBar titulo={'Planeta Dulce'} />


            {/* body */}
            <View style={{ flex: 1, backgroundColor: "#fff" }}>


                {/* slider */}
                <View style={{ flex: 0.45, backgroundColor: "#BFBFBF" }}>
                    <Image style={{ width: '100%', marginBottom: 15, height: '100%' }} source={require('../../utils/logosbancos/colombina.jpg')} />
                </View>

                {/* Categorias */}
                <View style={{ flex: 1, flexDirection: "column" }}>

                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>

                        <View>
                            <TouchableOpacity style={styles.btnCategoria}
                                onPress={() => navigation.navigate('Productos')}>
                                <Image style={{ width: 140, height: 140, alignItems: 'center' }} source={require('../../utils/logosbancos/pepsico.png')} />
                            </TouchableOpacity>
                            <Text style={styles.texto}>PEPSICO</Text>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.btnCategoria}
                                onPress={() => navigation.navigate('Productos')}>
                                <Image style={{ width: 140, height: 140, alignItems: 'center' }} source={require('../../utils/logosbancos/Colombina2005.png')} />
                            </TouchableOpacity>
                            <Text style={styles.texto}>COLOMBINA</Text>
                        </View>

                        {/* <Categorias titulo='PEPSICO' navigation={navigation} route={route} pathw={"'../../utils/logosbancos/pepsico.png'"} />

                        <Categorias titulo='COLOMBINA' navigation={navigation} route={route} pathw={"'../../utils/logosbancos/pepsico.png'"}/> */}
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                        <View>
                            <TouchableOpacity style={styles.btnCategoria}
                                onPress={() => navigation.navigate('Productos')}>
                                <Image style={{ width: 140, height: 140, alignItems: 'center' }} source={require('../../utils/logosbancos/nabisco.png')} />
                            </TouchableOpacity>
                            <Text style={styles.texto}>NABISCO</Text>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.btnCategoria}
                                onPress={() => navigation.navigate('Productos')}>
                                <Image style={{ width: 140, height: 140, alignItems: 'center' }} source={require('../../utils/logosbancos/super.png')} />
                            </TouchableOpacity>
                            <Text style={styles.texto}>SUPER</Text>
                        </View>
                        {/* <Categorias titulo='NABISCO' navigation={navigation} route={route} pathw={"'../../utils/logosbancos/pepsico.png'"} />

                        <Categorias titulo='SUPER' navigation={navigation} route={route} pathw={"'../../utils/logosbancos/pepsico.png'"} /> */}

                    </View>
                </View>
            </View>

            {/* bottom */}
            {/* <View style={{
                flex: 0.1, backgroundColor: "#F7F7F7", borderTopEndRadius: 10, borderTopStartRadius: 10,
            }}></View> */}

            <View style={{flexDirection:'row', flex: 0.1}}>
                
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Pedido')}>
                <View style={{
                    elevation: 10,
                    shadowColor: 'black',
                    flex: 1, borderTopEndRadius: 10, backgroundColor:'#EEEEEE', borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center'

                }}>
                    <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#0D3084', fontSize: 18 }}> TOTAL </Text>
                        <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> - </Text>
                        <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> $ {Math.round((pedidoState.total + Number.EPSILON) * 100) / 100} </Text>
                    </View>
                    <Text style={{ color: '#0D3084', fontSize: 12, alignSelf:'center' }}> Ver Pedido </Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* <TouchableOpacity style={{ flex: 0.2 }} onPress={() => navigation.navigate('Pagar')}>
                <View style={{
                    elevation: 10,
                    shadowColor: 'black',
                    flex: 1, backgroundColor : '#0D3084' , borderTopEndRadius: 10, borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center',

                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Pagar </Text>
                    </View>
                </View>
            </TouchableOpacity> */}
            </View>

        </>

    );
}

const styles = StyleSheet.create({
    btnCategoria: {
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        flex: 0.8
    },
    texto: {
        color: '#0D3084',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})