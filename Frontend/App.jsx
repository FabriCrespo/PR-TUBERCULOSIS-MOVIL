import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Paciente from './Paciente'; // Asegúrate de que la ruta sea correcta
import HomeScreen from './HomeScreen'; // Pantalla de inicio (opcional)

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Paciente" component={Paciente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
