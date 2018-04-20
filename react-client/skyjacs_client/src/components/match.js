import React from 'react';
import { Image, TouchableOpacity, ScrollView, View, Text, StyleSheet } from 'react-native';
import IP_ADDRESS from './constants';

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'yellow',
    marginBottom: 10,
    padding: 3,
    color: '#fff',
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    height: 150,
    margin: 5,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  textContainer: {
    flex: 2,
    // justifyContent: 'center',
    margin: 3,
    backgroundColor: 'purple',
  },
  percentContainer: {
    borderRadius: 100/2,
    position: 'absolute',
    zIndex: 0,
    right: 0,
    backgroundColor: 'blue',
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
      <ScrollView> {
        this.state.dataSource.map(dataItem => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Detail', dataItem)}
          >
            <View style={styles.itemContainer}>
              <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri : imageUri }}
                  />
                </View>
                <View key={dataItem.uid} style={styles.textContainer}>
                  <Text>
                    Title: Lorem Ipsum
                  </Text>
                  <Text>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                     consectetur, adipisci velit...
                  </Text>
                </View>
              </View>
              <View style={styles.percentContainer}>
                <Text>
                  Match Percentage: {dataItem.item_matching}%
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