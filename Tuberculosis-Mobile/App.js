import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Paciente from './screens/PacienteScreen';
import TutorialScreen from './screens/TutorialScreen';
import CameraScreen from './screens/CameraScreen';
import Home from './screens/Home';
import { UserProvider } from './contexts/UserContext';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UserInfo" component={Paciente} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserProvider>
  );
}
