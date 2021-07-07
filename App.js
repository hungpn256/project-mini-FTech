import React, {useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './AppNaviGation';
import createStore from './src/Redux/storeConfigure';
import {connectDb} from './src/db';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: 'SourceSansPro-Regular'};
const theme = {
  ...DefaultTheme,
};

const store = createStore();
function App() {
<<<<<<< HEAD
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
=======
  // useEffect(async () => {
  //   const db = await connectDb();
  // db.executeSql(
  //   'CREATE TABLE IF NOT EXISTS Departments( ' +
  //     'department_id INTEGER PRIMARY KEY NOT NULL, ' +
  //     'name VARCHAR(30) ); ',
  //   [],
  //   () => console.log('tao thanh cong'),
  //   e => console.log('fail', e),
  // );
  // db.executeSql(
  //   'INSERT INTO Departments (name) VALUES ("Client Services");',
  //   [],
  // );
  // db.executeSql(
  //   'INSERT INTO Departments (name) VALUES ("Investor Services");',
  //   [],
  // );
  // db.executeSql('INSERT INTO Departments (name) VALUES ("Shipping");', []);
  // db.executeSql(
  //   'INSERT INTO Departments (name) VALUES ("Direct Sales");',
  //   [],
  // );
  // db.executeSql(
  //   'SELECT * FROM Departments',
  //   [],
  //   data => {
  //     console.log(data, 'res');
  //     var len = data.rows.length;
  //     for (let i = 0; i < len; i++) {
  //       let row = data.rows.item(i);
  //       console.log(row, 'row');
  //     }
  //   },
  //   error => {
  //     console.log('received version error:', error);
  //   },
  // );
>>>>>>> 5373a4309b80eb920237592c8a59601e57126a15
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
