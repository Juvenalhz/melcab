import React from 'react'
import { Text, View } from 'react-native'

export const AppBar = () => {
    return (
        
            <View style={{
                flex: 0.1, backgroundColor: "#0D3084", borderBottomEndRadius: 10, borderBottomStartRadius: 10, justifyContent: 'center'
            }}>
                <Text style={{ fontFamily: 'Open Sans', color: 'white', fontSize: 18, textAlign: 'center', }}>Planeta Dulce</Text>
            </View>
       
    )
}
