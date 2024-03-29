import * as React from 'react';
import RegisteredImunScreen from '../screens/RegisteredImunScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StatusBar, StyleSheet, View} from 'react-native';
import AppBar from '../components/AppBar';
import {Colors} from '../styles';
import {MyTabBar} from '../components/TabBar';
import NonRegisteredImunScreen from '../screens/NonRegisteredImunScreen';

// TopBar
const Tab = createMaterialTopTabNavigator();

export const ImunisasiStack = () => {
  return (
    <View style={styles.container}>
      <AppBar
        titlePosition="left"
        title={'Kategori Imunisasi'}
        style={styles.appBar}
      />
      <Tab.Navigator
        tabBar={props => (
          <MyTabBar key={props} {...props} bgColor={Colors.COLOR_PRIMARY} />
        )}>
        <Tab.Screen
          name={'BelumTerdaftar'}
          component={NonRegisteredImunScreen}
          options={{
            title: 'Belum Terdaftar',
          }}
        />
        <Tab.Screen name="Terdaftar" component={RegisteredImunScreen} />
      </Tab.Navigator>
    </View>
  );
};

// =========== STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {},
});
