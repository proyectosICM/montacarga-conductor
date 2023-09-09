import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Carga } from './screens/Carga';
import { SolicitarCarga } from './screens/SolicitarCarga';
import { MontacargaAsignados } from './screens/MontacargaAsignados';
import MenuCarrilApi from './screens/MenuCarrilApi';
import { CarrilLibre } from './screens/CarrilLibre';
import { CarrilPendiente } from './screens/CarrilPendiente';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
          initialRouteName='Inicio'>
        <Stack.Screen name = 'Inicio' component={MenuCarrilApi}  />
        <Stack.Screen name = 'Cargando' component={Carga} />
        <Stack.Screen name = 'Libre' component={CarrilLibre} />
        <Stack.Screen name = 'Pendiente' component={CarrilPendiente} />
        <Stack.Screen name= 'Solicitar Carga' component={SolicitarCarga} />
        <Stack.Screen name= 'Montacargas Asignados' component={MontacargaAsignados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
