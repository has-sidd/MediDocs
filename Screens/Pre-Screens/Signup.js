/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from '../../Api/Globals';
import loginPic from '../../Assets/loginPic.png';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [cnic, setCNIC] = useState('');
  const [password, setPassword] = useState('');
  const [err, seterr] = useState(null);

  const registerUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        number,
        cnic,
        password,
      });
      if (response.data.success) {
        navigation.navigate('Login');
      } else {
        seterr(response.data.message);
      }
      console.log('User registered successfully:', response.data);
    } catch (error) {
      seterr('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.9, y: 0}}
        colors={['#15569660', '#8DA0AD8D', '#8DA0AD00']}
        style={styles.linearGradient}>
        <View style={styles.imgBox}>
          <Image style={styles.logo} source={loginPic} />
          <Text style={styles.title}>MediDocs</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.header}>
            <Text style={styles.heading}>Create your Account</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={e => setName(e)}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={e => setEmail(e)}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={e => setNumber(e)}
            placeholder="number"
          />
          <TextInput
            style={styles.input}
            onChangeText={e => setCNIC(e)}
            placeholder="CNIC"
          />
          <TextInput
            style={styles.input}
            onChangeText={e => setPassword(e)}
            placeholder="Password"
          />
          {err && (
            <Text style={{color: 'red', fontSize: 12}}>
              Error registering user!
            </Text>
          )}
          <Text style={styles.forgot}>Forgot Password</Text>
          <TouchableOpacity onPress={registerUser} style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    background: '#8DA0ADA6',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 50,
    paddingVertical: 20,
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
  linearGradient: {
    flex: 1,
  },
  header: {
    marginBottom: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 40,
  },
  heading: {
    fontSize: 18,
    color: '#000',
  },
  imgBox: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 40,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 35,
    color: '#155696',
    fontWeight: 'bold',
    verticalAlign: 'bottom',
  },
});

export default Signup;
