import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import loginPic from '../../Assets/loginPic.png';

const Initial = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.LogoContainer}>
          <Image style={styles.Logo} source={loginPic} />
          <Text style={styles.heading}>Welcome!</Text>
          <Text styles={styles.subheading}>
            Easy and reliable way to store all your medical reports.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.button}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
  },
  LogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 60,
    borderRadius: 40,
  },
  heading: {
    fontSize: 22,
    color: '#000',
  },
  subheading: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B7DBFF',
  },
  button: {
    backgroundColor: '#155696',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    padding: 10,
  },
});

export default Initial;
