import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import { Login } from '../componentes/Login';
import { AuthContext } from '../context/AuthContext';
import api from '../api/endpoint/Endpoint';


interface Props extends DrawerScreenProps<any, any> {
}



export const PedidoScreen = ({ route, navigation }: Props) => {

    const window = Dimensions.get("window");


    const { pedidoState, addPedido, statusPedidoPendiente } = useContext(ProductoContext);

    const { checkToken, status, user } = useContext(AuthContext)


    const [visibleBiometrico, setVisibleBiometrico] = useState(false);
    const [loading, setLoading] = useState({
        load: false,
        msg: ''
    });


    const toggleDatos = () => {
        setVisibleBiometrico(false);
        navigation.openDrawer();
    };
    const toggleBiometrico = () => {
        setVisibleBiometrico(!visibleBiometrico);
    };

    const montoMinimo = (monto: number) => {
        monto = Math.round((monto + Number.EPSILON) * 100) / 100;
        console.log(monto)
        if (monto > 50) {
            return 'Ha alcanzado el monto minimo para realizar la compra'
        } else {
            return `Te faltan ${(50 - monto).toFixed(2)} para que tu pedido sea procesado`
        }
    }


    const numeroPedidos = useRef()

    const generarPedido = async () => {


        const { data } = await api.get(`/queryPedido/${user?.id}`);
        
      console.log(data.msg);
      let nuevoPedido;
      if(data){

          numeroPedidos.current = data.msg.id_pedido
          //si no tiene estatus pendiente por pagar (1) genera pedido
          if (data.msg.estatus != 1) {
              nuevoPedido = await api.post('/nuevoPedido', {
                  iduser: user?.id,
                  monto: pedidoState.total,
                  productos: pedidoState.pedidos
                });
                numeroPedidos.current = nuevoPedido.data.id_pedido
                console.log('Pedido creado')
                statusPedidoPendiente()
            }
            navigation.navigate('Pagar', {id_pedido: numeroPedidos.current})
        }else{
            nuevoPedido = await api.post('/nuevoPedido', {
                iduser: user?.id,
                monto: pedidoState.total,
                productos: pedidoState.pedidos
              });
              numeroPedidos.current = nuevoPedido.data.id_pedido
              console.log('Pedido creado')
              statusPedidoPendiente()
            navigation.navigate('Pagar', {id_pedido: numeroPedidos.current})

        }
    }

    if (loading.load) {
        return (
            <>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: 10
                }}>
                    <ActivityIndicator size="large" color="#0D3084" />
                    <Text style={{ fontSize: 16, fontWeight: "bold", alignSelf: "center", color: "black" }}>{loading.msg}</Text>
                </View>

            </>
        );
    } else {
        return (<>
            <AppBar titulo={'Su Pedido'} navigation={navigation} route={route} />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    {pedidoState.pedidos.map((e: Pedido) => (
                        <Producto key={e.id} producto={e} />
                    ))}
                </ScrollView>
            </View>
            <View style={{ backgroundColor: 'white' }}>

                <TouchableOpacity
                    onPress={
                        async () => {
                            if (pedidoState.total < 50) {
                                return Alert.alert(
                                    "Alerta",
                                    "Debe alcanzar el minimo de compra",
                                    [
                                        {
                                            text: "OK", onPress: () => {
                                            }
                                        }
                                    ],
                                );
                            }
                            await checkToken();
                            if (status == 'not-Authenticate') toggleBiometrico()
                            else if (user?.aprobado == 0) navigation.navigate('Verificacion')
                            else {
                                await generarPedido()

                            }
                        }
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


            <Overlay isVisible={visibleBiometrico} onBackdropPress={toggleBiometrico} overlayStyle={{ width: '90%', height: (window.height * 0.50), borderRadius: 20 }} >
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
    }

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
