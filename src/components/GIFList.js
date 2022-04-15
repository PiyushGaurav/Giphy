import React from 'react';
import {
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../utils/Colors';
import ProgressiveImage from './ProgressiveImage';

const {width} = Dimensions.get('window');

const renderGif = item => {
  return (
    <ProgressiveImage
      thumbnailSource={{
        uri: item.images.fixed_height_still.url,
      }}
      source={{uri: item.images.fixed_height.url}}
      style={{
        width: '100%',
        height: 200,
      }}
      resizeMode="cover"
    />
  );
};

const renderGifList = ({searchedData, handleLoadMore, handleRefresh}) => {
  const {loading, error} = useSelector(state => state.gifs);
  const renderSpinner = () => {
    return (
      <View style={styles.footerSpinnerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  };
  return (
    <View style={{width, marginTop: 60}}>
      <FlatList
        data={searchedData}
        keyExtractor={item => item.id + `${Math.random(9999)}`}
        renderItem={({item}) => renderGif(item)}
        refreshing={loading}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderSpinner}
      />
    </View>
  );
};

export default renderGifList;

const styles = StyleSheet.create({
  footerSpinnerContainer: {
    width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
