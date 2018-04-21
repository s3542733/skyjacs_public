import React from 'react';
import { TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import PropTypes from 'prop-types';

/* eslint-disable global-require */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#FFF',
  },
  headerContainer: {},
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
    backgroundColor: '#2D3E4F',
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
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default class UserScreen extends React.Component {
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
            <Text style={styles.userNameText}>{name}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderBody = () => {
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigate('Create')}
      >
        <Text style={styles.buttonText}>FIND A MATCH</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          {this.renderHeader()}
        </Card>
        <View style={styles.bodyContainer}>
          <View style={{ padding: 20 }}>
            {this.renderBody()}
          </View>
        </View>
      </View>
    );
  }
}
