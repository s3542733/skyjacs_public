import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigation } from 'react-navigation';

export default class UserScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        		<Text>User!</Text>
      		</View>
		);
	}
}
