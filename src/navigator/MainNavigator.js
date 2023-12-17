import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DaftarImunisasiStack} from './DaftarImunisasiNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HomeStack} from './HomeNavigator';
import {HistoryStack} from './HistoryNavigator';
import {ProfileStack} from './ProfileNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ASSETS} from '../utils/assetsLoader';
import {Image, View} from 'react-native';

//create bottom tab
const Tab = createBottomTabNavigator();

//tab stack screen
export const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = ASSETS.navigator.home[focused ? 0 : 1];
          } else if (route.name == 'Imunisasi') {
            iconName = ASSETS.navigator.imun[focused ? 0 : 1];
          } else if (route.name == 'History') {
            iconName = ASSETS.navigator.history[focused ? 0 : 1];
          } else if (route.name == 'Profile') {
            iconName = ASSETS.navigator.akun[focused ? 0 : 1];
          }

          // You can return any component that you like here!
          return (
            <View>
              <Image source={iconName} />
            </View>
          );
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (
            routeName === 'HomeInit' ||
            routeName === 'KategoriNav' ||
            routeName === 'HistoryInit' ||
            routeName === 'ProfileInit' ||
            routeName === 'CategoryInit' ||
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
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
