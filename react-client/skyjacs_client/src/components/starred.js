import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class StarredScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="md-heart"
        type="ionicon"
        color={tintColor}
      />
    ),
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Starred!</Text>
      </View>
    );
  }
}
