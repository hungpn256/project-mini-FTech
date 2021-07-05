import React, {useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './AppNaviGation';
import createStore from './src/Redux/storeConfigure';
import db from './index';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: 'SourceSansPro-Regular'};
const theme = {
  ...DefaultTheme,
};

const store = createStore();
function App() {
  // useEffect(() => {
  //   db.executeSql(
  //     "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
  //     [],
  //     function (tx, res) {
  //       console.log('item:', res.rows.length);
  //       if (res.rows.length == 0) {
  //         db.executeSql('DROP TABLE IF EXISTS table_user', []);
  //         db.executeSql(
  //           'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
  //           [],
  //         );
  //       }
  //     },
  //   );
  // }, []);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </Provider>
  );
}
export default App;
