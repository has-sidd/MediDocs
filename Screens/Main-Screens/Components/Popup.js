/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Popup = ({
  modalVisible,
  scannedImage,
  readings,
  handleKeyChange,
  handleValueChange,
  setName,
  closeHandler,
  valid,
  saveHandler,
}) => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {valid && readings !== undefined && readings.length > 0 ? (
            <>
              <Text style={styles.modalText}>Confirmation!</Text>
              <Text>{`${date}/${month}/${year}`}</Text>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.imgName}>Report Name:</Text>
                  <TextInput
                    style={[styles.input, styles.keyInput]}
                    onChangeText={e => setName(e)}
                  />
                </View>
                <Image
                  source={{uri: scannedImage ? scannedImage : null}}
                  style={styles.agendaImage}
                />
              </View>

              <ScrollView style={styles.modalcontainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text>Test Name</Text>
                  <Text>Result</Text>
                </View>
                {readings.map(({key, value}, index) => (
                  <View key={index} style={styles.row}>
                    <TextInput
                      style={[styles.input, styles.keyInput]}
                      value={key}
                      onChangeText={newKey => handleKeyChange(index, newKey)}
                    />
                    <TextInput
                      style={[styles.input, styles.valueInput]}
                      value={String(value)}
                      onChangeText={newValue =>
                        handleValueChange(index, newValue)
                      }
                    />
                  </View>
                ))}
              </ScrollView>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Pressable
                  style={[styles.Modalbutton, styles.buttonClose]}
                  onPress={closeHandler}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
                <Pressable
                  style={[styles.Modalbutton, styles.buttonClose]}
                  onPress={() => saveHandler()}>
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text style={{fontSize: 15, color: 'red', marginBottom: 20}}>
                Please Re-Scan image!
              </Text>
              <Pressable
                style={[styles.Modalbutton, styles.buttonClose]}
                onPress={closeHandler}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 350,
    minHeight: 200,
    // maxHeight: 600,
    height: '70%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Modalbutton: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#155696',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#BC43C6',
    marginVertical: 10,
    fontSize: 20,
  },
  agendaImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginVertical: 10,
  },
  modalcontainer: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    // borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#dcdde1',
  },
  keyInput: {
    marginRight: 10,
    width: 150,
  },
  valueInput: {
    width: 100,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  datetxt: {
    fontSize: 60,
    color: '#fff',
  },
});

export default Popup;
