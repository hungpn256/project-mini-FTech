import React from 'react';
import {List} from 'react-native-paper';
import moment from 'moment';
export default function About({user}) {
  return (
    <List.Section>
      <List.Subheader>Giới thiệu chung</List.Subheader>
      <List.Item
        title="Name"
        description={user.name}
        left={() => (
          <List.Icon
            style={{backgroundColor: '#777', borderRadius: 999}}
            color="#fff"
            icon="account"
          />
        )}
      />
      {user.gender !== -1 && (
        <List.Item
          title="Gender"
          description={
            user.gender === 0 ? 'Male' : user.gender === 1 ? 'Female' : 'Other'
          }
          left={() => (
            <List.Icon
              style={{backgroundColor: '#777', borderRadius: 999}}
              color="#fff"
              icon="gender-male-female"
            />
          )}
        />
      )}
      {user.phoneNumber.length > 0 && (
        <List.Item
          title="Số điện thoại"
          description="0584051516"
          left={() => (
            <List.Icon
              style={{backgroundColor: '#777', borderRadius: 999}}
              color="#fff"
              icon="phone"
            />
          )}
        />
      )}
      {user.dateOfBirth.length > 0 && (
        <List.Item
          title="Date Of Birth"
          description={moment(user.dateOfBirth).format('DD/mm/yyyy')}
          left={() => (
            <List.Icon
              style={{backgroundColor: '#777', borderRadius: 999}}
              color="#fff"
              icon="phone"
            />
          )}
        />
      )}
    </List.Section>
  );
}
