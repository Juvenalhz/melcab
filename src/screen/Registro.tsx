import { DrawerScreenProps } from '@react-navigation/drawer'
import React, { useContext, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import { Directions, ScrollView, TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppBar } from '../componentes/AppBar'
import { AuthContext } from '../context/AuthContext'

interface Props extends DrawerScreenProps<any, any> {
}



export const Registro = ({ navigation }: Props) => {

    const [name, setname] = useState('juve4');
    const [pass, setpass] = useState('123456');
    const [user, setuser] = useState('juve4');
    const [tlf, settlf] = useState('123456789');
    const [direccion, setdireccion] = useState('cali');
    const [email, setemail] = useState('jjhernandez');
    const [loaded, setloaded] = useState(true)

    const { registro } = useContext(AuthContext)

    return (
        <>

            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={'height'}
            >


                <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>



                    <Text style={{ fontSize: 30, marginHorizontal: 30, marginVertical: 20 }}> Crear Cuenta </Text>


                    <View style={{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'


                    }} >
                        <Icon name='person-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Nompre completo" style={{ width: '80%', }} value={name} onChangeText={(e) => { setname(e) }} />
                    </View>

                    <View style={{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    }} >
                        <Icon name='person-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Usuario" style={{ width: '80%', }} value={user} onChangeText={(e) => { setuser(e) }} />
                    </View>

                    <View style={{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    }} >
                        <Icon name='key-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Contraseña" style={{ width: '80%', }} value={pass} onChangeText={(e) => { setpass(e) }} />
                    </View>

                    <View style={{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    }} >
                        <Icon name='key-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Confirmar contraseña" style={{ width: '80%', }} value={pass} onChangeText={(e) => { setpass(e) }} />
                    </View>

                    <View style={{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    }} >
                        <Icon name='mail-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Correo" style={{ width: '80%', }} value={email} onChangeText={(e) => { setemail(e) }}/>
                    </View>

                    <View style={{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    }} >
                        <Icon name='call-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Telefono" style={{ width: '80%', }} value={tlf} onChangeText={(e) => { settlf(e) }} />
                    </View>

                    <View style={{
                        width: '80%',

                        height: 50,
                        borderColor: '#0D3084',
                        borderWidth: 1.5,
                        borderRadius: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        alignItems: 'center'
                    }} >
                        <Icon name='map-outline' size={20} color="black" style={{ marginLeft: 10 }} />
                        <TextInput placeholder="Direccion" style={{ width: '80%', }} value={direccion} onChangeText={(e) => { setdireccion(e) }} />
                    </View>



                    <TouchableOpacity onPress={async () => {

                        setloaded(false);

                        const registroExitoso = registro({ user, pass, name, tlf, email, direccion });

                            console.log()



                        if ( await registroExitoso) {
                        
                            setloaded(true);
                            navigation.navigate('Verificacion');
                        }


                    }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17 }}

                    >
                        <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Registrar</Text>
                    </TouchableOpacity>

                    {loaded ? null : <ActivityIndicator style={{ justifyContent: "center", alignSelf: 'center' }} size="large" />}

                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}
