import Geolocation from '@react-native-community/geolocation'
import { DrawerScreenProps } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import { PermissionsAndroid,ActivityIndicator, Alert, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import { Directions, ScrollView, TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppBar } from '../componentes/AppBar'
import { AuthContext } from '../context/AuthContext'
import Geocoder from 'react-native-geocoding';
interface Props extends DrawerScreenProps<any, any> {
}



export const Registro = ({ navigation }: Props) => {

    const [name, setname] = useState('');
    const [rif, setrif] = useState('');
    const [pass1, setpass1] = useState('');
    const [pass2, setpass2] = useState('');
    const [user, setuser] = useState('');
    const [tlf, settlf] = useState('');
    const [direccion, setdireccion] = useState('');
    const [email, setemail] = useState('');
    const [loaded, setloaded] = useState(true)
    const [onPress, setonPress] = useState(false)
    const [msgError, setmsgError] = useState('');
    const { registro, errorMessage, removeError } = useContext(AuthContext)
    const [currentPosition, setcurrentPosition] = useState({
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0,
        },
        direccion: ''
    })

    useEffect(() => {
        // location()
        requestLocationPermission()
    }, [])

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Error',
            errorMessage, [
            {
                text: 'Ok',
                onPress: () => {
                    setloaded(true);
                    removeError()
                }
            }
        ])
    }, [errorMessage != ''])


    const requestLocationPermission = async () => {
        try {
          const check = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
          if (check){
            location()
          }else{
                    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION ]
            
          );
          if (granted['android.permission.ACCESS_COARSE_LOCATION'] == 'granted' && granted['android.permission.ACCESS_FINE_LOCATION'] == 'granted') {
           location()
          } else {
            Alert.alert('App sin Permiso ', 'Esta app necesita permiso de ubicación', [
              {
                text: 'Reintentar',onPress: () =>{
                  requestLocationPermission()
                }
              }
            ])
          }
          }
  
        } catch (err) {
          console.warn(err);
        }
      };

    const location = async () => {
        await Geolocation.getCurrentPosition(info => {

            Geocoder.init("AIzaSyAibXPBaRvL0I___HSVm_dTO92sjGJAIyM");

            Geocoder.from({
                latitude: info?.coords.latitude,
                longitude: info?.coords.longitude
            }).then(json => {
                var addressComponent = json.results;
                setcurrentPosition({
                    direccion: addressComponent[1].formatted_address,
                    region: {
                        latitude: info?.coords.latitude, longitude: info?.coords.longitude, latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                })
            })
                .catch(error => console.warn(error));
        },errorMessage => {
            console.log(errorMessage)
            Alert.alert('ERROR', 'No se pudo Obtener la ubicación', [
              {
                text: 'Reintentar',onPress: () =>{
                  location()
                }
              }
            ])
          })


    }
    return (
        <>

            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={'height'}
            >


                <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>



                    <Text style={{ fontSize: 30, marginHorizontal: 30, marginVertical: 20 }}> Crear Cuenta </Text>


                    <View style={[{
                        width: '80%',

                        height: 50,

                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'


                    },
                    ((!name && onPress)) ? { borderColor: 'red' } : { borderColor: '#0D3084' },
                    ]} >
                        <Icon name='person-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Nompre completo" style={{ width: '80%', }} value={name} onChangeText={(e) => { setname(e) }} />
                    </View>

                    <View style={[{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    },
                    ((!user && onPress)) ? { borderColor: 'red' } : { borderColor: '#0D3084' },]} >
                        <Icon name='person-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Usuario" style={{ width: '80%', }} value={user} onChangeText={(e) => { setuser(e) }} />
                    </View>

                    <View style={[{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    },
                    ((!rif && onPress)) ? { borderColor: 'red' } : { borderColor: '#0D3084' },]} >
                        <Icon name='reader-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="RIF" style={{ width: '80%', }} value={rif} onChangeText={(e) => { setrif(e) }} />
                    </View>

                    <View style={[{
                        width: '80%',
                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    },
                    ((!pass1 && onPress)) ? { borderColor: 'red' } : { borderColor: '#0D3084' },]} >
                        <Icon name='key-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput secureTextEntry={true}  placeholder="Contraseña" style={{ width: '80%', }} value={pass1} onChangeText={(e) => { setpass1(e) }} />
                    </View>
                    <View style={[{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    },
                    ((!pass2 && onPress)) ? { borderColor: 'red' } : { borderColor: '#0D3084' },]} >
                        <Icon name='key-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput secureTextEntry={true}  placeholder="Confirmar contraseña" style={{ width: '80%', }} value={pass2} onChangeText={(e) => { setpass2(e) }} />
                    </View>

                    <View style={[{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    },
                    ((!email && onPress)) ? { borderColor: 'red' } : { borderColor: '#0D3084' },]} >
                        <Icon name='mail-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Correo" style={{ width: '80%', }} value={email} onChangeText={(e) => { setemail(e) }} />
                    </View>

                    <View style={[{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    }, ,
                    ((!tlf && onPress)) ? { borderColor: 'red' } : { borderColor: '#0D3084' },]} >
                        <Icon name='call-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Telefono" style={{ width: '80%', }} value={tlf} onChangeText={(e) => { settlf(e) }} />
                    </View>

                    {/* <View style={{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    }} >
                        <Icon name='map-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput place
                        
                        holder="Direccion" style={{ width: '80%', }} value={direccion} onChangeText={(e) => { setdireccion(e) }} />
                    </View> */}


                    <TouchableOpacity onPress={async () => {

                        if (!user || !pass1 || !name || !tlf || !email || !pass2 || !rif) {
                            setmsgError('DEBE LLENAR TODOS LOS CAMPOS')
                            return setonPress(true);
                        }
                        if (pass1 != pass2) {
                            console.log(pass1, pass2)
                            setpass1('')
                            setpass2('')
                            setmsgError('ERROR LAS CONTRASEÑAS NO COINCIDEN')
                            return setonPress(true);
                        }
                        else if (pass1.length < 8) {
                            setmsgError('ERROR LA CONTRASEÑA DEBE SER DE 8 CARACTERES')
                            return setonPress(true);
                        }
                        else setloaded(false);

                        const registroExitoso = registro({ user,pass: pass1, name, tlf, email, direccion: currentPosition.direccion, longitud: currentPosition.region.longitude, latitud: currentPosition.region.latitude, rif });

                        if (await registroExitoso) {
                            setloaded(true);
                            navigation.navigate('Verificacion');
                            setonPress(false);
                            setmsgError('');
                            setemail('');
                            setname('');
                            setpass1('');
                            setpass2('');
                            setuser('');
                            settlf('');
                            setrif('');
                        } else {
                            setonPress(true);
                        }

                    }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17, justifyContent: 'center' }}

                    >
                        <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Registrar</Text>
                    </TouchableOpacity>


                    {
                        onPress && msgError ?
                            <View style={{ backgroundColor: 'red', height: 40, width: '90%', borderRadius: 2, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '400', color: 'white', alignItems: 'center' }}> {msgError} </Text>
                            </View>
                            :
                            null
                    }


                    {loaded ? null : <ActivityIndicator style={{ justifyContent: "center", alignSelf: 'center' }} size="large" />}

                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}
