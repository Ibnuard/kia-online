import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AntreanScreen from '../screens/AntreanScreen';
import ImunisasiScreen from '../screens/ImunisasiScreen';
import AddJadwalScreen from '../screens/AddJadwalscreen';
import NewsScreen from '../screens/NewsScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MyTabBar} from '../components/TabBar';
import JadwalDetailScreen from '../screens/JadwalDetailScreen';
import {View} from 'react-native';
import AppBar from '../components/AppBar';
import {Colors} from '../styles';
import {Gap} from '../components';
import {useRoute} from '@react-navigation/native';

//create stack screen
const Stack = createNativeStackNavigator();
// TopBar
const Tab = createMaterialTopTabNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeInit" component={HomeScreen} />
      <Stack.Screen name="JadwalDetail" component={AdminJadwaldetail} />
      <Stack.Screen name="AdminAntrian" component={AntreanScreen} />
      <Stack.Screen name="AdminImunisasi" component={ImunisasiScreen} />
      <Stack.Screen
        name="Jadwal"
        component={AddJadwalScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="HomeNews" component={NewsScreen} />
    </Stack.Navigator>
  );
};

export const AdminJadwaldetail = () => {
  const route = useRoute();

  const DATA = route?.params;

  console.log(route.params);
  return (
    <View style={{flex: 1}}>
      <AppBar showBack={true} title="Detail Imunisasi" />
      <Tab.Navigator
        tabBar={props => (
          <MyTabBar
            key={props}
            {...props}
            bgColor={Colors.COLOR_WHITE}
            pv={8}
          />
        )}>
        <Tab.Screen
          name="Detail"
          component={JadwalDetailScreen}
          initialParams={DATA}
        />
        <Tab.Screen
          name="Antrian"
          component={AntreanScreen}
          initialParams={DATA}
        />
      </Tab.Navigator>
    </View>
  );
};
