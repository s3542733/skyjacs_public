import React from 'react';
import {
  Modal,
  CameraRoll,
  Image,
  Dimensions,
  Button,
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectedPhoto from './selectedPhoto';
import IP_ADDRESS from './constants';
import { brand, type, gender, condition, material, size } from './createConstants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1,
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingBottom: 50,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 7,
    zIndex: 10,
  },
  input: {
    margin: 15,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    fontSize: 18,
  },
  footer: {
    height: 60,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});

export default class PostScreen extends React.Component {
  static postData(data, route) {
    fetch(IP_ADDRESS + route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);

    this.onSubmitBrand = this.onSubmitBrand.bind(this);
    this.onSubmitType = this.onSubmitType.bind(this);
    this.onSubmitGender = this.onSubmitGender.bind(this);
    this.onSubmitCondition = this.onSubmitCondition.bind(this);
    this.onSubmitSize = this.onSubmitSize.bind(this);
    this.onSubmitColor = this.onSubmitColor.bind(this);
    this.onSubmitDescription = this.onSubmitDescription.bind(this);
    this.onSubmitMaterial = this.onSubmitMaterial.bind(this);
    this.onSubmitModel = this.onSubmitModel.bind(this);

    this.modelRef = this.updateRef.bind(this, 'model');
    this.materialRef = this.updateRef.bind(this, 'material');
    this.brandRef = this.updateRef.bind(this, 'brand');
    this.typeRef = this.updateRef.bind(this, 'type');
    this.genderRef = this.updateRef.bind(this, 'gender');
    this.conditionRef = this.updateRef.bind(this, 'condition');
    this.sizeRef = this.updateRef.bind(this, 'size');
    this.colorRef = this.updateRef.bind(this, 'color');
    this.descriptionRef = this.updateRef.bind(this, 'description');

    this.state = {
      brand: '',
      type: '',
      model: '',
      gender: '',
      condition: '',
      size: '',
      color: '',
      material: '',
      description: '',
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
    ['brand', 'material', 'model', 'type', 'gender', 'condition', 'size', 'color', 'description']
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
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

  onSubmitMaterial() {
    this.material.focus();
  }

  onSubmitModel() {
    this.model.focus();
  }

  onSubmit() {
    const errors = {};
    const data = new FormData();
    const photodata = new FormData();

    ['brand', 'model', 'material', 'type', 'gender', 'condition', 'size', 'color', 'description']
      .forEach((name) => {
        const value = this[name].value();
        if (!value) {
          errors[name] = 'Should not be empty';
        }
      });
    this.setState({ errors });

    if (this.state.showSelectedPhoto) {
      const photo = {
        uri: this.state.uri,
        type: 'image/jpeg',
        name: 'photo.jpeg',
      };
      data.append('user', `${IP_ADDRESS}users/1/`);
      data.append('listing_type', 'Selling');
      data.append('item_sex', this.state.gender);
      data.append('item_type', this.state.type);
      data.append('item_brand', this.state.brand);
      data.append('item_model', this.state.model);
      data.append('item_condition', this.state.condition);
      data.append('item_colour', this.state.color);
      data.append('item_material', this.state.material);
      data.append('item_size', this.state.size);
      data.append('item_notes', this.state.description);
      PostScreen.postData(data, 'listings/');
      photodata.append('listing', `${IP_ADDRESS}listings/7/`);
      photodata.append('image_url', photo);
      PostScreen.postData(photodata, 'images/');
    } else {
      alert('Please upload an image before posting');
    }
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'All',
    }).then(r => this.setState({ photos: r.edges }));
  };

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

  render() {
    const { showSelectedPhoto, uri, errors = {} } = this.state;

    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <Dropdown
              ref={this.brandRef}
              onFocus={this.onFocus}
              error={errors.brand}
              label="Brand"
              data={brand}
              onSubmitEditing={this.onSubmitBrand}
              onChangeText={this.onChangeText}
            />
            <TextField
              ref={this.modelRef}
              onFocus={this.onFocus}
              error={errors.model}
              label="Model"
              onSubmitEditing={this.onSubmitModel}
              onChangeText={this.onChangeText}
            />
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
              ref={this.materialRef}
              onFocus={this.onFocus}
              error={errors.material}
              label="Material"
              data={material}
              onSubmitEditing={this.onSubmitMaterial}
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
              ref={this.descriptionRef}
              onFocus={this.onFocus}
              error={errors.description}
              label="Description"
              multiline
              blurOnSubmit
              onSubmitEditing={this.onSubmitDescription}
              onChangeText={this.onChangeText}
              characterRestriction={255}
            />
            {this.renderSelectedPhoto(showSelectedPhoto, uri)}
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.postContainer}>
          <Button title="Submit" onPress={this.onSubmit} />
          <Button
            title="Add Photo"
            onPress={() => {
              this.toggleModal();
              this.getPhotos();
            }}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => console.log("closed")}
          >
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
          </Modal>
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}
