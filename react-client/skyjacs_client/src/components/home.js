import React from 'react';
import { Image, ScrollView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { material, sanFranciscoWeights } from 'react-native-typography';
import IP_ADDRESES from './constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    height: 300,
    padding: 10,
    borderRadius: 5,
  },
  headerContainer: {
    paddingBottom: 5,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  footerContainer: {
    paddingTop: 10,
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
          <View style={{ paddingBottom: 15 }}>
            <Text style={[material.headline, sanFranciscoWeights.semibold]}>Recent History</Text>
          </View>
          <View style={styles.itemContainer}>

            <View style={styles.headerContainer}>
              <Text style={[material.subheading, sanFranciscoWeights.medium]}>Header</Text>
              <Text style={[material.subheading, sanFranciscoWeights.thin]}>Date</Text>
            </View>
            <Image
              style={styles.image}
              source={require('../images/shoe_images/adidas_ultra_boost.jpeg')}
            />
            <View style={styles.footerContainer}>
              <Text style={[material.subheading, sanFranciscoWeights.thin]}>Short Description</Text>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}