/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Row, Table} from 'react-native-table-component';
import {BASE_URL} from '../../Api/Globals';
import Header from './Components/Header';

const Readings = ({navigation}) => {
  const [readings, setReadings] = useState([]);
  const tableHead = ['Test', 'Result', 'Date'];

  const fetchReadings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get_medical_data`, {});

      if (response.success === false) {
        throw new Error('Failed to fetch readings.');
      }

      const data = await response.json();
      if (data.success && data.medical_data) {
        setReadings(data.medical_data);
      } else {
        console.warn('No medical data received or success flag is false.');
      }
    } catch (error) {
      console.error('Error fetching readings:', error);
    }
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  const computeRowColors = () => {
    let currentColor = '#FFFFFF';
    let lastTerm = null;
    return readings.map(reading => {
      if (reading.term_name !== lastTerm) {
        currentColor = currentColor === '#FFFFFF' ? '#E0E0E0' : '#FFFFFF';
      }
      lastTerm = reading.term_name;
      return currentColor;
    });
  };

  const rowColors = computeRowColors();

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Header navigation={navigation} title="My Readings" color="#155696" />
        <View style={styles.container}>
          <Table>
            <Row
              style={styles.head}
              textStyle={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15,
              }}
              data={tableHead}
            />
            {readings.map((reading, index) => (
              <Row
                key={index}
                data={[reading.term_name, reading.value, reading.timestamp]}
                style={{backgroundColor: rowColors[index]}}
                textStyle={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              />
            ))}
          </Table>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#15569659',
  },
  text: {margin: 6},
  Image: {
    width: 50,
    height: 50,
    margin: 10,
  },
  button: {
    backgroundColor: '#BC43C659',
    color: '#fff',
    borderRadius: 50,
    paddingHorizontal: 0,
    paddingVertical: 6,
    margin: 20,
  },
});

export default Readings;
