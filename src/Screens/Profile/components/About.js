import React from 'react';
import {List} from 'react-native-paper';

export default function About() {
  return (
    <List.Section>
      <List.Subheader>Giới thiệu chung</List.Subheader>
      <List.Item
        title="Họ và tên"
        description="Phạm Năng Hưng"
        left={() => (
          <List.Icon
            style={{backgroundColor: '#777', borderRadius: 999}}
            color="#fff"
            icon="account"
          />
        )}
      />
      <List.Item
        title="Giới tính"
        description="Nam"
        left={() => (
          <List.Icon
            style={{backgroundColor: '#777', borderRadius: 999}}
            color="#fff"
            icon="gender-male-female"
          />
        )}
      />
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
    </List.Section>
  );
}
