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
import { createDrawerNavigator } from '@react-navigation/drawer';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (

    <ProductoProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D3084' }}>
          <StatusBar backgroundColor='#0D3084' />
          <Drawer.Navigator initialRouteName='Inicio'>
            <Drawer.Screen name="Inicio" component={Inicio} />
            <Drawer.Screen name="Productos" component={Productos} />
            <Drawer.Screen name="PedidoScreen" component={PedidoScreen} />
            <Drawer.Screen name="Pagar" component={Pagar} />
          </Drawer.Navigator>

        </SafeAreaView>
      </NavigationContainer>
    </ProductoProvider>



  )
}
export default App;

