import React from 'react';
import DeviceHelper from '../utils/DeviceHelper';
import shadow from '../utils/Shadow';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Image,
  Platform,
} from 'react-native';
import Colors from '../utils/Colors';
import Strings from '../utils/Strings';

const {width} = Dimensions.get('window');

const HeaderWithSearch = ({onChangeText, term, searchGIFs}) => {
  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInputStyle}
          placeholderTextColor={Colors.lightGrey}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={onChangeText}
          value={term}
          maxLength={25}
          placeholder={Strings.searchPlaceholder}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            Keyboard.dismiss();
            searchGIFs();
          }}
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
    return <Text style={styles.titleStyle}>{Strings.appTitle}</Text>;
  };
  return (
    <View
      style={{
        height:
          (Platform.OS == 'ios' ? 110 : 120) +
          DeviceHelper.getStatusBarHeight(),
        paddingTop: DeviceHelper.getStatusBarHeight(),
        backgroundColor: Colors.primary,
        ...shadow,
      }}>
      {renderTitle()}
      {renderSearchBar()}
    </View>
  );
};

export default HeaderWithSearch;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  titleStyle: {
    marginLeft: 30,
    fontSize: 60,
    fontWeight: '800',
    color: Colors.secondary,
  },
  textInputStyle: {
    flex: 1,
    width: '40%',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.pink,
    height: 60,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    ...shadow,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 0,
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: Colors.primary,
    backgroundColor: Colors.pink,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 40,
    height: 40,
  },
});
