import { DrawerScreenProps } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/endpoint/Endpoint'
import { AppBar } from '../componentes/AppBar'
import { ProductoContext } from '../context/ProductoContext'
import { AuthContext } from '../context/AuthContext';
import { Avatar, Divider, ListItem, Overlay } from 'react-native-elements'
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'


interface Props extends DrawerScreenProps<any, any> {
}

interface ordenes {
    results: orden[]
}

interface orden {
    id_pedido: number,
    id_user: number,
    monto: number,
    fecha_creacion: string,
    num_ref: string

}




export const Ordenes = ({ navigation, route }: Props) => {

    const { pedidoState } = useContext(ProductoContext)
    const { user } = useContext(AuthContext)


    const [ordenes, setOrdenes] = useState<ordenes>()

    useEffect(() => {

        queryOrdenes(user!.id)

    }, [])

    const queryOrdenes = async (id: number) => {
        const { data } = await api.post('/Ordenes', { iduser: id });
        console.log(data.results);
        setOrdenes(data)
    }

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const window = Dimensions.get("window");
    return (
        <>


            <AppBar titulo={'Mis Ordenes'} navigation={navigation} route={route} />


            {ordenes ?
                <View style={{ flex: 1 }}>

                    {
                        ordenes.results.map((i: orden) => (

                            <TouchableOpacity key={i.id_pedido} onPress={toggleOverlay}>
                                <ListItem bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} style={{ width: '100%' }} >
                                    <ListItem.Content>
                                        <ListItem.Title>Pedido Numero {i.id_pedido}</ListItem.Title>
                                        <ListItem.Subtitle>Costo total: {i.monto}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Referencia de pago: {i.num_ref}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </TouchableOpacity>

                        ))
                        // <Text style={{fontSize:20}}>{JSON.stringify(ordenes)}</Text>


                    }


                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ height: window.width * 0.80 }}>
                        <ScrollView style={{ width: window.width * 0.60 }}>
                            <Text>Orden numero 2</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >

                                <Text>Codigo</Text>
                                <Text>Nombre</Text>
                                <Text>Cantidad</Text>
                                <Text>Precio</Text>
                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }} >

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                                    <Text>Codigo: </Text>
                                    <Text>6090</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                                    <Text>Nombre: </Text>
                                    <Text>Cambures</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                                    <Text>Cantidad: </Text>
                                    <Text>3</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                                    <Text>Precio</Text>
                                    <Text>$ 10</Text>
                                </View>

                            </View>
                            <Divider orientation="vertical" width={15} />

                        </ScrollView>
                    </Overlay>

                </View>
                :
                <Text>Sin informacion</Text>}











        </>
    )
}
