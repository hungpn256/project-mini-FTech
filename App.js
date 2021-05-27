import React from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './AppNaviGation';
import createStore from './src/Redux/storeConfigure';
const store = createStore();
function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
export default App;
