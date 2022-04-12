import { DrawerScreenProps } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/endpoint/Endpoint'
import { AppBar } from '../componentes/AppBar'
import { ProductoContext } from '../context/ProductoContext'
import { AuthContext } from '../context/AuthContext';
import { Avatar, ListItem } from 'react-native-elements'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'


interface Props extends DrawerScreenProps<any, any> {
}




export const Ordenes = ({ navigation, route }: Props) => {

    const { pedidoState } = useContext(ProductoContext)
    const { user } = useContext(AuthContext)


    const [ordenes, setOrdenes] = useState<any>([])

    useEffect(() => {

        queryOrdenes(user!.id)

    }, [])

    const queryOrdenes = async (id: number) => {
        const { data } = await api.post('/Ordenes', { iduser: id });
        console.log(data.results);
        setOrdenes([data.results])
    }

    return (
        <>


            <AppBar titulo={'Mis Ordenes'} navigation={navigation} route={route} />


            {ordenes ?
                <View style={{ flex: 1 }}>

                    {
                        ordenes.map((i: any) => (

                            <View key={i.id_pedido}>
                                <ListItem key={i.id_pedido} bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} style={{ width: '100%' }} >
                                    <ListItem.Content>
                                        <ListItem.Title>Pedido Numero {i.id_pedido}</ListItem.Title>
                                        <ListItem.Subtitle>Costo total: {i.monto}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Referencia de pago: {i.num_ref}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </View>

                        ))


                    }

                </View>
                :
                <Text>Sin informacion</Text>}











        </>
    )
}
