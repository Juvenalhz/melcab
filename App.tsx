import React from 'react'
import { SafeAreaView } from 'react-native';
import { Inicio } from './src/screen/Inicio';
import { Productos } from './src/screen/Productos';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pedido } from './src/screen/Pedido';
import { ProductoProvider } from './src/context/ProductoProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ProductoProvider>
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="Inicio">

          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Productos" component={Productos} />
          <Stack.Screen name="Pedido" component={Pedido} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
    </ProductoProvider>


  )
}
export default App;