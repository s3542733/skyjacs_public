import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';

export class GoogleLogin extends React.Component {

	constructor(props) {
		super(props)
	};

	async signInWithGoogleAsync() {
		try {
			const result = await Expo.Google.logInAsync({
				iosClientId: '339328430446-mq1rtf0s3016dpr44so5dpgsou85e59o.apps.googleusercontent.com',
				scopes: ['profile', 'email'],
			});

			if(result.type === 'success') {
				return result.accessToken;
			} else {
				return {cancelled: true};
			}
		} catch (e) {
			return {error: true}
		}
	};

	render() {
		return (
			<View>
				<Button title="Sign In" onPress={this.signInWithGoogleAsync.bind(this)}/>
			</View>
		)
	};
}

export default GoogleLogin