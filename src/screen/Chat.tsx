import React, { useState, useCallback, useEffect } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { palette } from '../theme';
import { Input } from 'react-native-elements/dist/input/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { io } from "socket.io-client";
const socket = io("http://192.168.43.29:9000");

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
});

export function Chat() {

  const sala = "PedidoCucholin";
  const [mensajes, setmensajes] = useState<any>([]);
  const [mensajeActual, setmensajeActual] = useState({
    id: 1,
    text: '',
    nombre: 'Juvenal',
    sala
  })

  useEffect(() => {
    socket.emit('entrarChat', sala)
  }, [])

  useEffect(() => {
    socket.on('mensajeRoom', (mensaje) => {
      console.log('entra')
      setmensajes([...mensajes, mensaje])
    })

    return() => {socket.off()}

  }, [mensajes])



  return (
    <View style={styles.container}>
      <View>
        <Text>{JSON.stringify(mensajes)}</Text>
      </View>
      <Input value={mensajeActual.text} onChangeText={(e) => { setmensajeActual({ ...mensajeActual, text: e }) }} />
      <TouchableOpacity onPress={() => {
        setmensajes([...mensajes, mensajeActual])
        socket.emit('mensajePrivado', mensajeActual);
      }} >
        <Text>Enviar</Text></TouchableOpacity>
    </View>
  )

  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  // }, [])

  // return (
  //   <GiftedChat
  //     messages={messages}
  //     onSend={messages => onSend(messages)}
  //     user={{
  //       _id: 1,
  //     }}
  //   />
  // )
}