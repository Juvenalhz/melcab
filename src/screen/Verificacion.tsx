import { DrawerScreenProps } from '@react-navigation/drawer'
import React from 'react'
import { Dimensions, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { AppBar } from '../componentes/AppBar'

interface Props extends DrawerScreenProps<any, any> {
}


export const Verificacion = ({ navigation, route }: Props) => {

    const window = Dimensions.get("window");

    return (
        <>
            <AppBar titulo={'Verificación'} navigation={navigation} route={route} />

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


                <View style={{ height: (window.height * 0.20), alignItems: 'center', borderRadius: 20, justifyContent: 'center' }}>
                    <Image style={{ width: 120, marginBottom: 15, height: 120 }} source={require('../../utils/seguridadphone_preview_rev_1.png')} />
                </View>

                <View style={{ marginHorizontal: 30 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center', color: 'black' }} > Verificando usuario
                    </Text>
                    <Text style={{ fontSize: 16, color: 'black' }} > Nuestro equipo esta validando su información, pronto lo estará contactando uno de nuestro agentes.</Text>
                </View>
            </View>

            <TouchableOpacity style={{ borderRadius: 100, bottom: 10, marginHorizontal: 10 }} onPress={() => Linking.openURL('https://wa.me/+584241595332?text=Buen Dia, quiero saber el estatus de mi verificación.')}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 40, height: 40, marginBottom: 15, borderRadius: 100, marginHorizontal: 10 }} source={require('../../utils/logosbancos/whatsapp.png')} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 12 }}> Problema con su verificación?</Text>
                        <Text style={{ fontSize: 14 }}> Contactanos! </Text>
                    </View>

                </View>
            </TouchableOpacity>
        </>
    )
}