import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { NativeStackScreenProps  } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {
titulo: string,
}

export const Categorias = ({titulo, navigation}: Props) => {

    
    
    return (
        <View>
        <TouchableOpacity style={styles.btnCategoria}
         onPress={() => navigation.navigate('Productos')}>

        </TouchableOpacity>
        <Text style={styles.texto}>{titulo}</Text>
      </View>
            
    )

   

}

const styles = StyleSheet.create({
    btnCategoria: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        height: 150,
        width: 150,
        borderRadius: 10
    },
    texto: {
        color: '#0D3084',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})