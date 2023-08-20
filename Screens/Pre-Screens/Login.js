/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BASE_URL} from '../../Api/Globals';
import loginPic from '../../Assets/loginPic.png';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [err, seterr] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
        console.log('Token:', token);
        if (token) {
          navigation.replace('Dashboard');
        }
      } catch (e) {
        console.error('Failed to load token.');
      }
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password,
      });
      if (response.data.success) {
        const token = response.data.token;
        AsyncStorage.setItem('userToken', token);
        navigation.replace('Dashboard');
      } else {
        seterr({errorMessage: response.data.message});
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        seterr({errorMessage: error.response.data.message});
      } else if (error.request) {
        // The request was made but no response was received
        seterr({
          errorMessage: 'No response from server. Please try again.',
        });
      } else {
        // Something happened in setting up the request that triggered an error
        seterr({errorMessage: 'Login failed. Please try again.'});
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container} blurRadius={2}>
        <View style={styles.LogoContainer}>
          <Image style={styles.Logo} source={loginPic} blurRadius={2} />
          <Text style={styles.heading}>Welcome!</Text>
          <Text styles={styles.subheading}>
            Easy and reliable way to store all your medical reports.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.input}
          onChangeText={e => setEmail(e)}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={e => setPwd(e)}
          placeholder="Password"
          secureTextEntry={true}
          password={true}
        />
        {err && <Text style={{color: 'red'}}>{err.errorMessage}</Text>}
        <Text style={styles.forgot}>Forgot Password</Text>
        <TouchableOpacity onPress={loginUser} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text>Now to the app?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signup}>Sign Up</Text>
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
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  button: {
    backgroundColor: '#155696',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 6,
    marginVertical: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    padding: 10,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  forgot: {
    textAlign: 'right',
    width: '100%',
    fontSize: 12,
    color: '#155696',
  },
  signup: {
    color: '#155696',
  },
});

export default Login;
