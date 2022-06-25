import { DrawerContentComponentProps, DrawerScreenProps } from '@react-navigation/drawer';
import React, { useContext, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';

interface Props extends DrawerScreenProps<any, any> {
}

export const Login = ({ navigation, route }: Props) => {

    const { login, removeError, logOut, errorMessage, status, user } = useContext(AuthContext);

    const [usuario, setuser] = useState('');
    const [pass, setpass] = useState('');

    const onLogin = () => {

        Keyboard.dismiss();
        login({ user: usuario, pass });

        if (route) {
            if (route.key.includes('Pedido')) {
                if (user?.aprobado == 0) navigation.navigate('Verificacion')
                else navigation.navigate('Pagar')
            }

            if (route.key.includes('Verificando')) {
                navigation.navigate('Inicio')
            }
        }


        setuser('');
        setpass('');
    }


    return (
        <>

            <Text style={[styles.textPrimary, { color: '#0D3084', marginTop: 40, marginBottom: 25 }]}>Iniciar Sesion</Text>
            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: 10, }}>
                <TextInput
                    style={{

                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        height: 40,
                        marginBottom: 15,
                    }}
                    placeholder=" Usuario"
                    onChangeText={(e) => setuser(e)}
                    value={usuario}
                />

                <TextInput
                    style={{

                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        height: 40,
                        marginBottom: 10
                    }}
                    secureTextEntry
                    placeholder=" Contraseña"
                    onChangeText={(e) => setpass(e)}
                    value={pass}
                />
                <TouchableOpacity onPress={onLogin} style={{ width: '100%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17 }}>
                    <Text style={{ fontSize: 20, fontWeight: '400', color: 'white', alignItems: 'center' }}>Ingresar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: '300', color: '#0D3084', alignItems: 'center' }}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Registro') }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#0D3084', alignItems: 'center' }}> Registrate aquí</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },
    textPrimary: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    },
    textSecondary: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 17,
    },
});