/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from '../../Api/Globals';
import buttons from '../../Api/buttonsApi';
import logout from '../../Assets/logout-30.png';
import DashButton from './Components/DashButton';
import FloatingButton from './Components/FloatingButton';
import Popup from './Components/Popup';

const Dashboard = ({navigation}) => {
  const initialState = {
    scannedImage: undefined,
    valid: true,
    readings: undefined,
    name: '',
  };
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const [scannedImage, setScannedImage] = useState(initialState.scannedImage);
  const [readings, setReadings] = useState(initialState.readings);
  const [valid, setValid] = useState(initialState.valid);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(initialState.name);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScannedImage(initialState.scannedImage);
      setReadings(initialState.readings);
      setValid(initialState.valid);
      setName(initialState.name);
    });
    return unsubscribe;
  }, [navigation]);

  const saveToDatabase = async report => {
    try {
      const response = await fetch(`${BASE_URL}/store_medical_data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);
      console.log('HTTP Status Code:', response.status);
      if (response.success === false) {
        throw new Error(
          'Unique error message: ' + responseData.message ||
            'Failed to save report to database.',
        );
      }
      console.log(
        'Report saved to database successfully:',
        responseData.message,
      );
    } catch (error) {
      console.error('Error saving report to database:', error);
    }
  };

  // const saveHandler = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/save_report`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: name,
  //         image: scannedImage,
  //       }),
  //     });

  //     const responseData = await response.json();
  //     console.log('Response:', responseData);
  //     if (responseData.success === false) {
  //       throw new Error(responseData.message || 'Failed to save report.');
  //     }
  //     await saveToDatabase(readings);
  //     console.log('Success', 'Report saved successfully!');
  //     // setReportName('');
  //     // setImageBase64(null);
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to save report. Please try again.');
  //     console.error('Error saving report:', error);
  //   }
  //   closeHandler();
  // };

  const saveHandler = async () => {
    const currentReport = {
      name: name,
      date: `${date}/${month}/${year}`,
      image: scannedImage,
    };

    try {
      const existingData = await AsyncStorage.getItem('reports');
      const reports = existingData ? JSON.parse(existingData) : [];
      reports.push(currentReport);
      await AsyncStorage.setItem('reports', JSON.stringify(reports));
      await saveToDatabase(readings);
    } catch (error) {
      console.error('Error storing report data:', error);
    }
    closeHandler();
  };

  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Token cleared!');
    } catch (error) {
      console.error('Failed to clear token from AsyncStorage:', error);
    }
  };

  const logoutUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token);
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        clearToken();
        navigation.replace('Login');
        console.log('User logged out successfully:', response.data);
      } else {
        console.log('User not logged out:', response.data);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const SenderHandler = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}/Ocr`,
        data: JSON.stringify({data: scannedImage}),
        config: {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      });

      // Set the response data in state
      setValid(response.data.success);

      if (valid) {
        console.log('Response:', response.data.tokens);
        const convertedData = convertResponseToArray(response.data.tokens);
        console.log('Converted data:', convertedData);

        setReadings(convertedData);
      } else {
        setReadings(initialState.readings);
      }
    } catch (error) {
      console.log('Error occurred while sending image to backend:', error);
      setValid(false);
    }
    setModalVisible(true);
  };

  const convertResponseToArray = response => {
    return Object.entries(response).map(([key, value]) => ({
      key: key,
      value: value,
    }));
  };

  // const scanDocument = async () => {
  //   // prompt user to accept camera permission request if they haven't already
  //   if (
  //     Platform.OS === 'android' &&
  //     (await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //     )) !== PermissionsAndroid.RESULTS.GRANTED
  //   ) {
  //     Alert.alert(
  //       'Error',
  //       'User must grant camera permissions to use document scanner.',
  //     );
  //     return;
  //   }

  //   // start the document scanner
  //   const {scannedImages} = await DocumentScanner.scanDocument({
  //     responseType: 'base64',
  //   });

  //   // get back an array with scanned image file paths
  //   if (scannedImages.length > 0) {
  //     // set the img src, so we can view the first scanned image
  //     const base64Icon = `data:image/jpg;base64,${scannedImages[0]}`;
  //     setScannedImage(base64Icon);
  //     console.log('before F', scannedImage);
  //     SenderHandler();
  //   }
  // };

  const handleKeyChange = (index, newKey) => {
    setReadings(prevData => {
      const newData = [...prevData];
      newData[index].key = newKey;
      return newData;
    });
  };

  const handleValueChange = (index, newValue) => {
    setReadings(prevData => {
      const newData = [...prevData];
      newData[index].value = newValue;
      return newData;
    });
  };

  const closeHandler = () => {
    setModalVisible(!modalVisible);
    setValid(initialState.valid);
    setName(initialState.name);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Pressable onPress={logoutUser} style={styles.logoutContainer}>
          <Image source={logout} style={styles.logout} />
        </Pressable>
        <View style={styles.header}>
          <Text style={styles.heading}>My Dashboard</Text>
        </View>
        <Text styles={styles.datetxt}>{`${date}/${month}/${year}`}</Text>
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.9, y: 0}}
        colors={['#15569660', '#8DA0AD8D', '#8DA0AD00']}
        style={styles.linearGradient}>
        <View style={styles.buttonContainer}>
          {buttons.map(item => (
            <DashButton
              key={item.id}
              title={item.title}
              icon={item.icon}
              screen={item.screen}
              navigation={navigation}
            />
          ))}
        </View>
        <View style={styles.floatingBtn}>
          <FloatingButton
            // scanDocument={() => scanDocument()}
            setScannedImage={setScannedImage}
            SenderHandler={SenderHandler}
          />
        </View>
      </LinearGradient>
      <Popup
        modalVisible={modalVisible}
        scannedImage={scannedImage}
        readings={readings}
        handleKeyChange={handleKeyChange}
        handleValueChange={handleValueChange}
        setName={setName}
        closeHandler={() => closeHandler()}
        valid={valid}
        saveHandler={() => saveHandler()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BC43C659',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  LogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  datetxt: {
    fontSize: 38,
    color: '#fff',
  },
  linearGradient: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20,
  },
  logout: {
    width: 25,
    height: 25,
  },
  logoutContainer: {
    backgroundColor: '#BC43C659',
    borderRadius: 50,
    padding: 6,
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      elevation: 5,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  },
});

export default Dashboard;
