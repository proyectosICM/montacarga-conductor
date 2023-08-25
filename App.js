import React from 'react';
import { ValidarQR } from './screens/ValidarQR';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Carga } from './screens/Carga';
import { SolicitarCarga } from './screens/SolicitarCarga';
import { MontacargaAsignados } from './screens/MontacargaAsignados';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Inicio' component={ValidarQR}  />
        <Stack.Screen name = 'Cargando' component={Carga} />
        <Stack.Screen name= 'Solicitar Carga' component={SolicitarCarga} />
        <Stack.Screen name= 'Montacargas Asignados' component={MontacargaAsignados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
