import React, { Component } from 'react';
import { KeyboardAvoidingView, AsyncStorage, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { IP_ADDRESS, ACCESS_TOKEN } from '../constants';

/* eslint-disable class-methods-use-this */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-console */

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default class LoginForm extends Component {
  constructor() {
    super();

    this.onSignIn = this.onSignIn.bind(this);

    this.state = {
      username: '',
      password: '',
      error: null,
    };
  }

  async onSignIn() {
    const data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);

    try {
      const response = await fetch(`${IP_ADDRESS}login/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });
      const res = await response.text();

      if (response.status >= 200 && response.status < 300) {
        console.log(`RESPONSE: success ${res} STATUS:${response.status}`);
        const responseToken = res;
        this.storeToken(responseToken.slice(1, -1));
        this.props.navigation.navigate('Tabs');
      } else {
        const errors = res;
        throw errors;
      }
    } catch (errors) {
      this.removeToken();
      this.setState({ error: errors });
      console.log(`ERROR: ${errors}`);
    }
  }
  
  async getToken() {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(`Token: ${token}`);
    } catch (error) {
      console.log('ERROR: failed to get token');
    }
  }

  async storeToken(token) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, token);
      this.getToken();
    } catch (error) {
      console.log('ERROR: failed to store token');
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch (error) {
      console.log('ERROR: failed to remove token');
    }
  }

  render() {
    const { error } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            placeholder="Username"
            placeholderTextColor="rgba(225,225,225,0.7)"
            onChangeText={val => this.setState({ username: val })}
          />
          <TextInput
            style={styles.input}
            returnKeyType="go"
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
            onChangeText={val => this.setState({ password: val })}
          />
          <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>{ error || null }</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onSignIn}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

