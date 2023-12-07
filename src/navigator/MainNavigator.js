import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DaftarImunisasiStack} from './DaftarImunisasiNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HomeStack} from './HomeNavigator';
import {HistoryStack} from './HistoryNavigator';

//create bottom tab
const Tab = createBottomTabNavigator();

//tab stack screen
export const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (
            routeName === 'HomeInit' ||
            routeName === 'KategoriNav' ||
            routeName === 'HistoryInit' ||
            !routeName
          ) {
            return {display: 'flex'};
          } else {
            return {display: 'none'};
          }
        })(route),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Imunisasi"
        component={DaftarImunisasiStack}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
