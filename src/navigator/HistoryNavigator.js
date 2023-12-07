import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HistoryScreen from '../screens/HistoryScreen';
import HistoryDetailScreen from '../screens/HistoryDetailScreen';

//create stack screen
const Stack = createNativeStackNavigator();

export const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HistoryInit" component={HistoryScreen} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
    </Stack.Navigator>
  );
};
