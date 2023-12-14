import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisteredImunScreen from '../screens/RegisteredImunScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StatusBar, StyleSheet, View} from 'react-native';
import AppBar from '../components/AppBar';
import {Colors} from '../styles';
import {MyTabBar} from '../components/TabBar';
import {AuthContext} from '../context';
import NonRegisteredImunScreen from '../screens/NonRegisteredImunScreen';

// TopBar
const Tab = createMaterialTopTabNavigator();

//create stack screen
const Stack = createNativeStackNavigator();

export const ImunisasiStack = () => {
  const {user} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.COLOR_BACKGROUND}
        barStyle={'dark-content'}
      />
      <AppBar
        titlePosition="left"
        title={'Kategori Imunisasi'}
        style={styles.appBar}
      />
      <Tab.Navigator tabBar={props => <MyTabBar key={props} {...props} />}>
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
  appBar: {
    backgroundColor: Colors.COLOR_BACKGROUND,
  },
});
