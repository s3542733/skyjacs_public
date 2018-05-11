import React from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import SignUpForm from './SignUpForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 530,
  },
});

export default class SignUpScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../images/skyjacs_logo.png')} />
        </View>
        <View style={styles.formContainer}>
          <SignUpForm {...this.props} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
