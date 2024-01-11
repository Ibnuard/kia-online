import React from 'react';
import Main from './src';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {Colors} from './src/styles';
import messaging from '@react-native-firebase/messaging';

const fontConfig = {
  fontFamily: 'Manrope-Regular',
};

// Default theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.COLOR_BUTTON,
    secondary: 'yellow',
  },
  fonts: configureFonts({config: fontConfig}),
};

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
};

export default App;
