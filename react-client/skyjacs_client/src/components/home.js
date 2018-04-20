import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import IP_ADDRESES from './constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch(`${IP_ADDRESES}`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    // loading screen
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.screen}>
        <View>
          <Text>Yo</Text>
        </View>
      </View>
    );
  }
}
