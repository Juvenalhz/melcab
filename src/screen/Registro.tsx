import React, { useContext, useState } from 'react'
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppBar } from '../componentes/AppBar'
import { AuthContext } from '../context/AuthContext'


export const Registro = () => {

    const [name, setname] = useState('');
    const [pass, setpass] = useState('');
    const [user, setuser] = useState('');
    const [tlf, settlf] = useState('');
    const [direccion, setdireccion] = useState('');
    const [email, setemail] = useState('');

    const {registro} = useContext(AuthContext)

    return (
        <>

            <KeyboardAvoidingView style={{flex: 1}}
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
                        <TextInput placeholder="Nompre completo" style={{width: '80%',}} value={name} onChangeText={ (e) => { setname(e) } } />
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
                        <TextInput placeholder="Usuario"  style={{width: '80%',}} value={user} onChangeText={ (e) => { setuser(e) } }/>
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
                        <TextInput placeholder="Contraseña"  style={{width: '80%',}} value={pass} onChangeText={ (e) => { setpass(e) } }/>
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
                        <TextInput placeholder="Confirmar contraseña"  style={{width: '80%',}} value={pass} onChangeText={ (e) => { setpass(e) } }/>
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
                        <TextInput placeholder="Correo"   style={{width: '80%',}}/>
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
                        <TextInput placeholder="Telefono"  style={{width: '80%',}} value={tlf} onChangeText={ (e) => { settlf(e) } }/>
                    </View>



                    <TouchableOpacity onPress={() => {

                        registro({user, pass, name, tlf, email, direccion}
                            
                            );
                     }} style={{ width: '80%', height: 35, backgroundColor: '#0D3084', borderRadius: 10, alignSelf: 'center', alignItems: 'center', marginVertical: 17 }}
                        
                    >
                        <Text style={{ fontSize: 18, fontWeight: '400', color: 'white', alignItems: 'center' }}>Registrar</Text>
                    </TouchableOpacity>


                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}
