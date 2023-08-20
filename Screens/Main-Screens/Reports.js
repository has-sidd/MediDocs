/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Row, Table} from 'react-native-table-component';
import {BASE_URL} from '../../Api/Globals';
import Header from './Components/Header';
import ImgView from './Components/ImgView';

const Reports = ({navigation}) => {
  const [reports, setReports] = useState([]);
  const [imageViewer, setImageViewer] = useState(false);
  const [image, setImage] = useState();

  const data = {
    tableHead: ['Title', 'Date', 'Image', ''],
  };

  useEffect(() => {
    loadData();
    // fetchReportsFromDatabase();
  }, []);

  const fetchReportsFromDatabase = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get_reports`, {
        method: 'GET',
        headers: {
          // Add any required headers, e.g., authentication headers
        },
      });

      const responseData = await response.json();
      if (responseData.success === false) {
        throw new Error(
          responseData.message || 'Failed to fetch reports from database.',
        );
      }

      setReports(responseData.reports);
    } catch (error) {
      console.error('Error fetching reports from database:', error);
    }
  };

  const loadData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('reports');
      if (!jsonData) {
        console.log('No reports found in AsyncStorage.');
        return;
      }
      const loadedReports = JSON.parse(jsonData).filter(
        report => report !== null,
      );

      setReports(loadedReports);
    } catch (error) {
      console.error('Error retrieving report data:', error);
    }
  };

  // const deleteReport = async reportId => {
  //   console.log('Deleting report with ID:', reportId);
  //   try {
  //     const response = await fetch(`${BASE_URL}/delete_report/${reportId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Add any other headers, e.g., authentication headers
  //       },
  //     });

  //     const responseData = await response.json();
  //     if (responseData.success === false) {
  //       throw new Error(responseData.message || 'Failed to delete report.');
  //     }

  //     console.log('Success', 'Report deleted successfully!');
  //     // Refresh your reports list after deletion
  //     fetchReportsFromDatabase();
  //   } catch (error) {
  //     console.log('Error', 'Failed to delete report. Please try again.');
  //     console.error('Error deleting report:', error);
  //   }
  // };

  const deleteReport = async index => {
    try {
      const updatedReports = [...reports];
      updatedReports.splice(index, 1);
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
      setReports(updatedReports);
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handlePress = item => {
    setImage(item);
    setImageViewer(true);
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Header navigation={navigation} title="My Reports" color="#BC43C6DB" />
        <View style={styles.container}>
          <Table>
            <Row
              data={data.tableHead}
              style={styles.head}
              textStyle={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            />
            {reports &&
              reports.map((report, index) => (
                <Row
                  textStyle={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                  key={index}
                  data={[
                    report.name,
                    report.date,
                    <Pressable
                      onPress={() => handlePress(report.image)}
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Image
                        style={styles.Image}
                        source={{uri: report.image}}
                      />
                    </Pressable>,

                    <Pressable
                      style={styles.button}
                      onPress={() => deleteReport(report.id)}>
                      <Text style={{textAlign: 'center', color: '#fff'}}>
                        Delete
                      </Text>
                    </Pressable>,
                  ]}
                />
              ))}
          </Table>
          <ImgView
            image={image}
            imageViewer={imageViewer}
            setImageViewer={() => setImageViewer()}
          />
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
    backgroundColor: '#BC43C659',
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

export default Reports;
