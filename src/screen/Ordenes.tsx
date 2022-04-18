import { DrawerScreenProps } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState } from 'react'
import api from '../api/endpoint/Endpoint'
import { AppBar } from '../componentes/AppBar'
import { ProductoContext } from '../context/ProductoContext'
import { AuthContext } from '../context/AuthContext';
import { ListItem, Overlay } from 'react-native-elements'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { DataTable } from 'react-native-paper'


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

export interface Detalle {
    results: Result[];
}

export interface Result {
    id_producto_pedido: number;
    id_pedido: number;
    producto: string;
    cantidad: number;
    id_producto: number;
    preciob: number;
    precio: number;
    precio2: number;
    precio3: number;
    marca: number;
}





export const Ordenes = ({ navigation, route }: Props) => {

    const { pedidoState } = useContext(ProductoContext)
    const { user } = useContext(AuthContext)


    const [ordenes, setOrdenes] = useState<ordenes>()



    const [ordenDetallado, setOrdenDetallado] = useState<Detalle>()

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

    const detallesOrden = async (id_pedido: number) => {

        const { data } = await api.post<Detalle>('/detalleOrden', { id_pedido });
        setOrdenDetallado(data);

        toggleOverlay()

    };

    const window = Dimensions.get("window");
    return (
        <>


            <AppBar titulo={'Mis Ordenes'} navigation={navigation} route={route} />


            {ordenes ?
                <View style={{ flex: 1 }}>
                    {
                        ordenes.results.map((i: orden) => (
                            <TouchableOpacity key={i.id_pedido} onPress={() => {
                                detallesOrden(i.id_pedido)
                            }}>
                                <ListItem bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} style={{ width: '100%' }} >
                                    <ListItem.Content>
                                        <ListItem.Title>Pedido Numero {i.id_pedido}</ListItem.Title>
                                        <ListItem.Subtitle>Costo total: {i.monto}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Referencia de pago: {i.num_ref}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </TouchableOpacity>
                        ))
                    }
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ height: window.width * 0.90 }}>
                        <ScrollView style={{ width: window.width * 0.90 }}>
                            <Text style={{ alignSelf: 'center', marginVertical: 10, fontSize: 16 }} >Orden numero 2</Text>
                            <OrdenDetallada ordenDetallado={ordenDetallado!} navigation={navigation} route={route} />
                            <Text style={{ alignSelf: 'center', marginVertical: 20, fontSize: 18 }} >Total : $200</Text>

                        </ScrollView>
                    </Overlay>

                </View>
                :
                <Text>Sin informacion</Text>}











        </>
    )
}

interface Props {
    ordenDetallado: Detalle
}

const array = [
    { puerta: 1 },
    { puerta: 2 },
    { puerta: 3 }
]


export const OrdenDetallada = ({ ordenDetallado }: Props) => {
    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Producto</DataTable.Title>
                    <DataTable.Title numeric>Cantidad</DataTable.Title>
                    <DataTable.Title numeric>Precio</DataTable.Title>
                </DataTable.Header>
                {ordenDetallado?.results.map((productos: Result) => {
                    return (

                        <DataTable.Row >
                            <DataTable.Cell  textStyle = {{fontSize: 10}}> {productos.producto}</DataTable.Cell>
                            <DataTable.Cell numeric>{productos.cantidad}</DataTable.Cell>
                            <DataTable.Cell numeric>$ {productos.precio}</DataTable.Cell>
                        </DataTable.Row>

                    )
                })}
            </DataTable>
        </>
    )
}
