import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

export const DrawerContenido = ({navigation}: DrawerContentComponentProps) => {
  const {login, removeError, errorMessage} = useContext(AuthContext);

  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');

  const onLogin = () => {
    console.log({user, pass});
    Keyboard.dismiss();
    login({user,pass});
  }

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Login incorrecto',
    errorMessage, [
      
      {
        text: 'Ok',
        onPress:  () => {removeError} 
      }
    ])
  }, [errorMessage])
  
  return (


    <DrawerContentScrollView style={{ flex: 1, backgroundColor: '#f0f8ff' }}>

      {/* //////////////////////////////////////////////////// */}
      {/*  Para usuario logueado */}

      {/* <View style={{ flex: 1 }} >
        <View style={{ flex: 0.3, marginVertical: 20, marginHorizontal: 20 }}>
          <Image style={{ width: 80, height: 80, borderRadius: 100 }} source={require('../../utils/user.jpg')} />

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 20 }}>Juvenal Hernandez</Text>
            <Text style={{ fontSize: 10 }}>jjhernandezz100@gmal.com</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7, marginVertical: 10 }}>
          <View style={{ width: '90%', marginVertical:5  }}>
            <TouchableOpacity  style={{ flexDirection: 'row'}}>
            <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
              <Icon name='person-sharp' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
            </View>
              <Text style={{ fontSize: 15, marginVertical: 15 }}>
                Mi Cuenta
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '90%', marginVertical:5  }}>
            <TouchableOpacity style={{ flexDirection: 'row'}}>
            <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
              <Icon name='home-outline' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
            </View>
              <Text style={{ fontSize: 15, marginVertical: 15 }}>
                Inicio
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '90%', marginVertical:5  }}>
            <TouchableOpacity style={{ flexDirection: 'row'}}>
            <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
              <Icon name='book-outline' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
            </View>
              <Text style={{ fontSize: 15, marginVertical: 15 }}>
                Mis Ordenes
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', width: '90%', marginVertical:5  }}>
            <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
              <Icon name='log-out-outline' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
            </View>
            <TouchableOpacity>
              <Text style={{ fontSize: 15, marginVertical: 15, textAlign:'center' }}>
                Cerrar Sesion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}

      {/* //////////////////////////////////////////////////// */}
      {/* Para deslogueado */}
      <Text style={[styles.textPrimary, { color: '#0D3084', marginTop: 40, marginBottom: 25 }]}>Iniciar Sesion</Text>
      <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 10, }}>
        <TextInput
          style={{
            flex: 0.20,
            borderColor: '#0D3084',
            borderWidth: 1.5,
            borderRadius: 15,
            height: 40,
            marginBottom: 15,
          }}
          placeholder=" Usuario"
          onChangeText={(e) => setuser(e)}
          value={user}
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
          onChangeText={(e) => setpass(e)}
          value={pass}
        />
        <TouchableOpacity onPress={onLogin} style={{ width: '100%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17 }}>
          <Text style={{ fontSize: 20, fontWeight: '400', color: 'white', alignItems: 'center' }}>Ingresar</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: '300', color: '#0D3084', alignItems: 'center' }}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Registro')}}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#0D3084', alignItems: 'center' }}> Registrate aquí</Text>
          </TouchableOpacity>
        </View>

      </View>

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

