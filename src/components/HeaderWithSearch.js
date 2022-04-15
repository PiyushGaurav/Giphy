import React from 'react';
import DeviceHelper from '../utils/DeviceHelper';
import shadow from '../utils/shadow';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');

const HeaderWithSearch = ({onChangeText, term, searchGIFs}) => {
  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor="white"
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={onChangeText}
          value={term}
          placeholder="Search for GIF"
        />
        <TouchableOpacity
          onPress={() => searchGIFs()}
          style={styles.searchIconContainer}>
          <Image
            style={styles.searchIcon}
            source={require('./../assets/search.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <Text
        style={{
          marginLeft: 30,
          fontSize: 60,
          fontWeight: '800',
        }}>
        Giffy
      </Text>
    );
  };
  return (
    <View
      style={{
        height: 150 + DeviceHelper.getStatusBarHeight(),
        paddingTop: DeviceHelper.getStatusBarHeight(),
        backgroundColor: 'yellow',
        ...shadow,
      }}>
      {renderTitle()}
      {renderSearchBar()}
    </View>
  );
};

export default HeaderWithSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#feffb3',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  textInputStyle: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'red',
    height: 60,
    borderRadius: 30,
    padding: 15,
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    ...shadow,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 0,
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: 'yellow',
    backgroundColor: 'red',
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 40,
    height: 40,
  },
});
