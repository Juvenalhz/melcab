
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { AppBar } from '../componentes/AppBar';
import { Countdown } from 'react-native-element-timer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {
}


export const Pagar = ({navigation} : Props) => {

  interface Cuenta {
    id: number;
    cuenta: string;
    telefono: string;
    RIF: string;
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Exito",
      "Su pedido esta siendo procesado.",
      [
        { text: "OK",  onPress: () => navigation.navigate('Inicio') }
      ],
    );
  
  const [cuentaSeleccionada, setcuentaSeleccionada] = useState( {
    id: 1,
    banco: 'Banesco',
    cuenta: '0134-xxxx-xxxx-xxxx',
    telefono: '0000-0000000',
    RIF:  'J-xx.xxxx.xxx'
  });

  const Cuentas = [
    {
      id: 1,
      banco: 'Banesco',
      cuenta: '0134-xxxx-xxxx-xxxx',
      telefono: '0000-0000000',
      RIF:  'J-xx.xxxx.xxx'
    },
    {
      id: 2,
      banco: 'Venezuela',
      cuenta: '0102-xxxx-xxxx-xxxx',
      telefono: '0000-0000000',
      RIF:  'J-xx.xxxx.xxx'
    },
    {
      id: 3,
      banco: 'Mercantil',
      cuenta: '0105-xxxx-xxxx-xxxx',
      telefono: '0000-0000000',
      RIF:  'J-xx.xxxx.xxx'
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
  return (<>
    <AppBar />
    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <Text style={{ color: '#0D3084', fontSize: 18, fontWeight: '300', alignSelf: 'center' }}>DATOS BANCARIOS</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 25 }}>
        <TouchableOpacity onPress={() => seleccionarBanco(1)}><Image style={{ width: 50, height: 50, marginBottom: 15 }} source={require('../../utils/logosbancos/banesco.png')} /></TouchableOpacity>
        <TouchableOpacity onPress={() => seleccionarBanco(2)}><Image style={{ width: 50, height: 50, marginBottom: 15 }} source={require('../../utils/logosbancos/bancovenezuela.png')} /></TouchableOpacity>
        <TouchableOpacity onPress={() => seleccionarBanco(3)}><Image style={{ width: 60, height: 60, marginBottom: 15 }} source={require('../../utils/logosbancos/mercantil.png')} /></TouchableOpacity>
        <TouchableOpacity onPress={() => seleccionarBanco(4)}><Image style={{ width: 60, height: 60, marginBottom: 15 }} source={require('../../utils/logosbancos/provincial.png')} /></TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center' }}>

        <Card containerStyle={{ borderRadius: 10, width: 300, height: 130 }}>
          <Card.Title>{cuentaSeleccionada.banco}</Card.Title>
         
          <Text> Pago Movil:</Text>
          <Text> Telefono:  {cuentaSeleccionada.telefono}</Text>
          <Text> RIF: {cuentaSeleccionada.RIF}</Text>

        </Card>
        <Card containerStyle={{ borderRadius: 10, width: 300, height: 130 }}>
          <Card.Title>{cuentaSeleccionada.banco}</Card.Title>
          <Text> Cuenta Corriente</Text>
          <Text> {cuentaSeleccionada.cuenta}</Text>
          <Text> RIF: {cuentaSeleccionada.RIF}</Text>

        </Card>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Dispone de </Text>
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
        <Text> minutos para culminar la operacion</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Input
          containerStyle={{ width: 300, alignItems: 'center' }}
          placeholder='Ingrese número de referencia completo.'
          errorStyle={{ color: 'red' }}
          errorMessage='Obligatorio' autoCompleteType={undefined} />
      </View>

      <TouchableOpacity onPress={createTwoButtonAlert}  style={{ width: '80%', height: 40, backgroundColor: '#0D3084', borderRadius: 30, alignSelf: 'center', alignItems: 'center', marginVertical: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: '300', color: 'white', alignItems: 'center' }}>Enviar</Text>
      </TouchableOpacity>

    </View>
  </>
  );
};