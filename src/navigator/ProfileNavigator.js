import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterProfileScreen from '../screens/RegisterProfileScreen';
import DaftarImunisasiScreen from '../screens/DaftarImunisasiScreen';
import AddChildScreen from '../screens/AddChildScreen';
import CallScreen from '../screens/CallScreen';
import HelpScreen from '../screens/HelpScreen';

//create stack screen
const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileInit" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={RegisterProfileScreen} />
      <Stack.Screen name="ChildList" component={DaftarImunisasiScreen} />
      <Stack.Screen
        name="AddChild"
        component={AddChildScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="CallCenter" component={CallScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
};
