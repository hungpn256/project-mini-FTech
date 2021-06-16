import React from 'react';
import {Searchbar} from 'react-native-paper';

const SearchBar = ({txtSearch, setTxtSearch}) => {
  return (
    <Searchbar
      value={txtSearch}
      onChangeText={text => {
        setTxtSearch(text);
      }}
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
