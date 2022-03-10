import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    titulo: string
}

export const AppBar = ({ titulo }: Props) => {
    return (

        <View style={{
            flex: 0.06, backgroundColor: "#0D3084", borderBottomEndRadius: 10, borderBottomStartRadius: 10, justifyContent: 'center', flexDirection: 'row'
        }}>


            <TouchableOpacity style={{ position: 'absolute', left: 20, alignItems: 'center' }}>
                <Icon name='person-sharp' size={25} color="white"  />
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Open Sans', color: 'white', fontSize: 18, textAlign: 'center', }}>{titulo}</Text>
        </View>

    )
}
