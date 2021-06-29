import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import AppNavigation from './AppNaviGation';
import createStore from './src/Redux/storeConfigure';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const store = createStore();
function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </Provider>
  );
}
export default App;
