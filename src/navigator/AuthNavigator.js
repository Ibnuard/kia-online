import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterProfileScreen from '../screens/RegisterProfileScreen';
import ModeScreen from '../screens/ModeScreen';

//create stack screen
const Stack = createNativeStackNavigator();

//auth stack screen
export const AuthStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Mode" component={ModeScreen} />
      <Stack.Screen name="SignIn" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={RegisterStack} />
    </Stack.Navigator>
  );
};

const RegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'SignUpInit'} component={RegisterScreen} />
      <Stack.Screen name="SignUpProfile" component={RegisterProfileScreen} />
    </Stack.Navigator>
  );
};
