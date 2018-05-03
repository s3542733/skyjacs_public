import React from 'react';
import {
  AsyncStorage,
  Modal,
  CameraRoll,
  Image,
  Dimensions,
  Button,
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Card } from 'react-native-elements';
import { material, sanFranciscoWeights } from 'react-native-typography';
import SelectedPhoto from './selectedPhoto';
import { IP_ADDRESS, ACCESS_TOKEN, ACCESS_UID } from './constants';
import { brand, type, gender, condition, materials, size } from './createConstants';

/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable prefer-template */

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: 20,
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    paddingBottom: 75,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  buttonContainer: {
    borderRadius: 5,
    backgroundColor: '#2980b6',
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default class PostScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="md-pricetag"
        type="ionicon"
        color={tintColor}
      />
    ),
  }

  constructor(props) {
    super(props);

    this.postData = this.postData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);

    this.onSubmitPrice = this.onSubmitPrice.bind(this);
    this.onSubmitBrand = this.onSubmitBrand.bind(this);
    this.onSubmitType = this.onSubmitType.bind(this);
    this.onSubmitGender = this.onSubmitGender.bind(this);
    this.onSubmitCondition = this.onSubmitCondition.bind(this);
    this.onSubmitSize = this.onSubmitSize.bind(this);
    this.onSubmitColor = this.onSubmitColor.bind(this);
    this.onSubmitDescription = this.onSubmitDescription.bind(this);
    this.onSubmitMaterials = this.onSubmitMaterials.bind(this);
    this.onSubmitModel = this.onSubmitModel.bind(this);
    this.onSubmitTitle = this.onSubmitTitle.bind(this);

    this.priceRef = this.updateRef.bind(this, 'price');
    this.titlelRef = this.updateRef.bind(this, 'title');
    this.modelRef = this.updateRef.bind(this, 'model');
    this.materialsRef = this.updateRef.bind(this, 'materials');
    this.brandRef = this.updateRef.bind(this, 'brand');
    this.typeRef = this.updateRef.bind(this, 'type');
    this.genderRef = this.updateRef.bind(this, 'gender');
    this.conditionRef = this.updateRef.bind(this, 'condition');
    this.sizeRef = this.updateRef.bind(this, 'size');
    this.colorRef = this.updateRef.bind(this, 'color');
    this.descriptionRef = this.updateRef.bind(this, 'description');

    this.state = {
      listing_uid: '',
      title: '',
      brand: '',
      type: '',
      model: '',
      gender: '',
      condition: '',
      size: '',
      color: '',
      materials: '',
      description: '',
      price: 0.0,
      modalVisible: false,
      photos: [],
      index: null,
      showSelectedPhoto: false,
      uri: '',
    };
  }

  onFocus() {
    const { errors = {} } = this.state;

    for (const name in errors) {
      const ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }

  onChangeText(text) {
    ['title', 'brand', 'materials', 'price', 'model', 'type', 'gender', 'condition', 'size', 'color', 'description']
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmitPrice() {
    this.price.focus();
  }

  onSubmitBrand() {
    this.brand.focus();
  }

  onSubmitType() {
    this.type.focus();
  }

  onSubmitGender() {
    this.gender.focus();
  }

  onSubmitCondition() {
    this.condition.focus();
  }

  onSubmitSize() {
    this.size.focus();
  }

  onSubmitColor() {
    this.color.focus();
  }

  onSubmitDescription() {
    this.description.focus();
  }

  onSubmitMaterials() {
    this.materials.focus();
  }

  onSubmitModel() {
    this.model.focus();
  }

  onSubmitTitle() {
    this.title.focus();
  }

  onSubmit() {
    const errors = {};
    const data = new FormData();
    const photodata = new FormData();

    ['title', 'brand', 'price', 'model', 'materials', 'type', 'gender', 'condition', 'size', 'color', 'description']
      .forEach((name) => {
        const value = this[name].value();
        if (!value) {
          errors[name] = 'Should not be empty';
        }
      });
    this.setState({ errors });

    data.append('listing_title', this.state.title);
    data.append('item_sex', this.state.gender);
    data.append('item_type', this.state.type);
    data.append('item_brand', this.state.brand);
    data.append('item_model', this.state.model);
    data.append('item_condition', this.state.condition);
    data.append('item_colour', this.state.color);
    data.append('item_material', this.state.materials);
    data.append('item_size', this.state.size);
    data.append('item_notes', this.state.description);
    data.append('item_price', this.state.price);
    this.postData(data, 'sellings/');
    alert('Item successfully uploaded!');
    console.log(data);  


    // if (this.state.showSelectedPhoto) {
    //   const photo = {
    //     uri: this.state.uri,
    //     type: 'image/jpeg',
    //     name: 'photo.jpeg',
    //   };
    //   // data.append('user', `${IP_ADDRESS}users/1/`);
    //   data.append('listing_type', 'Selling');
    //   data.append('listing_title', this.state.title);
    //   data.append('item_sex', this.state.gender);
    //   data.append('item_type', this.state.type);
    //   data.append('item_brand', this.state.brand);
    //   data.append('item_model', this.state.model);
    //   data.append('item_condition', this.state.condition);
    //   data.append('item_colour', this.state.color);
    //   data.append('item_material', this.state.materials);
    //   data.append('item_size', this.state.size);
    //   data.append('item_notes', this.state.description);
    //   console.log(data);
    //   PostScreen.postData(data, 'listings/');
    //   photodata.append('listing', `${IP_ADDRESS}listings/1/`);
    //   photodata.append('image_url', photo);
    //   PostScreen.postData(photodata, 'images/');
    // } else {
    //   alert('Please upload an image before posting');
    // }
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'All',
    }).then(r => this.setState({ photos: r.edges }));
  };

  postData(data, route) {
    AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
      fetch(IP_ADDRESS + route, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          token: token,
        },
        body: data,
      })
        .then(response => response.json())
        .then((responseJson) => {
          console.log('RESPONSE');
          console.log(responseJson);
          console.log(JSON.stringify(responseJson.listing_uid));
          // this.setState({ listingUid: responseJson.listing_uid });
          // this.storeUid(JSON.stringify(responseJson.listing_uid));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  // async storeUid(uid) {
  //   try {
  //     await AsyncStorage.setItem(ACCESS_UID, uid);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  updateRef(name, ref) {
    this[name] = ref;
  }

  renderSelectedPhoto = (showSelectedPhoto, uri) => {
    if (showSelectedPhoto) {
      return <SelectedPhoto uri={uri} />;
    }
    return false;
  };

  renderPost = () => {
    const { showSelectedPhoto, uri, errors = {} } = this.state;
    return (
      <KeyboardAwareScrollView>
        <Text style={[material.headline, sanFranciscoWeights.semibold]}>
          Describe your shoe to us!
        </Text>
        <TextField
          ref={this.titlelRef}
          onFocus={this.onFocus}
          error={errors.title}
          label="Title"
          onSubmitEditing={this.onSubmitTitle}
          onChangeText={this.onChangeText}
          characterRestriction={25}
        />
        <TextField
          ref={this.descriptionRef}
          onFocus={this.onFocus}
          error={errors.description}
          label="Description"
          multiline
          blurOnSubmit
          onSubmitEditing={this.onSubmitDescription}
          onChangeText={this.onChangeText}
          characterRestriction={120}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TextField
              ref={this.modelRef}
              onFocus={this.onFocus}
              error={errors.model}
              label="Model"
              onSubmitEditing={this.onSubmitModel}
              onChangeText={this.onChangeText}
            />
          </View>
          <View style={{ width: 200, marginLeft: 8 }}>
            <Dropdown
              ref={this.brandRef}
              onFocus={this.onFocus}
              error={errors.brand}
              label="Brand"
              data={brand}
              onSubmitEditing={this.onSubmitBrand}
              onChangeText={this.onChangeText}
            />
          </View>
        </View>

        <Dropdown
          ref={this.typeRef}
          onFocus={this.onFocus}
          error={errors.type}
          label="Type"
          data={type}
          onSubmitEditing={this.onSubmitType}
          onChangeText={this.onChangeText}
        />
        <Dropdown
          ref={this.genderRef}
          onFocus={this.onFocus}
          error={errors.gender}
          label="Shoe Gender"
          data={gender}
          onSubmitEditing={this.onSubmitGender}
          onChangeText={this.onChangeText}
        />
        <Dropdown
          ref={this.conditionRef}
          onFocus={this.onFocus}
          error={errors.condition}
          label="Condition"
          data={condition}
          onSubmitEditing={this.onSubmitCondition}
          onChangeText={this.onChangeText}
        />
        <Dropdown
          ref={this.materialsRef}
          onFocus={this.onFocus}
          error={errors.materials}
          label="Materials"
          data={materials}
          onSubmitEditing={this.onSubmitMaterials}
          onChangeText={this.onChangeText}
        />
        <Dropdown
          ref={this.sizeRef}
          onFocus={this.onFocus}
          error={errors.size}
          label="Size (UK)"
          data={size}
          onSubmitEditing={this.onSubmitSize}
          onChangeText={this.onChangeText}
        />
        <TextField
          ref={this.colorRef}
          onFocus={this.onFocus}
          error={errors.color}
          label="Color"
          onSubmitEditing={this.onSubmitColor}
          onChangeText={this.onChangeText}
        />
        <TextField
          ref={this.priceRef}
          onFocus={this.onFocus}
          error={errors.price}
          label="Price"
          onSubmitEditing={this.onSubmitPrice}
          onChangeText={this.onChangeText}
        />
        {this.renderSelectedPhoto(showSelectedPhoto, uri)}
      </KeyboardAwareScrollView>
    );
  }

  renderModal = () => {
    return (
      <View style={styles.modalContainer}>
        <Button title="Close" onPress={this.toggleModal} />
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          {this.state.photos.map((p, i) => {
            const { uri } = p.node.image;
            return (
              <TouchableHighlight
                style={{
                  opacity:
                    i === this.state.index
                      ? 0.5
                      : 1,
                }}
                key={i}
                underlayColor="transparent"
                onPress={() =>
                  this.setState({
                    showSelectedPhoto: true,
                    uri: uri,
                    modalVisible: !this.state
                      .modalVisible,
                  })
                }
              >
                <Image
                  style={{
                    width: width / 3,
                    height: width / 3,
                  }}
                  source={{
                    uri: p.node.image.uri,
                  }}
                />
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  // <Image
  //   style={{
  //     position: 'absolute',
  //     resizeMode: 'repeat',
  //     top: 0,
  //   }}
  //   source={require('../images/post_wallpaper.png')}
  // />

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Card containerStyle={{ borderRadius: 5 }} style={{ flex: 1 }}>
            {this.renderPost()}
          </Card>
          <View style={styles.postContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onSubmit}
            >
              <Text style={styles.buttonText}>SUBMIT ITEM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                this.toggleModal();
                this.getPhotos();
              }}
            >
              <Text style={styles.buttonText}>ADD PHOTO</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
              {this.renderModal()}
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}
