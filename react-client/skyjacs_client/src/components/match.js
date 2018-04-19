import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import IP_ADDRESS from './constants';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1',
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
  }

  render() {
    return (
      <ScrollView> {
        this.state.dataSource.map(item => (
          <View key={item.uid} style={styles.item}>
            <Text>
            Brand: {item.item_brand}{'\n'}
            Type: {item.item_type}{'\n'}
            Model: {item.item_model}{'\n'}
            Gender: {item.item_gender}{'\n'}
            Condition: {item.item_condition}{'\n'}
            Size: {item.item_size}{'\n'}
            Colour: {item.item_colour}{'\n'}
            Material: {item.item_material}{'\n'}
            Match Percentage: {item.item_matching}%
            </Text>
          </View>
        ))
      }
      </ScrollView>
    );
  }
}

