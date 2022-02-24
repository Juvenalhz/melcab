import React from 'react'
import { Text, View } from 'react-native'

interface Props {
    titulo: string
}

export const AppBar = ({titulo} : Props) => {
    return (
        
            <View style={{
                flex: 0.1, backgroundColor: "#0D3084", borderBottomEndRadius: 10, borderBottomStartRadius: 10, justifyContent: 'center'
            }}>
                <Text style={{ fontFamily: 'Open Sans', color: 'white', fontSize: 18, textAlign: 'center', }}>{titulo}</Text>
            </View>
       
    )
}
