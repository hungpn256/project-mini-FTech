import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function formatMoney(n, currency = '') {
  return currency + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const ExchangeRate = () => {
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([
    {label: 'VND', value: 'VND'},
    {label: 'USD', value: 'USD'},
    {label: 'CNY', value: 'CNY'},
    {label: 'EUR', value: 'EUR'},
    {label: 'AUD', value: 'AUD'},
    {label: 'SGD', value: 'SGD'},
    {label: 'JPY', value: 'JPY'},
    {label: 'GBP', value: 'GBP'},
    {label: 'CHF', value: 'CHF'},
  ]);
  const [valueInput, setValueInput] = useState();
  const [valueOutput, setValueOutput] = useState();
  const exchangeRate = (fromCurrency, toCurrency) => {
    let url =
      'https://v6.exchangerate-api.com/v6/c5025aa66454926be950d407/latest/' +
      fromCurrency;
    getData();
    async function getData() {
      try {
        console.log('-------------------start request----------------------');
        const response = await axios.get(url);
        var result = response.data.conversion_rates;
        for (const item in result) {
          if (item === toCurrency) {
            console.log(fromCurrency + ':' + item, result[item]);
            let a = valueInput * result[item];
            setValueOutput(a.toFixed(0));
          }
        }
      } catch (error) {
        // handle error
        console.log(error.message);
      }
      console.log('-------------------end request ------------------------');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body1}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems}
          maxHeight={250}
          style={styles.picker}
          containerStyle={styles.containerPicker}
          textStyle={styles.textPiker}
          placeholder="From the currency"
          listItemContainer={styles.itemPicker}
          zIndex={2000}
          zIndexInverse={2000}
          listItemLabelStyle={styles.listItemPicker}
          onOpen={() => {
            setOpen2(false);
          }}
        />
        <FontAwesome name="forward" size={30} color="#1777F2" />
        <DropDownPicker
          open={open2}
          value={value2}
          items={items}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems}
          maxHeight={200}
          style={styles.picker}
          containerStyle={styles.containerPicker}
          textStyle={styles.textPiker}
          placeholder="To the currency"
          zIndex={1000}
          zIndexInverse={3000}
          listItemLabelStyle={styles.listItemPicker}
          onOpen={() => {
            setOpen1(false);
          }}
        />
      </View>

      <View style={styles.body2}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập số tiền"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={Number(valueInput)}
          onChangeText={text => {
            try {
              if (text.length > 0) setValueInput(parseInt(text));
              else {
                setValueInput();
              }
            } catch (e) {
              setValueInput();
            }
          }}
        />
        <FontAwesome name="forward" size={30} color="#b9b8ba" />
        <View style={styles.textOutput}>
          <Text style={styles.textOutputFont}>{valueOutput}</Text>
        </View>
      </View>
      <View style={styles.viewTouch}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            if (value1 === null || value2 === null) {
              Alert.alert('Bạn chưa chọn loại tiền');
            } else if (valueInput == null) {
              Alert.alert('Bạn chưa nhập số tiền');
            } else if (isNaN(valueInput) === true || valueInput < 0) {
              Alert.alert('Bạn nhập chưa đúng');
            } else {
              exchangeRate(value1, value2);
            }
          }}>
          <Text style={styles.textColor}>Exchange</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body1: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body2: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '700',
    backgroundColor: '#b9b8ba',
    width: '45%',
    borderRadius: 10,
    height: 50,
    paddingLeft: 20,
  },
  textOutput: {
    backgroundColor: '#b9b8ba',
    width: '45%',
    borderRadius: 10,
    textAlign: 'center',
    height: 50,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  textOutputFont: {
    fontWeight: '700',
    fontSize: 16,
  },
  viewTouch: {
    alignItems: 'center',
  },
  touch: {
    margin: 10,
    width: 130,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1777F2',
    borderRadius: 10,
  },
  picker: {
    backgroundColor: '#1777F2',
    borderWidth: 0,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 8,
    elevation: 18,
  },
  containerPicker: {
    width: '45%',
  },
  textPiker: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  listItemPicker: {
    color: 'white',
    fontWeight: '700',
    backgroundColor: '#1777F2',
    height: '100%',
  },
  textColor: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
});
export default ExchangeRate;
