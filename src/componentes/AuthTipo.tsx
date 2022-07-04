import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../context/AuthContext';


interface Props extends DrawerScreenProps<any, any> {
    tipo: number
}


export const AuthTipo = ({ tipo, navigation, route }: Props) => {
    const { login, removeError, logOut, errorMessage, status, user } = useContext(AuthContext);
    return (
        <>
            <View style={{ flex: 1 }} >
                <View style={{ flex: 0.3, marginVertical: 20, marginHorizontal: 20 }}>
                    <Image style={{ width: 80, height: 80, borderRadius: 100 ,alignSelf: 'center'}} source={require('../../utils/user.jpg')} />

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 20,alignSelf: 'center' }}>{user?.nombre}</Text>
                        <Text style={{ fontSize: 12 ,alignSelf: 'center' }}>{user?.email}</Text>
                        {tipo == 1 ?
                            <Text style={{ fontSize: 12,alignSelf: 'center'  }}>Delivery</Text>
                            :
                            <Text style={{ fontSize: 12,alignSelf: 'center'  }}>Cliente - {user?.aprobado == 0 ? 'Sin verificar' : ' Verificado'} </Text>
                        }
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.7, marginVertical: 10 }}>
                    {/* <View style={{ width: '90%', marginVertical: 5 }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
                                <Icon name='person-sharp' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
                            </View>
                            <Text style={{ fontSize: 15, marginVertical: 15 }}>
                                Mi Cuenta
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ width: '90%', marginVertical: 5,borderBottomColor:'#1a46b2',borderBottomWidth: 2,}}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Inicio')}>
                            <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
                                <Icon name='home-outline' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
                            </View>
                            <Text style={{ fontSize: 15, marginVertical: 15 }}>
                                Inicio
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {tipo == 1 ?
                        <View style={{ width: '90%', marginVertical: 5 ,borderBottomColor:'#1a46b2',borderBottomWidth: 2,}}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={ () => { navigation.navigate('Ordenes') } }>
                                <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
                                    <Icon name='book-outline' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
                                </View>
                                <Text style={{ fontSize: 15, marginVertical: 15 }}>
                                    Pedidos Pendientes
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ width: '90%', marginVertical: 5,borderBottomColor:'#1a46b2',borderBottomWidth: 2, }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={ () => { navigation.navigate('Ordenes') } } >
                                <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
                                    <Icon name='book-outline' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
                                </View>
                                <Text style={{ fontSize: 15, marginVertical: 15 }}>
                                    Mis ordenes
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {tipo == 1 ?  <View style={{ width: '90%', marginVertical: 5 ,borderBottomColor:'#1a46b2',borderBottomWidth: 2,}}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={ () => { navigation.navigate('Inicio', {verProductos: true}) } } >
                                <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
                                    <Icon name='cart-outline' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
                                </View>
                                <Text style={{ fontSize: 15, marginVertical: 15 }}>
                                    Productos
                                </Text>
                            </TouchableOpacity>
                        </View>: null}
                    <View style={{ flexDirection: 'row', width: '90%', marginVertical: 5,borderBottomColor:'#1a46b2',borderBottomWidth: 2, }}>
                        <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#1a46b2', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: 20 }}>
                            <Icon name='log-out-outline' size={20} color="#EEEEEE" style={{ alignSelf: 'center', justifyContent: 'center' }} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Inicio')
                             logOut() 
                             }} >
                            <Text style={{ fontSize: 15, marginVertical: 15, textAlign: 'center' }}>
                                Cerrar Sesion
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}
