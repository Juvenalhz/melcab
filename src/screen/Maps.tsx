import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Alert, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
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


  useEffect(() => {

    Geolocation.getCurrentPosition((info) => {
      ({
        ...currentPosition,
        region: {
          latitude: info?.coords.latitude, longitude: info?.coords.longitude, latitudeDelta: 0.003,
          longitudeDelta: 0.003
        }
      })
    }

    );



    if (user?.tipouser == 2) {
      console.log(idUserOrden, 'si')
      queryDireccionUser()
    }
  }, [])

  const [mapa, setmapa] = useState(true)

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
        onPress: () => { navigation.navigate('Inicio') }
      }
    ])
  }

  return (
    <>

      <View style={styles.container}>

        {user?.tipouser == 2 ? null :
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


          />}
        {mapa ? <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={currentPosition.region}
          showsUserLocation={true}

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
          <Marker
            // key={index}
            coordinate={{
              latitude: currentPosition.region.latitude,
              longitude: currentPosition.region.longitude
            }}
            title={'Local'}
            description={'OFICINA'}
          />
        </MapView> : null}


        {user?.tipouser == 2 ? <TouchableOpacity onPress={() => { actStatusPedido() }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17, zIndex: 1, position: 'absolute', bottom: 0 }}>
          <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Pedido entregado</Text>
        </TouchableOpacity> :
          mapa ? <TouchableOpacity onPress={() => { aggDireccion(currentPosition, user?.id) }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17, zIndex: 1, position: 'absolute', bottom: 0 }}>
            <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Guadar direccion</Text>
          </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => { aggDireccion(currentPosition, user?.id) }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17, zIndex: 1, position: 'absolute', bottom: 0 }}>
              <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Guadar direccion</Text>
            </TouchableOpacity>
        }

      </View>
    </>
  )
}