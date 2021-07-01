import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../Components/Loading';
import {PROFILE_CHANGE_STATE, UPDATE_ME} from '../constants';
import styles from '../styles';
import FButton from '../../../Components/TouchOpacity/index';
export default function FormEdit({navigation}) {
  const user = useSelector(state => state.auth.user);
  const updateSuccess = useSelector(state => state.profile.updateSuccess);
  const editing = useSelector(state => state.profile.editing);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user?.gender ?? 0);
  const [dateOfBirth, setDateOfBirth] = useState(
    user.dateOfBirth || new Date().toString(),
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? '');
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (updateSuccess) {
      dispatch({type: PROFILE_CHANGE_STATE, payload: {updateSuccess: false}});
      navigation.goBack();
    }
  }, [updateSuccess]);
  if (editing) {
    return <Loading loading={true} />;
  }
  return (
    <>
      <View style={styleEdit.header}>
        <TouchableOpacity
          style={[styleEdit.arrowBack, {left: 10}]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={23} />
        </TouchableOpacity>
        <Text style={styleEdit.headerText}>Edit profile</Text>
        {/* <Pressable
      style={[styles.arrowBack, {right: 10}]}
      onPress={() => {
        dispatch({
          type: UPDATE_ME,
          payload: {name, gender, dateOfBirth, phoneNumber},
        });
      }}>
      <Text style={styles.textDone}>Done</Text>
    </Pressable> */}
      </View>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{marginTop: 10}}>
          <View style={styleEdit.input}>
            <TextInput
              label="Email"
              mode="outlined"
              outlineColor="#DCDCDC"
              style={styleEdit.TextInput}
              value={user.email}
              editable={false}
            />
          </View>
          <View style={styleEdit.input}>
            <TextInput
              label="Name"
              mode="outlined"
              outlineColor="#DCDCDC"
              value={name}
              style={styleEdit.TextInput}
              onChangeText={setName}
            />
          </View>
          <View style={styleEdit.input}>
            <TextInput
              label="Phone number"
              mode="outlined"
              outlineColor="#DCDCDC"
              keyboardType="numeric"
              value={phoneNumber}
              style={styleEdit.TextInput}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styleEdit.formItem}>
            <Text style={styleEdit.label}>Gender:</Text>
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
          <View style={styleEdit.formItem}>
            <Text style={styleEdit.label}>Date of Birth:</Text>
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
        <View style={{paddingHorizontal: 15}}>
          <FButton
            Name="Submit"
            handlePress={() =>
              dispatch({
                type: UPDATE_ME,
                payload: {name, gender, dateOfBirth, phoneNumber},
              })
            }
          />
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
              onPress={() => setVisibleDatePicker(false)}
            />
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
    </>
  );
}

const styleEdit = StyleSheet.create({
  header: {
    paddingVertical: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
    justifyContent: 'center',
    position: 'relative',
  },
  label: {
    color: '#696969',
    fontSize: 12,
  },
  formItem: {
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 8,
    marginHorizontal: 15,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#F4F4F4',
  },
  headerText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
  arrowBack: {
    padding: 5,
    position: 'absolute',
    top: '50%',
    zIndex: 999,
    left: 0,
    marginLeft: 1,
  },
  TextInput: {
    marginTop: 5,
    paddingHorizontal: 15,
  },
});
