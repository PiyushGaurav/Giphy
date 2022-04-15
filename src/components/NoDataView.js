import React from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../utils/Colors';
import Strings from '../utils/Strings';

const NoDataView = ({term}) => {
  const {loading, error} = useSelector(state => state.gifs);

  const renderSpinner = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.textStyle}>{Strings.searching}</Text>
      </View>
    );
  };

  if (loading && term) {
    return renderSpinner();
  }
  return (
    <View style={styles.container}>
      {!term ? (
        <View style={{alignItems: 'center', height: 200}}>
          <Image style={styles.icon} source={require('../assets/gif.png')} />
        </View>
      ) : (
        <Image style={styles.icon} source={require('../assets/noData.png')} />
      )}
    </View>
  );
};

export default NoDataView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  textStyle: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: '800',
  },
});
