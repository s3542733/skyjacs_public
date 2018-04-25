import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="md-notifications"
        type="ionicon"
        color={tintColor}
      />
    ),
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    );
  }
}
