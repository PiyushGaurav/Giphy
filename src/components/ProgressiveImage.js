import React, {useState} from 'react';
import {View, StyleSheet, Animated, ImageBackground} from 'react-native';

export const ProgressiveImage = ({thumbnailSource, source, style}) => {
  const [imageAnimated] = useState(new Animated.Value(0));

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground source={thumbnailSource} style={styles.container}>
      <Animated.Image
        source={source}
        style={[styles.imageOverlay, {opacity: imageAnimated}, style]}
        onLoad={onImageLoad}
      />
    </ImageBackground>
  );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
  imageOverlay: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: 'white',
    margin: '2%',
  },
});
