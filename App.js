import React, {useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './AppNaviGation';
import createStore from './src/Redux/storeConfigure';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: 'SourceSansPro-Regular'};
const theme = {
  ...DefaultTheme,
};

const store = createStore();
function App() {
  useEffect(() => {}, []);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </Provider>
  );
}
export default App;
