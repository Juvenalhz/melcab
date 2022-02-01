import React from 'react'
import { View } from 'react-native'
import { AppBar } from '../componentes/AppBar'
import { Categorias } from '../componentes/Categorias'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductoProvider } from '../context/ProductoProvider';

interface Props extends NativeStackScreenProps<any, any> {
}

export const Inicio = ({ navigation, route }: Props) => {
    return (


        <>
            {/* appbar */}
            <AppBar />


            {/* body */}
            <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>


                {/* slider */}
                <View style={{ flex: 0.45, backgroundColor: "#BFBFBF" }}>

                </View>

                {/* Categorias */}
                <View style={{ flex: 1, flexDirection: "column" }}>

                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>

                        <Categorias titulo='PEPSICO' navigation={navigation} route={route} />

                        <Categorias titulo='COLOMBINA' navigation={navigation} route={route} />
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                        <Categorias titulo='NABISCO' navigation={navigation} route={route} />

                        <Categorias titulo='SUPER' navigation={navigation} route={route} />

                    </View>
                </View>
            </View>

            {/* bottom */}
            <View style={{
                flex: 0.1, backgroundColor: "#fff", borderTopEndRadius: 10, borderTopStartRadius: 10,
            }}></View>
        </>

    );
}
