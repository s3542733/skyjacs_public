import React from 'react';
import { AsyncStorage, Image, TouchableOpacity, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { material, sanFranciscoWeights } from 'react-native-typography';
import { IP_ADDRESS, ACCESS_TOKEN, ACCESS_UID, BUYING_UID } from './constants';

/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginBottom: 10,
  },
  contentContainer: {
    margin: 0.1,
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    height: 300,
    backgroundColor: 'white',
  },
  itemHeaderContainer: {
    padding: 5,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textContainer: {
    // justifyContent: 'center',
    padding: 5,
  },
  text: {
    color: 'grey',
  },
  percentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100 / 2,
    position: 'absolute',
    zIndex: 0,
    right: 10,
    top: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
    backgroundColor: 'white',
  },
});

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="md-person"
        type="ionicon"
        color={tintColor}
      />
    ),
  }

  constructor() {
    super();

    this.getMatchData = this.getMatchData.bind(this);
    this.handleViewItemButton = this.handleViewItemButton.bind(this);

    this.state = {
      dataSource: [],
      noMatchError: null,
    };
  }

  async componentDidMount() {
    try {
      uid = await AsyncStorage.getItem(BUYING_UID);
      console.log('getting buying UID for matches: ');
      console.log(uid);
      this.getMatchData(`buyingmatches/${uid}`);
    } catch (error) {
      console.log(error);
    }
  }

  getMatchData(route) {
    AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
      fetch(IP_ADDRESS + route, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          token: token,
        },
      })
        .then(response => (response.json()))
        .then((responseJson) => {
          console.log('RESPONSE');
          console.log(responseJson);
          console.log(JSON.stringify(responseJson));
          this.setState({
            dataSource: responseJson,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  handleViewItemButton(data) {
    console.log(data);
    const historyData = new FormData();
    historyData.append('listing_type', data.listing_type);
    historyData.append('listing_uid', data.uid);

    AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
      fetch(IP_ADDRESS + 'recent/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          token: token,
        },
        body: historyData,
      })
        .then(response => (response.json()))
        .then((responseJson) => {
          console.log('RESPONSE');
          console.log(responseJson);
          this.props.navigation.navigate('Detail', data);  
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  async storeUID(uid) {
    try {
      console.log('storing history uid ' + uid);
      await AsyncStorage.setItem(HISTORY_UID, uid);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { imageUri, dataSource, noMatchError } = this.state;

    if (noMatchError == null) {
      return (
        <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
          <View style={{ paddingBottom: 10 }}>
            <Text style={[material.headline, sanFranciscoWeights.semibold]}>
              ... Matches Found
            </Text>
          </View>
          {
            dataSource.map(dataItem => (
              <TouchableOpacity
                onPress={this.handleViewItemButton(dataItem)}
              >
                <View style={styles.itemContainer}>
                  <View style={styles.contentContainer}>
                    <Image
                      style={styles.image}
                      source={require('../images/shoe_images/adidas_ultra_boost.jpeg')}
                    />
                    <View key={dataItem.uid} style={styles.textContainer}>
                      <Text style={[material.subheading, sanFranciscoWeights.semibold]}>
                        {dataItem.item_brand} {dataItem.item_model}
                      </Text>
                      <View style={{ flexDirection: 'row', padding: 10 }}>
                        <View style={{ paddingRight: 10 }}>
                          <Text style={[material.content, sanFranciscoWeights.thin, styles.text]}>{'\u2022'} {dataItem.item_brand}</Text>
                          <Text style={[material.content, sanFranciscoWeights.thin, styles.text]}>{'\u2022'} {dataItem.item_material}</Text>
                        </View>
                        <View>
                          <Text style={[material.content, sanFranciscoWeights.thin, styles.text]}>{'\u2022'} {dataItem.item_size}</Text>
                          <Text style={[material.content, sanFranciscoWeights.thin, styles.text]}>{'\u2022'} {dataItem.item_condition}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.percentContainer}>
                    <Text>
                      {dataItem.item_matching}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
        <Text style={[material.headline, sanFranciscoWeights.semibold]}> No Matches Found :(</Text>
      </View>
    );
  }
}
