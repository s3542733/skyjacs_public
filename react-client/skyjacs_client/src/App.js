import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { Icon, Card, Rating } from 'react-native-elements';
import { material, sanFranciscoWeights } from 'react-native-typography';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from './constants';

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

export default class UserScreen extends React.Component {
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

  async getToken() {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(`Token: ${token}`);
    } catch (error) {
      console.log('ERROR: failed to get token');
    }
  }

  renderHeader = () => {
    const {
      name,
    } = this.props;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={require('../images/default_profile_pic.png')}
            />
            <Text style={[material.headline, sanFranciscoWeights.semibold]}>{name}</Text>
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
            View and Edit your user information here. You can also create match
             or post a selling if you would like.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigate('Post')}
        >
          <Text style={[material.headline, sanFranciscoWeights.thin]}>Become a Seller?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigate('Create')}
        >
          <Text style={[material.headline, sanFranciscoWeights.thin]}>Find a Match!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigate('Post')}
        >
          <Text style={[material.headline, sanFranciscoWeights.thin]}>View your items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigate('Post')}
        >
          <Text style={[material.headline, sanFranciscoWeights.thin]}>Edit profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
          </Card>
          <View style={{ padding: 20 }}>
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                frations={1}
                startingValue={5}
                imageSize={20}
              />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={{ padding: 20 }}>
              {this.renderBody()}
            </View>
          </View>
      </View>
    );
  }
}