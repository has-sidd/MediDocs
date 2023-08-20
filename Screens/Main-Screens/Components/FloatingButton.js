import React from 'react';
import {
  Alert,
  Animated,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import {launchImageLibrary} from 'react-native-image-picker';
import addBtn from '../../../Assets/add-100.png';
import camera from '../../../Assets/camera-100.png';
import gallery from '../../../Assets/gallery-100.png';

export default class FloatingButton extends React.Component {
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: false,
    }).start();

    this.open = !this.open;
  };

  render() {
    const pinStyle = {
      transform: [
        {scale: this.animation},
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -70],
          }),
        },
      ],
    };

    const thumbStyle = {
      transform: [
        {scale: this.animation},
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -130],
          }),
        },
      ],
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };

    const opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    });

    const selectImageFromGallery = () => {
      const options = {
        mediaType: 'photo',
        includeBase64: true,
      };
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log(response.assets[0].uri);

          // You can now use the chosen image (source) in your state, UI, or upload it to your backend
          this.props.setScannedImage(
            `data:image/jpeg;base64,${response.assets[0].base64}`,
          );
          this.props.SenderHandler();
        }
      });
    };

    const scanDocument = async () => {
      // prompt user to accept camera permission request if they haven't already
      if (
        Platform.OS === 'android' &&
        (await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        )) !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert(
          'Error',
          'User must grant camera permissions to use document scanner.',
        );
        return;
      }

      // start the document scanner
      const {scannedImages} = await DocumentScanner.scanDocument({
        responseType: 'base64',
      });

      // get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        const base64Icon = `data:image/jpg;base64,${scannedImages[0]}`;
        this.props.setScannedImage(base64Icon);
        this.props.SenderHandler();
      }
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={selectImageFromGallery}>
          <Animated.View
            style={[styles.button, styles.secondary, thumbStyle, opacity]}>
            <Image source={gallery} style={styles.icon} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={scanDocument}>
          <Animated.View
            style={[styles.button, styles.secondary, pinStyle, opacity]}>
            <Image source={camera} style={styles.icon} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={(styles.button, styles.menu, rotation)}>
            <Image source={addBtn} style={styles.addBtn} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#BF57B9',
  },
  menu: {
    backgroundColor: '#BC43C6',
  },
  icon: {
    width: 25,
    height: 25,
  },
  addBtn: {
    width: 70,
    height: 70,
  },
});
