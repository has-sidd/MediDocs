import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import backBtn from '../../../Assets/backBtn.png';

const Header = ({navigation, title, color}) => {
  return (
    <View style={styles.header} backgroundColor={color}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backBtn} style={styles.backbtn} />
      </TouchableOpacity> */}
      <View style={styles.headerTitle}>
        <Text style={styles.heading}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    position: 'relative',
  },
  headerTitle: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  heading: {
    fontSize: 16,
    color: '#000',
  },
  backbtn: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 15,
  },
});

export default Header;
