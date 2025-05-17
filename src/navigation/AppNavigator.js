import { createStackNavigator } from '@react-navigation/stack';
import ListaUsuarios from '../screens/ListaUsuarios';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ListaUsuarios">
      <Stack.Screen 
        name="ListaUsuarios" 
        component={ListaUsuarios}
        options={{ title: 'Clientes Registrados' }}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Nuevo Registro' }}
      />
    </Stack.Navigator>
  );
}