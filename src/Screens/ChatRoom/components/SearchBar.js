import React from 'react';
import {Searchbar} from 'react-native-paper';

const SearchBar = ({txtSearch, setTxtSearch, reff}) => {
  return (
    <Searchbar
      value={txtSearch}
      onChangeText={text => {
        setTxtSearch(text);
      }}
      ref={reff || null}
      placeholder="Search"
      style={{
        marginTop: 10,
        backgroundColor: '#dcdcdc',
        marginHorizontal: 15,
        borderRadius: 20,
      }}
    />
  );
};

export default SearchBar;
