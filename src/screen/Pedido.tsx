import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppBar } from '../componentes/AppBar';
import { Producto } from '../componentes/Producto';
import { ProductoContext } from '../context/ProductoContext';
import { HookPedidos } from '../hook/HookPedidos';
import { Pedido } from '../interfaces/interfaces';
import * as Progress from 'react-native-progress';
import { Input, Overlay } from 'react-native-elements';
import { Card } from 'react-native-elements/dist/card/Card';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBrain, faCoffee, faFingerprint } from '@fortawesome/free-solid-svg-icons'
import { DrawerScreenProps } from '@react-navigation/drawer';


interface Props extends DrawerScreenProps<any, any> {
}



export const PedidoScreen = ({ route, navigation }: Props) => {

    const { pedidoState, addPedido } = useContext(ProductoContext);

    const [visibleDatos, setVisibleDatos] = useState(false);
    const [visibleBiometrico, setVisibleBiometrico] = useState(false);


    const toggleDatos = () => {
        setVisibleBiometrico(!visibleBiometrico);

        setVisibleDatos(!visibleDatos);


    };
    const toggleBiometrico = () => {
        setVisibleBiometrico(!visibleBiometrico);
    };

    const irapagar = async () => {
        await setVisibleDatos(!visibleDatos);

        navigation.navigate('Pagar');
    };

    const montoMinimo = (monto: number) => {
        monto = Math.round((monto + Number.EPSILON) * 100) / 100;
        console.log(monto)
        if (monto > 50) {
            return 'Ha alcanzado el monto minimo para realizar la compra'
        } else {
            return `Te faltan ${50 - monto} para que tu pedido sea procesado`
        }
    }


    return (<>
        <AppBar titulo={'Su Pedido'} />
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white' }}>
                {pedidoState.pedidos.map((e: Pedido) => (
                    <>
                        <Producto key={e.id} producto={e} />
                    </>))}
            </ScrollView>
        </View>
        <View style={{ backgroundColor: 'white' }}>

            <TouchableOpacity
                onPress={
                    // () => navigation.navigate('Pagar')
                    toggleBiometrico
                } style={{ width: '80%', height: 40, backgroundColor: '#0D3084', borderRadius: 30, alignSelf: 'center', alignItems: 'center', marginVertical: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: '300', color: 'white', alignItems: 'center' }}>Pagar</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ flex: 0.1, }}>
            <View style={{
                elevation: 10,
                shadowColor: 'black',
                flex: 1, backgroundColor: "white", borderTopEndRadius: 10, borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center'

            }}>
                <View style={{ borderColor: '#96F3CF', borderWidth: 3, padding: 3, borderRadius: 10 }}>

                    <Text style={{ color: '#0D3084', fontSize: 12 }} >{montoMinimo(pedidoState.total)}</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <Text style={{ color: '#0D3084', fontSize: 12, marginHorizontal: 5 }}> Total </Text>
                        <Progress.Bar progress={((pedidoState.total / 50))} width={150} height={15} />
                        <Text style={{ color: '#0D3084', fontSize: 12 }}>  {Math.round((pedidoState.total + Number.EPSILON) * 100) / 100}$ </Text>
                        {/* <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> - </Text>
                        <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> $ {pedidoState.total} </Text> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>

        <Overlay isVisible={visibleDatos} onBackdropPress={toggleDatos} overlayStyle={{ width: '90%', height: '50%', borderRadius: 20 }} >
            <Text style={[styles.textPrimary, { color: '#0D3084', marginTop: 40, marginBottom: 25 }]}>Iniciar Sesion</Text>
            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 10, }}>
                <TextInput
                    style={{
                        flex: 0.20,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        height: 40,
                        marginBottom: 15
                    }}
                    placeholder=" Usuario"
                />

                <TextInput
                    style={{
                        flex: 0.20,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        height: 40,
                        marginBottom: 10
                    }}
                    secureTextEntry
                    placeholder=" Contraseña"
                />
                <TouchableOpacity onPress={irapagar} style={{ width: '100%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17 }}>
                    <Text style={{ fontSize: 20, fontWeight: '400', color: 'white', alignItems: 'center' }}>Ingresar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: '300', color: '#0D3084', alignItems: 'center' }}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Registro') }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#0D3084', alignItems: 'center' }}> Registrate aquí</Text>
                    </TouchableOpacity>
                </View>

            </View>



        </Overlay>

        <Overlay isVisible={visibleBiometrico} onBackdropPress={toggleBiometrico} overlayStyle={{ width: '90%', height: '40%', borderRadius: 20 }} >
            <Text style={[styles.textPrimary, { color: '#0D3084', marginTop: 20, marginBottom: 20 }]}>Iniciar Sesión</Text>


            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 10, }}>
                <FontAwesomeIcon icon={faFingerprint} size={50} color={'#0D3084'} style={{ alignSelf: 'center' }} />
                <Text style={{ fontSize: 16, fontWeight: '300', color: '#0D3084', alignSelf: 'center', marginVertical: 15 }}>Autenticación Biométrica</Text>

                <TouchableOpacity onPress={toggleDatos} style={{ width: '100%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignSelf: 'center' }}>Acceder con contraseña</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '300', color: '#0D3084', alignItems: 'center' }}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Registro') }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#0D3084', alignItems: 'center' }}> Registrate aquí</Text>
                    </TouchableOpacity>
                </View>

            </View>



        </Overlay>

    </>)
};

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },
    textPrimary: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    },
    textSecondary: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 17,
    },
});
