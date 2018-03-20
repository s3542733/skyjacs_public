import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import 

class UserLogin extends Component {
	state = {
		password: ''
	}
	handleUsername = (text) => {
		this.setState({ username: text })
	}
	handlePassword = (text) => {
		this.setState({ password: text })
	}
	login = (username, password) => {
		alert('User: ' + username + " are Now logged in!")
	}
	render(){
		return (
			<View style = {styles.container}>
                <View style = {styles.header}>
                </View>
				<TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Enter Username Here"
					placeholderTextColor = "#111"
					autoCapitalize = "none"
					onChangeText = {this.handleUsername}/>
				
				<TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Enter Password Here"
					placeholderTextColor = "#111"
					autoCapitalize = "none"
					onChangeText = {this.handlePassword}/>
			
				<TouchableOpacity
					style = {styles.submitButton}
					onPress = {
						() => this.login(this.state.username, this.state.password)
					}>
					<Text style = {styles.submitButtonText}> Login </Text>
				</TouchableOpacity>
			</View>
		)
	}
}
export default UserLogin

const styles = StyleSheet.create({
	container: {
		paddingTop: 50
	},
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1
	},
	submitButton: {
		backgroundColor: '#7a42f4',
		padding: 10,
		margin: 15,
		height: 40,
	},
	submitButtonText:{
		color: 'white'
	}
})
