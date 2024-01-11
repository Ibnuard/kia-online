import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ImunisasiStack} from './ImunisasiNavigator';
import DaftarImunisasiScreen from '../screens/DaftarImunisasiScreen';
import AddChildScreen from '../screens/AddChildScreen';
import TiketScreen from '../screens/TiketScreen';
import React from 'react';
import {AuthContext} from '../context';
import CategoryScreen from '../screens/CategoryScreen';
import AddJadwalScreen from '../screens/AddJadwalscreen';
import TiketListScreen from '../screens/TiketListScreen';
import JadwalDetailScreen from '../screens/JadwalDetailScreen';

//create stack screen
const Stack = createNativeStackNavigator();

export const DaftarImunisasiStack = () => {
  const {user} = React.useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="KategoriNav"
        component={user?.role == 'user' ? ImunisasiStack : AdminJadwalStack}
      />
      <Stack.Screen
        name="DaftarImunisasi"
        component={DaftarFlowStack}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="BuatJadwal"
        component={AddJadwalScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="TiketList"
        component={TiketListScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Tiketku"
        component={TiketScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

// User Daftar stack
const DaftarFlowStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DaftarInit" component={JadwalDetailScreen} />
      <Stack.Screen name="DaftarChildList" component={DaftarImunisasiScreen} />
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

// Admin buat jadwal stack
const AdminJadwalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CategoryInit" component={CategoryScreen} />
    </Stack.Navigator>
  );
};
