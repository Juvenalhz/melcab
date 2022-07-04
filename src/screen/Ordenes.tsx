import { DrawerScreenProps } from '@react-navigation/drawer'
import React, { useContext, useEffect, useState, useRef } from 'react'
import api from '../api/endpoint/Endpoint'
import { AppBar } from '../componentes/AppBar'
import { ProductoContext } from '../context/ProductoContext'
import { AuthContext } from '../context/AuthContext';
import { ListItem, Overlay } from 'react-native-elements'
import { Text, View, TouchableOpacity, Dimensions, Linking,SafeAreaView,RefreshControl,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { DataTable } from 'react-native-paper'
import { Usuario } from '../interfaces/interfaces';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
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
    num_ref: string,
    banco: string,
    id_delivery: number | null,
    esatus: number
    estatus: string;
    id_estatus: number

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

    const  [loading,setLoading]  = useState(false);
    const [ordenes, setOrdenes] = useState<ordenes>()



    const [ordenDetallado, setOrdenDetallado] = useState<Detalle>()
    const [n, setN] = useState(0);

    const nref = useRef(n)

    useEffect(() => {
       
        if (user) queryOrdenes(user!.id)

    }, [route.params?.id_pedido, user])



    const queryOrdenes = async (id: number) => {

        if (user?.tipouser == 1) {
            const { data } = await api.post('/Ordenes', { iduser: id });
            setOrdenes(data)
        } else {
            const { data } = await api.post('/ordenesDelivery', { iduser: id });
            setOrdenes(data)
        }

    }
    const [refreshing, setRefreshing] = React.useState(false);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [idUser, setidUser] = useState(0);
    const [datauser, setdatauser]  = useState<Usuario>();

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleOverlay2 = () => {
        setVisible2(!visible2);
    };

    const toggleOverlay3 = () => {
        setVisible3(!visible3);
    };
    const GoFactura = async () => {
        await setVisible(!visible);
        navigation.navigate('Factura',{idPedido:ordenDetallado?.results[0].id_pedido})
       
    };
    const detallesOrden = async (id_pedido: number, idUSer: number) => {
     
        setidUser(idUSer);
        const { data } = await api.post<Detalle>('/detalleOrden/',{id_pedido} ); 
        setOrdenDetallado(data);
        toggleOverlay()


    };

    const  onRefresh = React.useCallback( async () => {
        setRefreshing(true);
       await queryOrdenes(user!.id).then(() => setRefreshing(false));
      }, []);
    const window = Dimensions.get("window");

    if (loading) {
        return(
        <>
            <View style={{flex: 1,
            justifyContent: "center",
            flexDirection: "column",
            padding: 10
            }}>
            <ActivityIndicator size="large" color="#0D3084" />
            <Text style={{fontSize:16, fontWeight: "bold",alignSelf: "center",color: "black"}}>Cargando Ordenes</Text>
          </View>
        
        </>
        );
          }else{

              return (
                  <>
                      {user?.tipouser == 1 ? <AppBar titulo={'Mis Ordenes'} navigation={navigation} route={route} /> : <AppBar titulo={'Por entregar'} navigation={navigation} route={route} />}
          
                      {ordenes ?
                      <SafeAreaView>
                          <ScrollView
                                  refreshControl={
                                      <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                      />
                                    }
                          >
                              {
                                  ordenes.results.map((i: orden) => (
          
          
                                      <TouchableOpacity key={i.id_pedido} onPress={() => {
                                          detallesOrden(i.id_pedido, i.id_user)
                                      }}>
                                          <ListItem bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} style={{ width: '100%' }} >
                                              <ListItem.Content>
                                                  <View style={{ flexDirection: 'row' }} >
                                                      <ListItem.Title>Pedido Numero {i.id_pedido}</ListItem.Title>
                                                      <Text style={[{ fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },
                                                      i.id_estatus == 3 ? { color: 'green' }: i.id_estatus == 4 ? { color: 'orange' } : i.id_estatus == 2 ? { color: 'yelllow' } : { color: 'red' } ]}>{i.estatus}</Text>
                                                  </View>
                                                  <ListItem.Subtitle>Costo total: {i.monto.toFixed(2)}</ListItem.Subtitle>
                                                  <ListItem.Subtitle>Referencia de pago: {i.num_ref}</ListItem.Subtitle>
                                              </ListItem.Content>
                                          </ListItem>
                                      </TouchableOpacity>
          
                                  ))
                              }
          
          
                              <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ height: window.height * 0.40, width: window.width * 0.80, borderRadius: 15, justifyContent: 'center', alignContent: 'center' }}>
                                  <View style={{ justifyContent: 'center', flex: 1 }}>
          
                                      <Text style={{ color: '#000', textAlign: 'center', alignSelf: 'center', top: 5, position: 'absolute' }}>Opciones</Text>
          
                                      {user?.tipouser != 1 ?
                                          <>
                                              <TouchableOpacity style={{ borderRadius: 100, width: 250, marginBottom: 20, alignSelf: 'center' }} onPress={async () =>  {
                                                  const { data } = await api.post('/datosUser', { iduser: idUser });
                                                  console.log(data.usuarios)
                                                  setdatauser(data.usuarios)
                                                  toggleOverlay3()
                                              }}>
                                                  <View style={{ backgroundColor: '#0D3084', height: 50, width: 250, borderRadius: 100, justifyContent: 'center' }}>
                                                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center' }}>Info cliente</Text>
                                                  </View>
                                              </TouchableOpacity>
          
                                              <TouchableOpacity style={{ borderRadius: 100, width: 250, marginBottom: 20, alignSelf: 'center' }} onPress={() => { 
                                                  setN(prev => prev + 1)
                                                  navigation.navigate('Maps', { idUser, id_pedido: ordenDetallado?.results[0].id_pedido }) }}>
                                                  <View style={{ backgroundColor: '#0D3084', height: 50, borderRadius: 100, width: 250, justifyContent: 'center' }}>
                                                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center' }}>Direccion de entrega</Text>
                                                  </View>
                                              </TouchableOpacity>
                                              <TouchableOpacity style={{ borderRadius: 100, width: 250, alignSelf: 'center' }} onPress={async () => { 
                                                  const { data } = await api.post('/datosUser', { iduser: idUser });
                                                  console.log(data.usuarios)
                                                  setdatauser(data.usuarios)
                                                  
                                                  Linking.openURL(`https://wa.me/${datauser?.tlf}?text=Buen dia, `) }}>
                                                  <View style={{ backgroundColor: '#0D3084', height: 50, borderRadius: 100, width: 250, justifyContent: 'center' }}>
                                                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center' }}>Chat</Text>
                                                  </View>
                                              </TouchableOpacity>
                                          </>
                                          :
                                          <>
                                           <TouchableOpacity style={{ borderRadius: 100, width: 250, marginBottom: 20, alignSelf: 'center' }} onPress={GoFactura}>
                                                  <View style={{ backgroundColor: '#0D3084', height: 50, borderRadius: 100, width: 250, justifyContent: 'center' }}>
                                                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center' }}>Detalle</Text>
                                                  </View>
                                              </TouchableOpacity>
                                              <TouchableOpacity style={{ borderRadius: 100, width: 250, marginBottom: 20, alignSelf: 'center' }} onPress={() => { toggleOverlay2() }}>
                                                  <View style={{ backgroundColor: '#0D3084', height: 50, borderRadius: 100, width: 250, justifyContent: 'center' }}>
                                                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center' }}>Resumen</Text>
                                                  </View>
                                              </TouchableOpacity>
                                              <TouchableOpacity style={{ borderRadius: 100, width: 250, alignSelf: 'center' }} onPress={() => { Linking.openURL('https://wa.me/+584241595332?text=Buen dia, quiero conocer el estatus de mi pedido') }}>
                                                  <View style={{ backgroundColor: '#0D3084', height: 50, borderRadius: 100, width: 250, justifyContent: 'center' }}>
                                                      <Text style={{ color: '#fff', textAlign: 'center', alignSelf: 'center' }}>Chat</Text>
                                                  </View>
                                              </TouchableOpacity>
                                          </>}
          
                                  </View>
                              </Overlay>
          
          
                              <Overlay isVisible={visible2} onBackdropPress={toggleOverlay2} overlayStyle={{ height: window.width * 0.90 }}>
                                  <ScrollView style={{ width: window.width * 0.90 }}>
                                      <Text style={{ alignSelf: 'center', marginVertical: 10, fontSize: 16 }} >Orden numero {ordenes.results.find((id_orden) => id_orden.id_pedido == ordenDetallado?.results[0].id_pedido)?.id_pedido}</Text>
                                      <OrdenDetallada ordenDetallado={ordenDetallado!} />
                                      <Text style={{ alignSelf: 'center', marginVertical: 20, fontSize: 18 }} >Total : ${ordenes.results.find((id_orden) => id_orden.id_pedido == ordenDetallado?.results[0].id_pedido)?.monto.toFixed(2)}</Text>
          
                                  </ScrollView>
                              </Overlay>
          
                              <Overlay isVisible={visible3} onBackdropPress={toggleOverlay3} overlayStyle={{ height: window.width * 0.80 }}>
                                  <ScrollView style={{ width: window.width * 0.90 }}>
                                      <Text style={{ alignSelf: 'center', marginVertical: 30, fontSize: 22 }} >Informacion Cliente</Text>
          
                                      <Text style={{  marginVertical: 10, fontSize: 18, marginLeft: 10}} >Nombre Cliente: </Text>
                                      <Text style={{  fontSize: 15, marginLeft: 10 }} >{datauser?.nombre}</Text>
                                      <Text style={{  marginVertical: 10, fontSize: 18, marginLeft: 10}} >Numero Telefonico: </Text>
                                      <Text onPress={ () => {
                                         Clipboard.setString('hello world');
                                         Snackbar.show({
                                          text: 'Número copiado',
                                          duration: 1000,
                                        });
                                      }}  style={{  fontSize: 15, marginLeft: 10 }} >{datauser?.tlf}</Text>
          
                                  </ScrollView>
                              </Overlay>
                          </ScrollView>
                          </SafeAreaView>
                          :
                          <Text>Sin informacion</Text>}
          
          
          
          
          
          
          
          
          
          
          
                  </>
              )
          }
}

interface Props2 {
    ordenDetallado: Detalle
}

const array = [
    { puerta: 1 },
    { puerta: 2 },
    { puerta: 3 }
]


export const OrdenDetallada = ({ ordenDetallado }: Props2) => {
    console.log(ordenDetallado)
    return (
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Producto</DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }} numeric>Cantidad</DataTable.Title>
                    <DataTable.Title numeric>Precio</DataTable.Title>
                </DataTable.Header>
                {ordenDetallado?.results.map((productos: Result) => {
                    return (
                        <DataTable.Row key={productos.id_producto_pedido} >
                            <DataTable.Cell style={{ flex: 3 }} textStyle={{ fontSize: 10 }}> {productos.producto}</DataTable.Cell>
                            <DataTable.Cell numeric>{productos.cantidad}</DataTable.Cell>
                            <DataTable.Cell numeric>$ {productos.precio}</DataTable.Cell>
                        </DataTable.Row>

                    )
                })}
            </DataTable>
        </>
    )
}
