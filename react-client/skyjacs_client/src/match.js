import React from 'react';
import { Image, TouchableOpacity, ScrollView, View, Text, StyleSheet } from 'react-native';
import { material, sanFranciscoWeights } from 'react-native-typography';
import { IP_ADDRESS } from './constants';

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
    right: 4,
    top: 4,
    borderColor: 'grey',
    borderWidth: 0.5,
    backgroundColor: 'white',
  },
});

export default class SignUpScreen extends React.Component {
  state = {
    dataSource: [],
  }

  componentDidMount() {
    fetch(`${IP_ADDRESS}matches/7`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(`${IP_ADDRESS}images/`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          imageSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { imageUri } = this.state;

    return (
      <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
        <View style={{ paddingBottom: 10 }}>
          <Text style={[material.headline, sanFranciscoWeights.semibold]}>123 Matches found</Text>
        </View>
        {
          this.state.dataSource.map(dataItem => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Detail', dataItem)}
            >
              <View style={styles.itemContainer}>
                <View style={styles.contentContainer}>
                  <Image
                    style={styles.image}
                    source={require('./images/shoe_images/adidas_ultra_boost.jpeg')}
                  />
                  <View key={dataItem.uid} style={styles.textContainer}>
                    <Text style={[material.subheading, sanFranciscoWeights.semibold]}>
                      (2018) Shoe Name
                    </Text>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                      <View style={{ paddingRight: 10 }}>
                        <Text style={[material.content, sanFranciscoWeights.thin, styles.text]}>{'\u2022'} Brand</Text>
                        <Text style={[material.content, sanFranciscoWeights.thin, styles.text]}>{'\u2022'} Material</Text>
                      </View>
                      <View>
                        <Text style={[material.content, sanFranciscoWeights.thin, styles.text]}>{'\u2022'} Size</Text>
                        <Text style={[material.content, sanFranciscoWeights.thin, styles.text]}>{'\u2022'} Usage</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.percentContainer}>
                  <Text>
                    100%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    );
  }
}

// Brand: {dataItem.item_brand}{'\n'}
// Type: {dataItem.item_type}{'\n'}
// Model: {dataItem.item_model}{'\n'}
// Gender: {dataItem.item_gender}{'\n'}
// Condition: {dataItem.item_condition}{'\n'}
// Size: {dataItem.item_size}{'\n'}
// Colour: {dataItem.item_colour}{'\n'}
// Material: {dataItem.item_material}{'\n'}