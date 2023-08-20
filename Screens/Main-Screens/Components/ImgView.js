import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView, {ImageFooter} from 'react-native-image-viewing';
import CustomFooter from './CustomFooter';

const ImgView = ({image, imageViewer, setImageViewer}) => {
  return (
    <ImageView
      images={[{uri: image ? image : null}]}
      //   imageIndex={image ? image.id : null}
      visible={imageViewer}
      onRequestClose={() => setImageViewer(false)}
      //   FooterComponent={({imageIndex}) => (
      //     <CustomFooter imageIndex={imageIndex} />
      //   )}
    />
  );
};

export default ImgView;
