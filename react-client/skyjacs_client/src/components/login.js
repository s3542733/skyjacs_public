import React from 'react';
import { ScrollView, View, Text, TouchableHighlight, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { Input } from 'react-native-elements';
import LoginForm from './LoginForm'

export default class LoginScreen extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return(
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.loginContainer}> 
					<Image resizeMode="contain" style={styles.logo} source={require('../images/skyjacs_logo.png')} />
				</View>
				<View style={styles.formContainer}>
					<LoginForm {...this.props}/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 530
    }
});