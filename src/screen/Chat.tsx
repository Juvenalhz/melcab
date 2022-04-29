import React, { useState, useCallback, useEffect } from 'react'
import { Platform, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { palette } from '../theme';

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

  useEffect(() => {
    Geolocation.getCurrentPosition(info => console.log(info));
  }, [])

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
                placeholder="Buscar en google places"
                minLength={6}
                query={{
                    key: 'AIzaSyAWBtoBHECgqiHDieEXeHmf4YbcEZLN8n0',
                    language: 'es'
                }}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false
                }}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        position: 'absolute',
                        top: Platform.select({ ios: 60, android: 40 }),
                        width: '100%'
                    },
                    textInputContainer: {
                        marginHorizontal: 10,
                        flex: 1,
                        backgroundColor: 'transparent',
                        height: 54,
                        borderTopWidth: 0,
                        borderBottomWidth: 0

                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        padding: 0,
                        borderRadius: 9,
                        elevation: 5, // Shadow android
                        shadowColor: palette.dark.main, // Shadow ios
                        shadowOpacity: 0.1, // Shadow ios
                        shadowOffset: { x: 0, y: 0 }, // Shadow ios
                        shadowRadius: 15,  // Shadow ios
                        borderWidth: 1,
                        borderColor: palette.grayScale.gray100,
                        fontSize: 18
                    },
                    listView: {
                        marginHorizontal: 20,
                        borderWidth: 1,
                        borderColor: palette.grayScale.gray100,
                        backgroundColor: palette.primary.contrastText,
                        elevation: 5,
                        shadowColor: palette.dark.main, // Shadow ios
                        shadowOpacity: 0.1, // Shadow ios
                        shadowOffset: { x: 0, y: 0 }, // Shadow ios
                        shadowRadius: 15,  // Shadow ios
                        marginTop: 15
                    },
                    description: {
                        fontSize: 15
                    },
                    row: {
                        padding: 18,
                        height: 58
                    }
                }}

            />
      {/* <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
      >
        <Marker
          // key={index}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324
          }}
          title={'TRABAJO'}
          description={'OFICINA'}
        />
      </MapView> */}
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