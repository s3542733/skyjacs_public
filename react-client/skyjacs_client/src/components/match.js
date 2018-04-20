import React from 'react';
import { Image, TouchableOpacity, ScrollView, View, Text, StyleSheet } from 'react-native';
import IP_ADDRESS from './constants';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
  images: {

  },
});

export default class MatchScreen extends React.Component {
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
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image
                  source={{ uri : imageUri }}
                  style={styles.images}
                />
              </View>
              <View key={dataItem.uid} style={styles.dataItem}>
                <Text>
                  Brand: {dataItem.item_brand}{'\n'}
                  Type: {dataItem.item_type}{'\n'}
                  Model: {dataItem.item_model}{'\n'}
                  Gender: {dataItem.item_gender}{'\n'}
                  Condition: {dataItem.item_condition}{'\n'}
                  Size: {dataItem.item_size}{'\n'}
                  Colour: {dataItem.item_colour}{'\n'}
                  Material: {dataItem.item_material}{'\n'}
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
