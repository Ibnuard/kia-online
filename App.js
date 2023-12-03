import React from 'react';
import Main from './src';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

// Default theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
};

export default App;
