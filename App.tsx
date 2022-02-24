import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { Inicio } from './src/screen/Inicio';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductoProvider } from './src/context/ProductoProvider';
import { Productos } from './src/screen/Productos';
import { PedidoScreen } from './src/screen/Pedido';
import { Pagar } from './src/screen/Pagar';


const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <ProductoProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor:'#0D3084' }}>
          <StatusBar backgroundColor='#0D3084'/>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Productos" component={Productos} />
            <Stack.Screen name="Pedido" component={PedidoScreen} /> 
            <Stack.Screen name="Pagar" component={Pagar} /> 
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </ProductoProvider>



  )
}
export default App;