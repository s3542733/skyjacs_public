import React from 'react';
import { TouchableOpacity, ScrollView, View, Text, Image, ImageBackground, StyleSheet, Platform } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
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
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default class UserScreen extends React.Component {
  static defaultProps = {
    name: 'james huang',
    avatar: '',
    avatarBackground: '',
  }

  static propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    avatarBackground: PropTypes,
  }

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
    } = this.props;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri: avatarBackground }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{ uri: avatar }}
            />
            <Text style={styles.username}>{name}</Text>
            <Rating
              showRating
              type="star"
              frations={1}
              startingValue={3.6}
              imageSize={20}
              style={{ paddingVertical: 10 }}
            />
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
        <Text style={styles.buttonText}>CREATE MATCH</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
          </Card>
          <View style={{ padding: 20 }}>
            {this.renderBody()}
          </View>
        </View>
      </ScrollView>
    );
  }
}
