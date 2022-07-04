import { AppBar } from '../componentes/AppBar';
import { DrawerScreenProps } from '@react-navigation/drawer'
import { Dimensions,View,Text,Image,StyleSheet,SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import api from '../api/endpoint/Endpoint'
import {Orden} from '../interfaces/interfaces';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends DrawerScreenProps<any, any> {

}
function getParsedDate(strDate){
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  dd + "-" + mm + "-" + yyyy;
    return date.toString();
}

export function Factura({ navigation, route }: Props) {

    const window = Dimensions.get("window");
    const [Dpedido, setDpedido] = useState<Orden[]>([])
    const [Fecha, setFecha] = useState('')
    // console.log(Dpedido[0].id_pedido)
    useEffect(() => {
     cargarVariables()
    

    }, [route.params?.idPedido])

    const cargarVariables = async() =>{
        await api.get<Orden[]>('/detallepedidos/'+ route.params?.idPedido)
                    .then(resp => {
                            setDpedido(resp.data)
                         var   Fecha = getParsedDate(resp.data[0].fecha)
                            setFecha(Fecha)

                            console.log(resp.data)

                    }).catch(err => { });

    }
    
    return(
        <>
          <View style={{ height: 50,paddingTop:10
           , backgroundColor: "#0D3084", borderBottomEndRadius: 0, borderBottomStartRadius: 0, justifyContent: 'center', flexDirection: 'row'
        }}>


            <TouchableOpacity style={{ position: 'absolute', left: 20, alignItems: 'center',paddingTop:10 }} onPress={() => {navigation.navigate('Ordenes')}}>
                <Icon name='arrow-undo-sharp' size={30} color="white"  />
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Open Sans', color: 'white', fontSize: 18, textAlign: 'center', }}>Detalle</Text>
        </View>
<View style={styles.Body}>
<SafeAreaView>
    <ScrollView>



    <View style={styles.container}>

        <View style={styles.banner}>
             <Image style={styles.imagen} source={require('../../utils/logosbancos/Logo.png')} />
             {/* <Text style={styles.Tpedido}>Pedido Numero</Text> */}
             <Text style={styles.Tpedido}>{Dpedido[0]?.nombre}</Text>
        </View>
             <Text style={{color:'black',fontWeight:'bold',alignSelf: 'flex-start',fontSize:18,paddingHorizontal:25}}>Resumen</Text>
        <View style={styles.bannerU}>
            
            <View style={styles.Pusuario}>
                <Text style={styles.Tusuario}>Numero de Pedido:</Text>
                <Text style={styles.TusuarioV}>{Dpedido[0]?.id_pedido}</Text>
            </View>

            <View style={styles.Pusuario}>
                <Text style={styles.Tusuario}>Banco:</Text>
                <Text style={styles.TusuarioV}>{Dpedido[0]?.banco}</Text>
            </View>

            <View style={styles.Pusuario}>
                <Text style={styles.Tusuario}>Numero de Pago:</Text>
                <Text style={styles.TusuarioV}>{Dpedido[0]?.num_ref}</Text>
            </View>
            
            <View style={styles.Pusuario}>
                <Text style={styles.Tusuario}>Fecha:</Text>
                <Text style={styles.TusuarioV}>{Fecha}</Text>
            </View>

            <View style={styles.Pusuario}>
                <Text style={styles.Tusuario}>Total Productos:</Text>
                <Text style={styles.TusuarioV}>{Dpedido[0]?.cantidadT} Unid.</Text>
            </View>

            <View style={styles.Pusuario}>
                <Text style={styles.Tusuario}>Monto Total:</Text>
                <Text style={styles.TusuarioV}>$ {Dpedido[0]?.monto}</Text>
            </View>
        </View>
        <Text style={{color:'black',fontWeight:'bold',alignSelf: 'flex-start',fontSize:18,paddingHorizontal:25}}>Delivery</Text>
        <View style={styles.bannerU}>
            
            <View style={styles.Pusuario}>
                <Text style={styles.Tusuario}>Nombre:</Text>
                <Text style={styles.TusuarioV}>{Dpedido[0]?.delivery}</Text>
            </View>
        </View>
        <Text style={{color:'black',fontWeight:'bold',alignSelf: 'flex-start',fontSize:18,paddingHorizontal:25}}>Productos</Text>

        {
                        Dpedido.map((i: Orden) => (
                    <View style={styles.bannerU}>
                        <View style={styles.Pusuario}>

                            <View style={{  flex:1,marginRight:10, padding:10,}}>
                                <Image style={styles.imagenP}  source={{ uri: 'https://tuplanetadulce.com/' + i.id_producto + 'prod-planetadulce.png' }} />
                            </View>

                            <View style={{  flex:2,justifyContent: 'center'}}>
                                <Text  style={styles.Tproducto}>{i.producto}</Text>
                            </View>

                            <View style={{  flex:1,justifyContent: 'center',alignItems: 'center'}}>
                                <Text style={styles.Tproducto}>{i.cantidad}</Text>
                            </View>

                        </View>                        
                    </View>

                        ))
                    }
    </View>
    </ScrollView>
</SafeAreaView> 
</View>
        </>
    )
}

const styles = StyleSheet.create({
    Body: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: 'white',
        marginBottom:50
    },
    container: {   
        flexDirection: 'column',
        marginHorizontal:0,
        width: Dimensions.get("window").width,
        marginBottom:60
},
    imagen: {
        width:180, 
        marginBottom: 15, 
        height: 150,
        // alignSelf: 'center'
    },
    banner: {  
        width: 'auto',
        backgroundColor: '#6F53C7',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom:20,
        marginTop:10,
        marginHorizontal:10
},
bannerU: {  
    width: 'auto',
    backgroundColor: '#6F53C7',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom:10,
    // marginTop:10,
    marginHorizontal:10
},
    Tpedido:{
        color:"white",
        fontSize:18,
        fontWeight:"bold",
        fontFamily:"Helvetica Neue",
        marginVertical:5
},
    Pusuario:{
        flexDirection: 'row',
        width: 'auto',
        backgroundColor: '#6F53C7',
        // alignContent: 'flex-start',
        borderRadius: 10,
        marginVertical:5,
        marginHorizontal:5
},
Tusuario:{
    color:"white",
    fontSize:16,
    flex:1,
    fontWeight:"bold",
    fontFamily:"Helvetica Neue",
    alignSelf: 'flex-start',
    // backgroundColor: 'red',

},
TusuarioV:{
    color:"white",
    fontSize:16,
    flex:1,
    fontWeight:"bold",
    fontFamily:"Helvetica Neue",
    alignContent: 'flex-end',
    // backgroundColor: 'green',
},
imagenP:{
   
    width: 80, 
    height: 80, 
    borderRadius:20,
    alignSelf: 'flex-start',
  
},
Tproducto:{
    color:"white",
    fontSize:16,
    fontWeight:"bold",
    fontFamily:"Helvetica Neue",
}
});