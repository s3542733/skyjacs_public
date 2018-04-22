import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import { material, sanFranciscoWeights } from 'react-native-typography';
import PropTypes from 'prop-types';

/* eslint-disable global-require */

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
    padding: 15,
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
  // buttonText: {
  //   ...material.captionWhite,
  //   ...systemWeights.thin,
  // },
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
        <View style={styles.buttonContainer}>
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
        </ScrollView>
      </View>
    );
  }
}