import React, {useState} from 'react';
import { View, Text, StyleSheet ,TouchableOpacity, TextInput,FlatList, } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';


async function getData() {
    const listCurrency = ['USD','CNY','EUR','AUD','SGD','JPY','GBP','CHF'];
    const listCurrencyUpdate =[''];
        try {
            console.log('-------------------start request----------------------');
          const response = await axios.get(
            'https://v6.exchangerate-api.com/v6/c5025aa66454926be950d407/latest/VND',
          );
            // console.log('USD :'+ response.data.conversion_rates.USD);
            // console.log('JPY :'+ response.data.conversion_rates.JPY);
            // listCurrency.forEach(item => {
            //     // listCurrencyUpdate.push(response.data.conversion_rates.element);
            //     console.log(response.data.conversion_rates.item)
            // });
            var result = response.data.conversion_rates;
            for (const item in result) {
                if(listCurrency.includes(item))
                    console.log(item,result[item]);
                }
        } catch (error) {
          // handle error
          console.log(error.message);
        }
    console.log('-------------------end request --------------------------------');
      };

const ExchangeRate = () => {
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items, setItems] = useState([
        {label: 'VND: Việt Nam đồng', value: 'VND'},
        {label: 'USD: Đô la Mỹ', value: 'USD'},
        {label: 'CNY: Nhân dân tệ', value: 'CNY'},
        {label: 'EUR: Euro', value: 'EUR'},
        {label: 'AUD: Đô la Úc', value: 'AUD'},
        {label: 'SGD: Đô la Singapore', value: 'SGD'},
        {label: 'JPY: Yên', value: 'JPY'},
        {label: 'GBP: Bảng Anh', value: 'GBP'},
        {label: 'CHF: Đồng Franc Thụy Sĩ ', value: 'CHF'},
    ]);
    const [valueInput,setValueInput]= useState();
    const [valueOutput,setValueOutput]= useState();  
    const[listCurrencyValue,setListCurrencyValue]= useState([]);
    const[listCurrencyName, setListCurrencyName]= useState([]);

    const showExchangeRate = () => {
        const listCurrency = ['USD','CNY','EUR','AUD','SGD','JPY','GBP','CHF'];
        listCurrency.forEach(element => {
            exchangeRateForShow(element,'VND');

        }); 
    };
    
    const exchangeRateForShow = (fromCurrency,toCurrency) => {
        let url ='https://v6.exchangerate-api.com/v6/c5025aa66454926be950d407/latest/'+fromCurrency;
        getData();
        async function getData() {
            try {
                console.log('-------------------start request----------------------');
              const response = await axios.get(url,);
            var result = response.data.conversion_rates;
                for (const item in result) {
                    if(item === toCurrency){               
                         console.log(fromCurrency +':'+item,result[item]);
                         setListCurrencyValue(listCurrencyValue => [...listCurrencyValue, result[item]]);
                         setListCurrencyName(listCurrencyName => [...listCurrencyName, fromCurrency]);
                        };
                    }
            } catch (error) {
              // handle error
              console.log(error.message);
            }
        console.log('-------------------end request ------------------------');
          };
    };

    const exchangeRate = (fromCurrency,toCurrency) => {
        let url ='https://v6.exchangerate-api.com/v6/c5025aa66454926be950d407/latest/'+fromCurrency;
        getData();
        async function getData() {
            try {
                console.log('-------------------start request----------------------');
              const response = await axios.get(url,);
            var result = response.data.conversion_rates;
                for (const item in result) {
                    if(item === toCurrency){               
                         console.log(fromCurrency +':'+item,result[item]);
                         let a =valueInput * result[item];
                         setValueOutput(a.toFixed(0));
                        };
                    }
            } catch (error) {
              // handle error
              console.log(error.message);
            }
        console.log('-------------------end request ------------------------');
          };
    };


    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <DropDownPicker
                        open={open1}
                        value={value1}
                        items={items}
                        setOpen={setOpen1}
                        setValue={setValue1}
                        setItems={setItems}
                        maxHeight={250}
                        // style={styles.picker}
                        // containerStyle={styles.containerPicker}
                        // textStyle={styles.textPiker}
                        // placeholder="Từ"
                        // listItemContainer={styles.itemPicker}
                        zIndex={2000}
                        zIndexInverse={2000}
                        // listItemLabelStyle={styles.listItemPicker}
                        onOpen={() => {setOpen2(false)}}
                    />
                <TextInput
                 placeholder="Nhập số tiền"
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
            </View>

            <View style={styles.body}>
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
                        placeholder="Sang"
                        zIndex={1000}
                        zIndexInverse={3000}
                        listItemLabelStyle={styles.listItemPicker}
                        onOpen={() => {setOpen1(false)}}
                    />
            </View>
            <Text>{valueInput} {value1} = {valueOutput} {value2}</Text>  
            <TouchableOpacity style={styles.touch} onPress={() =>exchangeRate(value1,value2)}><Text>Chuyển đổi</Text></TouchableOpacity>
            {/* <TouchableOpacity style={styles.touch} onPress={() =>getData()}><Text>start</Text></TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={() =>showExchangeRate()}><Text>test2</Text></TouchableOpacity> */}
            {/* <Text>Name: {listCurrencyName}</Text>
            <Text>Value: {listCurrencyValue}</Text> */}
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    body:{
    },
    touch: {
        margin: 10,
        width: 60,
        height: 30,
        backgroundColor: 'white',
        borderWidth:1,
    },
    picker: {
        backgroundColor: '#4169e1',    
        borderRadius: 30,
        borderWidth: 0,
    },
    containerPicker:{
        width: '70%',
    },
    textPiker:{
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
    listItemPicker:{
        color :"white",
        backgroundColor: '#4169e1',
        width: '100%',
        height: '98%',
        borderRadius: 20,
    },
    
});
export default ExchangeRate;
