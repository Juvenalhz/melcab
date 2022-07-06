import { DrawerContentComponentProps, DrawerContentScrollView, DrawerScreenProps } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { AuthTipo } from './AuthTipo';
import { Login } from './Login';

interface Props extends DrawerScreenProps<any, any> {
}

export const DrawerContenido = ({ navigation, route }: Props) => {
  const { login, removeError, logOut, errorMessage, status, user } = useContext(AuthContext);

  

  useEffect(() => {
    if (errorMessage.length === 0){
       
        return
    }

    Alert.alert('Login incorrecto',
      errorMessage, [
      {
        text: 'Ok',
        onPress: () => { removeError() }
      }
    ])
  }, [errorMessage == 'Usuario / Password no son correctos - correo' || errorMessage == 'Usuario / Password no son correctos - password'])

  useEffect(() => {
    if(status === 'authenticated-cliente'){
      console.log('asjdojas')

    }
  })
  console.log('status:', status)

  const AuthScreenDrawer = () => {

    if (status.length > 21) {
      return (
        <AuthTipo tipo={1} navigation={navigation} route={route} />
      )
    } else {
      return ( 
        <AuthTipo tipo={2} navigation={navigation} route={route} />
      )

    }


  }

  return (


    <DrawerContentScrollView style={{ flex: 1, backgroundColor: '#E1E5F0' }}>

      {/* //////////////////////////////////////////////////// */}
      {/*  Para usuario logueado */}
      {status.length > 17 ?
        AuthScreenDrawer()
        :
        <Login navigation={navigation} route={route} />
      }
    </DrawerContentScrollView>
  )
}

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

