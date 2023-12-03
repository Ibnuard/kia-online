import React from 'react';
import Main from './src';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {Colors} from './src/styles';

const fontConfig = {
  fontFamily: 'Poppins-Regular',
};

// Default theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.COLOR_PRIMARY,
    secondary: 'yellow',
  },
  fonts: configureFonts({config: fontConfig}),
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
};

export default App;
