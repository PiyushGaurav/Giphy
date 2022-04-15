import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import giphyServer from '../api/giphyServer';
import {
  fetchGIFRequest,
  fetchGIFSuccess,
  fetchGIFFailure,
} from './../redux/reducers/GIFActions';
import NoDataView from '../components/NoDataView';
import GIFList from '../components/GIFList';
import HeaderWithSearch from '../components/HeaderWithSearch';
import Colors from '../utils/Colors';

const SearchScreen = () => {
  const [term, updateTerm] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const [page, updatePage] = useState(1);

  const dispatch = useDispatch();
  const limit = 10;

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchGIFs();
    }, 100);
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
      setSearchedData(res.data.data);
      dispatch(fetchGIFSuccess([]));
    } catch (error) {
      dispatch(fetchGIFFailure(error.message));
    }
  };

  const loadMoreGIFs = async (page = 0) => {
    dispatch(fetchGIFRequest());
    try {
      const res = await giphyServer.get('/search', {
        params: {
          q: term,
          limit: limit,
          offset: page * limit,
        },
      });
      setSearchedData([...searchedData, ...res.data.data]);
      dispatch(fetchGIFSuccess([]));
    } catch (error) {
      dispatch(fetchGIFFailure(error.message));
    }
  };

  const handleRefresh = () => {
    updatePage(1);
    searchGIFs();
  };

  const handleLoadMore = () => {
    loadMoreGIFs(page);
    updatePage(prevState => {
      return prevState + 1;
    });
  };

  const onChangeText = text => {
    updateTerm(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.primary}
        barStyle="dark-content"
      />
      <HeaderWithSearch
        onChangeText={onChangeText}
        term={term}
        searchGIFs={searchGIFs}
      />
      {!searchedData.length ? (
        <NoDataView term={term} />
      ) : (
        <GIFList
          searchedData={searchedData}
          handleRefresh={handleRefresh}
          handleLoadMore={handleLoadMore}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});
