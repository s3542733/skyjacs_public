import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { IP_ADDRESS } from '../constants';

/* eslint-disable no-undef  */
/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */

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

const constraints = ({
  username: {
    presence: {
      message: '^Username must be filled',
    },
    length: {
      minimum: 1,
      message: '^Username must be filled',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 characters',
    },
  },
  // passwordConfirmation: {
  //   equality: 'password',
  // },
  email: {
    presence: true,
    email: true,
  },
  firstName: {
    presence: {
      message: '^First name must be filled',
    },
    length: {
      minimum: 1,
      message: '^First name must be filled',
    },
  },
  lastName: {
    presence: {
      message: '^Last name must be filled',
    },
    length: {
      minimum: 1,
      message: '^Last name must be filled',
    },
  },
});

export default class LoginForm extends Component {
  static validator(name, value) {
    const object = {};
    object[name] = value;
    // validate against constraint
    const constraint = constraints[name];
    const result = validate(object, { [name]: constraint });
    // return error message
    if (result) {
      return result[name][0];
    }
    return null;
  }

  constructor() {
    super();

    this.onRegisterUser = this.onRegisterUser.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      // passwordConfirmation: '',
      firstName: '',
      lastName: '',
      usernameError: null,
      emailError: null,
      firstNameError: null,
      lastNameError: null,
      passwordError: null,
      passwordConfirmationError: null,
    };
  }

  onButtonPress() {
    this.props.navigation.navigate('Tabs');
  }

  async onRegisterUser() {
    const usernameError = LoginForm.validator('username', this.state.username);
    const firstNameError = LoginForm.validator('firstName', this.state.firstName);
    const lastNameError = LoginForm.validator('lastName', this.state.lastName);
    const emailError = LoginForm.validator('email', this.state.email);
    const passwordError = LoginForm.validator('password', this.state.password);
    // const passwordConfirmationError = LoginForm.validator('passwordConfirmation', this.state.passwordConfirmation);

    console.log(`${usernameError} ${firstNameError} ${lastNameError}
      ${emailError} ${passwordError}`);

    /* eslint-disable object-shorthand */
    this.setState({
      usernameError: usernameError,
      emailError: emailError,
      firstNameError: firstNameError,
      lastNameError: lastNameError,
      passwordError: passwordError,
      // passwordConfirmationError: passwordConfirmationError,
    });

    if (usernameError === null && emailError === null && firstNameError === null &&
      lastNameError === null && passwordError === null) {

      const data = new FormData();
      data.append('username', this.state.username);
      data.append('first_name', this.state.firstName);
      data.append('last_name', this.state.lastName);
      data.append('email', this.state.email);
      data.append('password', this.state.password);

      try {
        const response = await fetch(`${IP_ADDRESS}newuser/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        });
        const res = await response.text();

        if (response.status >= 200 && response.status < 300) {
          console.log('RESPONSE: success');
          this.props.navigation.navigate('SignIn');
        } else {
          const errors = res;
          throw errors;
        }
      } catch (errors) {
        console.log(`Catch Errors: ${errors}`);
      }
    }
  }

  render() {
    const { 
      usernameError,
      firstNameError, 
      lastNameError, 
      emailError,
      passwordError, 
      // passwordConfirmationError,
    } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Enter First Name"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={val => this.setState({ firstName: val })}
        />
        <Text>{ firstNameError || null }</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Enter Last Name"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={val => this.setState({ lastName: val })}
        />
        <Text>{ lastNameError || null }</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Enter Username"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={val => this.setState({ username: val })}
        />
        <Text>{ usernameError || null }</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Enter Email"
          placeholderTextColor="rgba(225,225,225,0.7)"
          onChangeText={val => this.setState({ email: val })}
        />
        <Text>{ emailError || null }</Text>
        <TextInput
          style={styles.input}
          returnKeyType="go"
          placeholder="Enter Password"
          placeholderTextColor="rgba(225,225,225,0.7)"
          secureTextEntry
          onChangeText={val => this.setState({ password: val })}
        />
        <Text>{ passwordError || null }</Text>
        <TextInput
          style={styles.input}
          returnKeyType="go"
          placeholder="Enter Password Again"
          placeholderTextColor="rgba(225,225,225,0.7)"
          secureTextEntry
          // onChangeText={val => this.setState({ passwordConfirmation: val })}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onRegisterUser}
        >
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

