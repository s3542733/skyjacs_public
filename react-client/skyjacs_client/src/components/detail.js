import React from 'react';
import { TouchableOpacity, View, Text, Dimensions, StyleSheet } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { Icon } from 'react-native-elements';
import { material, sanFranciscoWeights } from 'react-native-typography';

/* eslint-disable global-require */
/* eslint-disable no-console  */

const MIN_HEIGHT = 0;
const MAX_HEIGHT = 250;

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  headSection: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sellerSection: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  iconContainer: {
    flex: 1,
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 20,
  },
  iconEmailContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
});

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    const itemBrand = params ? params.item_brand : null;
    const itemType = params ? params.item_type : null;
    const itemModel = params ? params.item_model : null;
    const itemGender = params ? params.item_gender : null;
    const itemCondition = params ? params.item_condition : null;
    const itemSize = params ? params.item_size : null;
    const itemColour = params ? params.item_colour : null;
    const itemMaterial = params ? params.item_material : null;
    const itemMatching = params ? params.item_matching : null;
    const itemDescription = params ? params.item_notes : null;
    const userParam = params ? params.user : null;

    this.handleProfileView = this.handleProfileView.bind(this);

    this.state = {
      brand: itemBrand,
      type: itemType,
      model: itemModel,
      gender: itemGender,
      condition: itemCondition,
      size: itemSize,
      colour: itemColour,
      material: itemMaterial,
      matching: itemMatching,
      description: itemDescription,
      user: userParam,
    };
  }

  handleProfileView() {
    // AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
    //   fetch(IP_ADDRESS + route, {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //       token: token,
    //     },
    //   })
    //     .then(response => response.json())
    //     .then((responseJson) => {
    //       console.log('RESPONSE');
    //       console.log(responseJson);
    //       this.props.navigation.navigate('Seller');
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });
    console.log('User ID : ' + this.state.user);
    const user_id = this.state.user;
    this.props.navigation.navigate('Seller', { userID: user_id });  
  }

  ComponentWillMount() {

  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.iconContainer}>
          <Icon
            name="ios-heart-outline"
            type="ionicon"
            color="#f50"
          />
        </View>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          fadeOutForeground
          headerImage={require('../images/shoe_images/adidas_ultra_boost.jpeg')}
          style={styles.image}
        >
          <View style={{ padding: 30 }}>
            <View style={styles.headSection}>
              <Text style={[material.title, sanFranciscoWeights.semibold]}>
                Adidas Ultra Boost (2018)
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={[material.subheading, sanFranciscoWeights.semibold]}>Description</Text>
              <Text style={[material.body2, sanFranciscoWeights.thin]}>{this.state.description}</Text>
              <Text style={[material.body2, sanFranciscoWeights.thin]}>{this.state.brand}</Text>
              <Text style={[material.body2, sanFranciscoWeights.thin]}>{this.state.type}</Text>
              <Text style={[material.body2, sanFranciscoWeights.thin]}>{this.state.gender}</Text>
              <Text style={[material.body2, sanFranciscoWeights.thin]}>{this.state.condition}</Text>
              <Text style={[material.body2, sanFranciscoWeights.thin]}>{this.state.size}</Text>
              <Text style={[material.body2, sanFranciscoWeights.thin]}>{this.state.colour}</Text>
              <Text style={[material.body2, sanFranciscoWeights.thin]}>{this.state.material}</Text>
            </View>
            <View style={styles.sellerSection}>
              <TouchableOpacity
                onPress={this.handleProfileView}
              >
                <View>
                  <Text style={[material.subheading, sanFranciscoWeights.semibold]}>Seller</Text>
                  <Text style={[material.body2, sanFranciscoWeights.thin]}>Some dank info</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.iconEmailContainer}>
                <Icon
                  name="ios-mail-outline"
                  type="ionicon"
                  color="grey"
                />
              </View>
            </View>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}
