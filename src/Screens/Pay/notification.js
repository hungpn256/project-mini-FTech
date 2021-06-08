import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const PayNotification = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewHeader}>
        <Entypo name="bell" size={30} color="#2E86C1" />
        <Text style={styles.textHeader}>Thông báo</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>
          With flat design, Material design and web safe color charts you're
          sure to find the perfect color scheme for your website or app – just
          keep hunting!
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>
          With flat design, Material design and web safe color charts you're
          sure to find the perfect color scheme for your website or app – just
          keep hunting!
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>
          With flat design, Material design and web safe color charts you're
          sure to find the perfect color scheme for your website or app – just
          keep hunting!
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>
          With flat design, Material design and web safe color charts you're
          sure to find the perfect color scheme for your website or app – just
          keep hunting!
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>
          With flat design, Material design and web safe color charts you're
          sure to find the perfect color scheme for your website or app – just
          keep hunting!
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>
          With flat design, Material design and web safe color charts you're
          sure to find the perfect color scheme for your website or app – just
          keep hunting!
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>
          With flat design, Material design and web safe color charts you're
          sure to find the perfect color scheme for your website or app – just
          keep hunting!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    flex: 1,
    marginTop: '3%',
    marginLeft: '3%',
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86C1',
  },
  view: {
    padding: '2%',
    backgroundColor: '#fff',
    borderRadius: 5,
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    // shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 18,
  },
  text: {color: '#2E86C1', fontSize: 16},
});
export default PayNotification;
