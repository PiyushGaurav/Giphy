import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import giphyServer from '../api/giphyServer';
import {
  fetchGIFRequest,
  fetchGIFSuccess,
  fetchGIFFailure,
} from './../redux/reducers/GIFActions';
import ProgressiveImage from '../components/ProgressiveImage';
import NoDataView from '../components/NoDataView';
import DeviceHelper from '../utils/DeviceHelper';
import shadow from '../utils/shadow';

const {width} = Dimensions.get('window');

const SearchScreen = () => {
  const {loading, error} = useSelector(state => state.gifs);
  const [term, updateTerm] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  const dispatch = useDispatch();
  const limit = 20;

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log('debounce');
      searchGIFs();
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [term]);

  const searchGIFs = async () => {
    dispatch(fetchGIFRequest());

    try {
      const res = await giphyServer.get('/search', {
        params: {
          q: term,
          limit: limit,
          offset: 0,
        },
      });
      console.log(res.data.data);
      setSearchedData(res.data.data);
      dispatch(fetchGIFSuccess([]));
    } catch (error) {
      dispatch(fetchGIFFailure(error.message));
    }
  };

  const renderGif = item => {
    return (
      <ProgressiveImage
        thumbnailSource={{
          uri: item.images.fixed_height_small_still.url,
        }}
        source={{uri: item.images.fixed_height_small.url}}
        style={{
          width: '100%',
          height: 200,
        }}
        resizeMode="cover"
      />
    );
  };

  const renderGifList = () => {
    return (
      <View style={{width, marginVertical: 20, paddingBottom: 40}}>
        <FlatList
          data={searchedData}
          keyExtractor={item => item.id + `${Math.random(9999)}`}
          renderItem={({item}) => renderGif(item)}
        />
      </View>
    );
  };

  const renderSpinner = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="black" />
        <Text>Searching for GIF...</Text>
      </View>
    );
  };

  const onChangeText = text => {
    updateTerm(text);
  };

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
    <View style={styles.container}>
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
      {!searchedData.length ? <NoDataView term={term} /> : renderGifList()}
    </View>
  );
};

export default SearchScreen;

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
