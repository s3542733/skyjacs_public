// import React from 'react';
// import { View, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
// import LoginForm from './LoginForm';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2c3e50',
//   },
//   loginContainer: {
//     alignItems: 'center',
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   logo: {
//     position: 'absolute',
//     width: 300,
//     height: 530,
//   },
// });

// export default class SignInScreen extends React.Component {
//   render() {
//     return (
//       <KeyboardAvoidingView behavior="padding" style={styles.container}>
//         <View style={styles.loginContainer}>
//           <Image resizeMode="contain" style={styles.logo} source={require('../../images/skyjacs_logo.png')} />
//         </View>
//         <View style={styles.formContainer}>
//           <LoginForm {...this.props} />
//         </View>
//       </KeyboardAvoidingView>
//     );
//   }
// }


import React from 'react';
import { AsyncStorage, ScrollView, TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { Icon, Card, Rating } from 'react-native-elements';
import { material, sanFranciscoWeights } from 'react-native-typography';
import PropTypes from 'prop-types';
import { IP_ADDRESS, ACCESS_TOKEN } from '../constants';

/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-console */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    backgroundColor: '#FFF',
  },
  headerContainer: {},
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerColumn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  userImage: {
    borderColor: '#01C89E',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 15,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    padding: 15,
  },
  descContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
});

export default class SellerScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="md-person"
        type="ionicon"
        color={tintColor}
      />
    ),
  }

  static defaultProps = {
    name: 'username',
    // avatar: '../images/default_profile_pic.png',
    // avatarBackground: '../images/profile_bg.jpg',
  }

  static propTypes = {
    name: PropTypes.string,
    // avatar: PropTypes.string,
    // avatarBackground: PropTypes.string,
  }

  constructor() {
    super();
    this.getUserData = this.getUserData.bind(this);
    this.logout = this.logout.bind(this);
    this.state = { username: '', email: '' };
  }

  componentWillMount() {
    this.getUserData('users/');
  }


  async getToken() {
    try {
      const asyncToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(`Token: ${asyncToken}`);
    } catch (error) {
      console.log('ERROR: failed to get token');
    }
    return null;
  }

  getUserData(route) {
    AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
      fetch(IP_ADDRESS + route, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          token: token,
        },
      })
        .then(response => response.json())
        .then((responseJson) => {
          console.log('RESPONSE');
          console.log(responseJson);
          console.log(JSON.stringify(responseJson[0].username));
          this.setState({ username: JSON.stringify(responseJson[0].username) });
          this.setState({ email: JSON.stringify(responseJson[0].email) });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  logout() {
    this.removeToken();
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      console.log('Token removed');
      this.props.navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
    }
  }

  renderHeader = () => {
    const { username } = this.state;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={require('../../images/default_profile_pic.png')}
            />
            <Text style={[material.headline, sanFranciscoWeights.semibold]}>{username}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderBody = () => {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <View style={styles.descContainer}>
          <Text style={[material.subheading, sanFranciscoWeights.thin]}>
            Description
          </Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={[material.subheading, sanFranciscoWeights.thin]}>
            Email
          </Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={[material.subheading, sanFranciscoWeights.thin]}>
            Phone
          </Text>
        </View>
        
        
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
          </Card>
          <View style={{ padding: 20 }}>
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                frations={1}
                startingValue={0}
                imageSize={20}
              />
              <Text>Give this user a rating!</Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={{ padding: 20 }}>
              {this.renderBody()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
