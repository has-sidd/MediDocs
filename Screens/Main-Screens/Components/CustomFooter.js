import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CustomFooter = ({imageIndex}) => {
  const [isDownloadPressed, setIsDownloadPressed] = useState(false);
  const handleDownload = () => {
    setIsDownloadPressed(true);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {/* <AntDesign
          style={{marginBottom: 10, paddingHorizontal: 20}}
          name="download"
          size={30}
          color={'#fff'}
          onPress={handleDownload}
        /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        {/* <Icon
          style={{marginBottom: 10, paddingHorizontal: 20}}
          name="share-outline"
          size={30}
          color={'#fff'}
          onPress={handleDownload}
        /> */}
      </TouchableOpacity>

      {isDownloadPressed && (
        <ActivityIndicator style={styles.activity} size="small" color="white" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  activity: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomFooter;
