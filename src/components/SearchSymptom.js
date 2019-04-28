import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { ListItem, SearchBar } from 'react-native-elements';

export default class SearchSymptom extends React.Component {
  state = {
    search: '',
    loading: false,
    data: [],
    error: null,
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  updateSearch(text) {
    this.setState({search: text});

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
    });
  }

  renderHeader() {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.updateSearch(text)}
        autoCorrect={false}
        value={this.state.search}
      />
    );
  }

  renderItem(item) {
    return (
      <ListItem
        title={item.name.first}
        subtitle={item.name.last}
        leftAvatar={{ source: { uri: item.picture.thumbnail } }}

      />
    );
  } 

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader()}
        />
      </View>
    );
  }
}
