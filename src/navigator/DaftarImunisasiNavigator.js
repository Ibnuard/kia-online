import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ImunisasiStack} from './ImunisasiNavigator';
import DaftarImunisasiScreen from '../screens/DaftarImunisasiScreen';
import AddChildScreen from '../screens/AddChildScreen';
import TiketScreen from '../screens/TiketScreen';

//create stack screen
const Stack = createNativeStackNavigator();

export const DaftarImunisasiStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="KategoriNav" component={ImunisasiStack} />
      <Stack.Screen
        name="DaftarImunisasi"
        component={DaftarFlowStack}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

const DaftarFlowStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DaftarInit" component={DaftarImunisasiScreen} />
      <Stack.Screen
        name="DaftarAddChild"
        component={AddChildScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="TiketImunisasi"
        component={TiketScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};
