import React, { useState, useCallback, useEffect, useContext, useRef } from 'react'
import { ActivityIndicator, Alert, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View,PermissionsAndroid } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { palette } from '../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';
import MapViewDirections from 'react-native-maps-directions';
import { Result } from './Ordenes';
import api from '../api/endpoint/Endpoint';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { LoginResponse } from '../interfaces/interfaces';
import Geocoder from 'react-native-geocoding';
import { LogBox } from 'react-native';
import { error } from 'react-native-gifted-chat/lib/utils';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
  },
  map: {
    height: window.height * 0.90,
    zIndex: -100

  },

});



interface Props extends DrawerScreenProps<any, any> {
  idUserOrden?: number
}

export function Maps({ idUserOrden, navigation, route }: Props) {



  const [currentPosition, setcurrentPosition] = useState({
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.1,
      longitudeDelta: 0,
    },
    direccion: ''
  })

  const [distinoPosition, setdistinoPosition] = useState({
    region: {
      latitude: 0,
      longitude: 0,

    },
    direccion: ''
  })

  const { aggDireccion, user } = useContext(AuthContext)

  const [loading, setloading] = useState(true)

  const refWatch = useRef<number>();
  const moveCamera = useRef(true);
  const mapViewRef = useRef<MapView>();

  useEffect(() => {

    requestLocationPermission()

    if (user?.tipouser == 2) {
      console.log(idUserOrden, 'si')
      queryDireccionUser()
    }


    setloading(false)
    
  }, [route.params?.id_pedido])



  const [mapa, setmapa] = useState(true)
  const location = async () => {

    await Geolocation.getCurrentPosition(info => {
        Geocoder.init("AIzaSyAibXPBaRvL0I___HSVm_dTO92sjGJAIyM");

        Geocoder.from({
            latitude: info?.coords.latitude,
            longitude: info?.coords.longitude
        }).then(json => 
          {
            var addressComponent = json.results;
            setcurrentPosition({
                direccion: addressComponent[1].formatted_address,
                region: {
                    latitude: info?.coords.latitude, longitude: info?.coords.longitude, latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                }
            })

        }).catch(error => Alert.alert(error.message));

    },errorMessage => {console.log(errorMessage)
    
      Alert.alert('ERROR', 'No se pudo Obtener la ubicación', [
        {
          text: 'Reintentar',onPress: () =>{
            location()
          }
        }
      ])
    })

}


    const requestLocationPermission = async () => {
      try {
        const check = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (check){
          location()
        }else{
                  const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION ]
          
        );
        console.log(granted['android.permission.ACCESS_FINE_LOCATION']);
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

  const queryDireccionUser = async () => {
    const { data } = await api.post<LoginResponse>('/direccionCliente', { iduser: route.params!.idUser });
    console.log(data)

    setdistinoPosition({ ...distinoPosition, region: { latitude: data.usuarios.latitud, longitude: data.usuarios.longitud } })
  }

  const actStatusPedido = async () => {
    const { data } = await api.post('/actStatusPedido', { id_pedido: route.params?.id_pedido });
    console.log(data)
    if (data.msg) showAlert()

  }
  const showAlert = () => {
    Alert.alert('Entregada finalizada', 'El pedido se ha entregado con éxito', [
      {
        text: 'Salir',
        onPress: () => { navigation.navigate('Inicio', { id_pedido: route.params?.id_pedido}) }
      }
    ])
  }

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <>

      <View style={styles.container}>

        {/* {user?.tipouser == 2 ? null :
          <GooglePlacesAutocomplete

            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            fetchDetails={true}
            placeholder="Search"
            query={{
              key: 'AIzaSyAibXPBaRvL0I___HSVm_dTO92sjGJAIyM',
              language: 'en', // language of the results
            }}

            styles={
              { listView: { height: '100%' } }
            }
            onPress={(data, details) => {
              setmapa(true)
              console.log(data.description)
              setcurrentPosition({
                direccion: data.description,
                region: {
                  latitude: details?.geometry.location.lat!, longitude: details?.geometry.location.lng!, latitudeDelta: 0.003,
                  longitudeDelta: 0.003
                }
              })
            }}
            textInputProps={{ onFocus: () => setmapa(false) }}
            onFail={(error) => console.error(error)}
          // this in only required for use on the web. See https://git.io/JflFv more for details.


          />} */}
        {mapa ? <MapView
          ref={(el) => mapViewRef.current = el!}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={currentPosition.region}
          showsUserLocation={true}
          onTouchStart={() => moveCamera.current = false}
        // onRegionChangeComplete={region => {
        //   setcurrentPosition({ ...currentPosition, region });
        // }}
        >

          {user?.tipouser == 2 ?
            <MapViewDirections

              origin={{
                latitude: currentPosition.region.latitude,
                longitude: currentPosition.region.longitude
              }}
              destination={{
                latitude: distinoPosition.region.latitude,
                longitude: distinoPosition.region.longitude
              }}
              apikey={"AIzaSyAibXPBaRvL0I___HSVm_dTO92sjGJAIyM"}
              onStart={(params) => { console.log(`Started routing between "${params.origin}" and "${params.destination}"`) }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
              }}
              mode={'DRIVING'}
              strokeWidth={3}
              strokeColor="blue"
            />
            : null}
        {user?.tipouser == 2 ?   <Marker
            // key={index}
            coordinate={{
              latitude: distinoPosition.region.latitude,
              longitude: distinoPosition.region.longitude
            }}
            title={'Local'}
            description={'OFICINA'}
          />:null}
        </MapView> : null}


        {user?.tipouser == 2 ? <TouchableOpacity onPress={() => { actStatusPedido() }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17, zIndex: 1, position: 'absolute', bottom: 0 }}>
          <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Pedido entregado</Text>
        </TouchableOpacity> :
          mapa ? <TouchableOpacity onPress={() => { aggDireccion(currentPosition, user?.id) }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17, zIndex: 1, position: 'absolute', bottom: 0 }}>
            <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Guadar direccion</Text>
          </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => { location() }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17, zIndex: 1, position: 'absolute', bottom: 0 }}>
              <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Guadar direccion</Text>
            </TouchableOpacity>
        }

      </View>
    </>
  )

}

