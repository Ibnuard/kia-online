import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AntreanScreen from '../screens/AntreanScreen';
import ImunisasiScreen from '../screens/ImunisasiScreen';
import AddJadwalScreen from '../screens/AddJadwalscreen';

//create stack screen
const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeInit" component={HomeScreen} />
      <Stack.Screen name="AdminAntrian" component={AntreanScreen} />
      <Stack.Screen name="AdminImunisasi" component={ImunisasiScreen} />
      <Stack.Screen
        name="Jadwal"
        component={AddJadwalScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};
