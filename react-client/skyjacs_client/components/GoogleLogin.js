import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';

export class GoogleLogin extends React.Component {

	constructor(props) {
		super(props)
	}

	async signInWithGoogleAsync() {
		try {
			const result = await Expo.Google.logInAsync({
				// skyjacsdevteam@gmail.com OAuth 2.0 ClientId's
				iosClientId: '630362784684-9ojrarjd04hpjgg0jcqg8veu3beihp0s.apps.googleusercontent.com',
				androidClientId: '630362784684-41ulk9bm7lcavhc070kqt6movnjfe3e7.apps.googleusercontent.com',
				scopes: ['profile', 'email'],
			});

			console.log(result);

			if(result.type === 'success') {
				return result.accessToken;
			} else {
				return {cancelled: true};
			}
		} catch (e) {
			return {error: true}
		}
	}

	render() {
		return (
			<Button title="Login with Google" onPress={this.signInWithGoogleAsync.bind(this)}/>
		)
	}
}

export default GoogleLogin