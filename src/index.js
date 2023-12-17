import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SplashStack} from './navigator';
import {AuthContext} from './context';
import {removeData, retrieveData, storeData} from './utils/store';
import {AuthStackScreen} from './navigator/AuthNavigator';
import {MainScreen} from './navigator/MainNavigator';
import {StatusBar} from 'react-native';
import {Colors} from './styles';
import {ModalProvider} from './context/ModalProvider';
import {RoleProvider} from './context/RoleProvider';
import moment from 'moment';
import 'moment/locale/id'; // without this line it didn't work
moment.locale('id');

const App = () => {
  //handle auth flow
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            user: action.user,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    },
  );

  //   React.useEffect(() => {
  //     // Fetch the token from storage then navigate to our appropriate place
  //     const bootstrapAsync = async () => {
  //       let userToken;

  //       try {
  //         userToken = await retrieveData('token', false);
  //       } catch (e) {
  //         // Restoring token failed
  //       }

  //       // After restoring token, we may need to validate it in production apps

  //       // This will switch to the App screen or Auth screen and this loading
  //       // screen will be unmounted and thrown away.
  //       dispatch({type: 'RESTORE_TOKEN', token: userToken});
  //     };

  //     bootstrapAsync();
  //   }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        await storeData('USER_SESSION', {...data, userToken: 'abcdefgh'}, true);

        dispatch({type: 'SIGN_IN', token: 'abcdefgh', user: data});
      },
      signOut: async () => {
        await removeData('USER_SESSION');
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      restoreToken: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'RESTORE_TOKEN', token: data?.userToken, user: data});
      },
      user: state.user,
    }),
    [state],
  );

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Colors.COLOR_BACKGROUND}
        barStyle={'dark-content'}
      />
      <ModalProvider>
        <AuthContext.Provider value={authContext}>
          <RoleProvider>
            {state.isLoading ? (
              <SplashStack />
            ) : state.userToken == null ? (
              <AuthStackScreen />
            ) : (
              <MainScreen />
            )}
          </RoleProvider>
        </AuthContext.Provider>
      </ModalProvider>
    </NavigationContainer>
  );
};

export default App;
