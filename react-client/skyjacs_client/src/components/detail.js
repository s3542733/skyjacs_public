import React from 'react';
import { View, Text } from 'react-native';

export default class DetailScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;

    const itemBrand = params ? params.item_brand : null;
    const itemType = params ? params.item_type : null;
    const itemModel = params ? params.item_model : null;
    const itemGender = params ? params.item_gender : null;
    const itemCondition = params ? params.item_condition : null;
    const itemSize = params ? params.item_size : null;
    const itemColour = params ? params.item_colour : null;
    const itemMaterial = params ? params.item_material : null;
    const itemMatching = params ? params.item_matching : null;

    return (
      <View>
        <Text>{JSON.stringify(itemBrand)}</Text>
        <Text>{JSON.stringify(itemType)}</Text>
        <Text>{JSON.stringify(itemModel)}</Text>
        <Text>{JSON.stringify(itemGender)}</Text>
        <Text>{JSON.stringify(itemCondition)}</Text>
        <Text>{JSON.stringify(itemSize)}</Text>
        <Text>{JSON.stringify(itemColour)}</Text>
        <Text>{JSON.stringify(itemMaterial)}</Text>
        <Text>{JSON.stringify(itemMatching)}</Text>
      </View>
    );
  }
}
