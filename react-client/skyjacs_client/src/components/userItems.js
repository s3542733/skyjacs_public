import React from 'react';
import { AsyncStorage, Image, ScrollView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { material, sanFranciscoWeights } from 'react-native-typography';
import { Icon, Card } from 'react-native-elements';
import { IP_ADDRESS, ACCESS_TOKEN } from './constants';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    height: 300,
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

export default class UserItemsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="md-home"
        type="ionicon"
        color={tintColor}
      />
    ),
  }

  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch(`${IP_ADDRESS}`)
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

  async getToken() {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(`Token: ${token}`);
    } catch (error) {
      console.log('ERROR: failed to get token');
    }
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

    this.getToken();

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
          <View style={{ paddingBottom: 15 }}>
            <Text style={[material.headline, sanFranciscoWeights.semibold]}>My Shoes</Text>
          </View>
          <Card containerStyle={{ margin: 0 }}>
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
                <Text style={[material.subheading, sanFranciscoWeights.thin]}>
                  Short Description
                </Text>
              </View>

            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
