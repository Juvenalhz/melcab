import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { Inicio } from './src/screen/Inicio';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductoProvider } from './src/context/ProductoProvider';
import { Productos } from './src/screen/Productos';
import { PedidoScreen } from './src/screen/Pedido';
import { Pagar } from './src/screen/Pagar';
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerContenido } from './src/componentes/DrawerContainer';
import { Registro } from './src/screen/Registro';
import { AuthProvider } from './src/context/AuthContext';
import { Verificacion } from './src/screen/Verificacion';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

interface Props extends DrawerScreenProps<any, any> {
}

const App = ({route} : Props) => {
  return (
    <AuthProvider>
      <ProductoProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#0D3084' }}>
            <StatusBar backgroundColor='#0D3084' />
            <Drawer.Navigator initialRouteName='Inicio' screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContenido  {...props} />}>
              <Drawer.Screen name="Inicio" component={Verificacion} />
              <Drawer.Screen name="Productos" component={Productos} />
              <Drawer.Screen name="Pedido" component={PedidoScreen} />
              <Drawer.Screen name="Pagar" component={Pagar} />
              <Drawer.Screen name="Registro" component={Registro} />
            </Drawer.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </ProductoProvider>
    </AuthProvider>



  )
}

export default App;

