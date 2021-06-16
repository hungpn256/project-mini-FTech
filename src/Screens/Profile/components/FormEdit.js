import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_ME} from '../constants';
import styles from '../styles';
export default function FormEdit({navigation}) {
  const user = useSelector(state => state.auth.user);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user?.gender ?? 0);
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.dateOfBirth ?? new Date().toString(),
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? '');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <TouchableOpacity
          style={[styles.arrowBack, {left: 10}]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.titleEditModal}>Edit profile</Text>
        <Pressable
          style={[styles.arrowBack, {right: 10}]}
          onPress={() => {
            dispatch({
              type: UPDATE_ME,
              payload: {name, gender, dateOfBirth, phoneNumber},
            });
          }}>
          <Text style={styles.textDone}>Done</Text>
        </Pressable>
      </View>
      <View style={{marginTop: 48}}>
        <View style={styles.formItem}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
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
          <Pressable
            style={{flexDirection: 'row', marginTop: 8, marginLeft: 8}}
            onPress={() => {
              setVisibleDatePicker(true);
            }}>
            <Text style={styles.textDate}>
              {moment(dateOfBirth).get('month') + 1}
            </Text>
            <Text style={styles.textDate}>
              {moment(dateOfBirth).get('date')}
            </Text>
            <Text style={styles.textDate}>
              {moment(dateOfBirth).get('year')}
            </Text>
          </Pressable>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={visibleDatePicker}
        onRequestClose={() => {
          setVisibleDatePicker(false);
        }}
        animationType="fade">
        <View style={{flex: 1}}>
          <Pressable
            style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}
            onPress={() => setVisibleDatePicker(false)}></Pressable>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <Pressable onPress={() => setVisibleDatePicker(false)}>
                <Text style={styles.textDone}>Done</Text>
              </Pressable>
            </View>
            <DatePicker
              mode="date"
              date={moment(dateOfBirth)}
              onDateChange={value => {
                setDateOfBirth(value.toString());
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
