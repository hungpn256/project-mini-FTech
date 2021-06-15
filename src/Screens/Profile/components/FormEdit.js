import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {PROFILE_CHANGE_STATE, UPDATE_ME} from '../constants';
import styles from '../styles';
export default function formEdit() {
  const user = useSelector(state => state.profile.user);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user?.gender ?? 0);
  console.log(gender, 'gender');
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.dateOfBirth ?? new Date().toString(),
  );
  console.log(dateOfBirth, 'gender');
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <Text style={styles.titleEditModal}>Edit profile</Text>
        <Pressable
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            padding: 10,
            // backgroundColor: '#1777F2',
          }}
          onPress={() => {
            console.log(name, gender, dateOfBirth);
            dispatch({
              type: UPDATE_ME,
              payload: {name, gender, dateOfBirth},
            });
          }}>
          <Text style={{color: '#1777F2', fontWeight: 'bold', fontSize: 16}}>
            Done
          </Text>
        </Pressable>
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>Gender:</Text>
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={value => {
            setGender(value);
          }}>
          <Picker.Item label="Male" value={0} />
          <Picker.Item label="Female" value={1} />
          <Picker.Item label="Other" value={2} />
        </Picker>
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>Date of Birth:</Text>
        <DatePicker
          mode="date"
          date={moment(dateOfBirth)}
          onDateChange={value => {
            setDateOfBirth(value.toString());
          }}
        />
      </View>
    </View>
  );
}
