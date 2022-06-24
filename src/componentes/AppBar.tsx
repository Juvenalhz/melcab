import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends DrawerScreenProps<any, any> {
    titulo: string
}

export const AppBar = ({ titulo, navigation }: Props) => {
    return (

        <View style={{ height: 40
           , backgroundColor: "#0D3084", borderBottomEndRadius: 0, borderBottomStartRadius: 0, justifyContent: 'center', flexDirection: 'row'
        }}>


            <TouchableOpacity style={{ position: 'absolute', left: 20, alignItems: 'center' }} onPress={() => { navigation.toggleDrawer()}}>
                <Icon name='person-sharp' size={25} color="white"  />
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Open Sans', color: 'white', fontSize: 18, textAlign: 'center', }}>{titulo}</Text>
        </View>

    )
}
