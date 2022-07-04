
import React, { useContext, useState } from 'react';
import { Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { AppBar } from '../componentes/AppBar';
import { Countdown } from 'react-native-element-timer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductoContext } from '../context/ProductoContext';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCopy, faPaste } from '@fortawesome/free-regular-svg-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import api from '../api/endpoint/Endpoint';
import { AuthContext } from '../context/AuthContext';

interface Props extends DrawerScreenProps<any, any> {
}


export const Pagar = ({ navigation, route }: Props) => {


  const [numref, setnumref] = useState('');
  interface Cuenta {
    id: number;
    cuenta: string;
    telefono: string;
    RIF: string;
  }

  const { pedidoState, addPedido, borrarPedido } = useContext(ProductoContext);
  const { user } = useContext(AuthContext);
  const  [loading,setLoading]  = useState(false);

  const createTwoButtonAlert = async () => {

    if (!numref) {
      return Alert.alert(
        "Error",
        "Debe ingresar el número de referencia",
        [
          { text: "OK", onPress: () => 
          {
          } }
        ],
      );
    }
   setLoading(true)
    const data = {
      iduser: user?.id,
      monto: pedidoState.total,
      numref,
      productos: pedidoState.pedidos, 
      banco:cuentaSeleccionada.banco
    }
    console.log(data);
    await generarPedido()
    Alert.alert(
      "Exito",
      "Su pedido esta siendo procesado.",
      [
        { text: "OK", onPress: () => 
        {
        navigation.navigate('Inicio')
        borrarPedido()} }
      ],
    );
  }

    

  const [cuentaSeleccionada, setcuentaSeleccionada] = useState({
    id: 1,
    banco: 'Banesco',
    cuenta: '0134-xxxx-xxxx-xxxx',
    telefono: '0000-0000000',
    RIF: 'J-xx.xxxx.xxx'
  });

  const Cuentas = [
    {
      id: 1,
      banco: 'Banesco',
      cuenta: '0134-xxxx-xxxx-xxxx',
      telefono: '0000-0000000',
      RIF: 'J-xx.xxxx.xxx'
    },
    {
      id: 2,
      banco: 'Venezuela',
      cuenta: '0102-xxxx-xxxx-xxxx',
      telefono: '0000-0000000',
      RIF: 'J-xx.xxxx.xxx'
    },
    {
      id: 3,
      banco: 'Mercantil',
      cuenta: '0105-xxxx-xxxx-xxxx',
      telefono: '0000-0000000',
      RIF: 'J-xx.xxxx.xxx'
    },
    {
      id: 4,
      banco: 'Provincial',
      cuenta: '0108-xxxx-xxxx-xxxx',
      telefono: '0000-0000000',
      RIF: 'J-xx.xxxx.xxx'
    },
  ]

  const seleccionarBanco = (id: number) => {

    const cuenta = Cuentas.find((cuenta) => cuenta.id === id);

    setcuentaSeleccionada(cuenta!)

    console.log(JSON.stringify(cuentaSeleccionada));
  }

  console.log(pedidoState);

  const generarPedido = async () => {
   await api.post('/nuevoPedido', {

      iduser: user?.id,
      monto: pedidoState.total,
      numref,
      productos: pedidoState.pedidos, 
      banco:cuentaSeleccionada.banco


    }).finally(() => {setLoading(false)});

    setnumref('');
  }
  if (loading) {
return(
<>
    <View style={{flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    padding: 10
    }}>
    <ActivityIndicator size="large" color="#0D3084" />
    <Text style={{fontSize:16, fontWeight: "bold",alignSelf: "center",color: "black"}}>Enviando Pedido</Text>
  </View>

</>
);
  }else{
    return (<>
      <AppBar titulo='Proceso de Pago' navigation={navigation} route={route} />
      <ScrollView style={{ flex: 1 }}>
  
        <View style={{ marginVertical: 30 }} >
          {/* <Text style={{ color: '#0D3084', fontSize: 18, fontWeight: '300', alignSelf: 'center', marginVertical: 10 }}>DATOS BANCARIOS</Text> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10 }}>
            <TouchableOpacity onPress={() => seleccionarBanco(1)}><Image style={cuentaSeleccionada.id == 1 ? { width: 50, height: 50, marginBottom: 15 } : { width: 50, height: 50, marginBottom: 15, opacity: 0.2 }} source={require('../../utils/logosbancos/banesco.png')} /></TouchableOpacity>
            <TouchableOpacity onPress={() => seleccionarBanco(2)}><Image style={cuentaSeleccionada.id == 2 ? { width: 50, height: 50, marginBottom: 15 } : { width: 50, height: 50, marginBottom: 15, opacity: 0.2 }} source={require('../../utils/logosbancos/bancovenezuela.png')} /></TouchableOpacity>
            <TouchableOpacity onPress={() => seleccionarBanco(3)}><Image style={cuentaSeleccionada.id == 3 ? { width: 65, height: 65, marginBottom: 15 } : { width: 65, height: 65, marginBottom: 15, opacity: 0.2 }} source={require('../../utils/logosbancos/mercantil.png')} /></TouchableOpacity>
            <TouchableOpacity onPress={() => seleccionarBanco(4)}><Image style={cuentaSeleccionada.id == 4 ? { width: 60, height: 60, marginBottom: 15 } : { width: 60, height: 60, marginBottom: 15, opacity: 0.2 }} source={require('../../utils/logosbancos/provincial.png')} /></TouchableOpacity>
          </View>
  
          <View style={{ alignItems: 'center' }}>
  
            <Card containerStyle={{ borderRadius: 10, flex: 0.3, width: '80%' }}>
              <Card.Title>{cuentaSeleccionada.banco}</Card.Title>
  
              <Text style={{ marginBottom: 5 }}> Pago Movil:</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text> Telefono:  {cuentaSeleccionada.telefono}</Text>
                <FontAwesomeIcon icon={faCopy} size={20} color={'#0D3084'} style={{ marginRight: 50 }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
  
                <Text> RIF: {cuentaSeleccionada.RIF}</Text>
                <FontAwesomeIcon icon={faCopy} size={20} color={'#0D3084'} style={{ marginRight: 50 }} />
              </View>
  
  
              <Text style={{ marginBottom: 5, marginTop: 10 }}> Cuenta Corriente</Text>
  
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text> {cuentaSeleccionada.cuenta}</Text>
                <FontAwesomeIcon icon={faCopy} size={22} color={'#0D3084'} style={{ marginRight: 50 }} />
              </View>
  
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                <Text> RIF: {cuentaSeleccionada.RIF}</Text>
                <FontAwesomeIcon icon={faCopy} size={20} color={'#0D3084'} style={{ marginRight: 50 }} />
              </View>
  
  
  
  
            </Card>
            {/* <Card containerStyle={{ borderRadius: 10, width: 300, height: 120 }}>
              <Card.Title>{cuentaSeleccionada.banco}</Card.Title>
              <Text> Cuenta Corriente</Text>
              <Text> {cuentaSeleccionada.cuenta}</Text>
              <Text> RIF: {cuentaSeleccionada.RIF}</Text>
  
            </Card> */}
          </View>
  
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Input
              containerStyle={{ width: 300, alignSelf: 'center' }}
              placeholder='Nro de referencia'
              leftIcon={<FontAwesomeIcon icon={faPaste} size={30} color={'#0D3084'} />} autoCompleteType={undefined} 
              value={numref}
              onChangeText={(e) => {setnumref(e)}}
              />
  
  
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Text style={{ fontSize: 20 }}>Dispone de </Text> */}
            <View style={{ borderColor: '#696969', borderWidth: 1, padding: 5, borderRadius: 15 }}>
              <Countdown
                // ref={countdownRef}
                // style={styles.timer}
                // textStyle={styles.timerText}
                initialSeconds={1200}
                onTimes={e => { }}
                onPause={e => { }}
                onEnd={(e) => { }}
                autoStart={true}
              />
            </View>
            {/* <Text style={{ fontSize: 20 }}> minutos</Text> */}
          </View>
  
  
  
          <TouchableOpacity onPress={() => {createTwoButtonAlert()}} style={{ width: '80%', height: 40, backgroundColor: '#0D3084', borderRadius: 30, alignSelf: 'center', alignItems: 'center', marginVertical: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: '300', color: 'white', alignItems: 'center' }}>Enviar</Text>
          </TouchableOpacity>
  
  
  
        </View>
        <TouchableOpacity style={{ borderRadius: 100, bottom: 10, marginHorizontal: 10 }} onPress={() => Linking.openURL('https://wa.me/+584241595332?text=Buen Dia, he tenido problemas con mi pago')}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ width: 40, height: 40, marginBottom: 15, borderRadius: 100, marginHorizontal: 10 }} source={require('../../utils/logosbancos/whatsapp.png')} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 12 }}> Problema con su pago?</Text>
              <Text style={{ fontSize: 14 }}> Contactanos! </Text>
            </View>
  
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={{
        flex: 0.08,
        backgroundColor: "white", borderTopEndRadius: 10, borderTopStartRadius: 10, justifyContent: 'center', alignItems: 'center'
      }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#0D3084', fontSize: 18 }}>TOTAL </Text>
          <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> - </Text>
          <Text style={{ color: '#0D3084', fontWeight: '500', fontSize: 18 }}> $ {Math.round((pedidoState.total + Number.EPSILON) * 100) / 100} </Text>
        </View>
      </View>
  
  
    </>
    );
  }
};