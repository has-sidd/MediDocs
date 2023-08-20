import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DashButton = ({title, icon, screen, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <View style={styles.buttons}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.btntxtcont}>
          <Text style={styles.btnText}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#BC43C6',
    margin: 10,
    width: 150,
  },
  icon: {
    width: 40,
    height: 40,
  },
  btnText: {
    fontSize: 14,
    color: '#BC43C6',
  },
  btntxtcont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashButton;
