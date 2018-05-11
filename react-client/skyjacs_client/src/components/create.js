import React from 'react';
import {
  AsyncStorage,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { material, sanFranciscoWeights } from 'react-native-typography';
import { Icon, Card } from 'react-native-elements';
import { brand, type, setting, gender, condition, materials, size } from './createConstants';
import { IP_ADDRESS, ACCESS_TOKEN, ACCESS_UID, BUYING_UID } from './constants';

/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/sort-comp */
/* eslint-disable prefer-template */

const styles = StyleSheet.create({
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
  },
  postContainer: {
    padding: 15,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    borderRadius: 5,
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="md-person"
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

    this.modelRef = this.updateRef.bind(this, 'model');
    this.materialsRef = this.updateRef.bind(this, 'materials');
    this.brandRef = this.updateRef.bind(this, 'brand');
    this.typeRef = this.updateRef.bind(this, 'type');
    this.genderRef = this.updateRef.bind(this, 'gender');
    this.conditionRef = this.updateRef.bind(this, 'condition');
    this.sizeRef = this.updateRef.bind(this, 'size');
    this.colorRef = this.updateRef.bind(this, 'color');
    this.minPriceRef = this.updateRef.bind(this, 'minPrice');
    this.maxPriceRef = this.updateRef.bind(this, 'maxPrice');

    this.brandPriorityRef = this.updateRef.bind(this, 'brandPriority');

    this.state = {
      brand: '',
      type: '',
      model: '',
      gender: '',
      condition: '',
      size: 0.0,
      color: '',
      materials: '',
      minPrice: 0.0,
      maxPrice: 99999.0,
      brandPriority: 0,
      typePriority: 0,
      modelPriority: 0,
      genderPriority: 0,
      conditionPriority: 0,
      sizePriority: 0,
      colorPriority: 0,
      materialsPriority: 0,
    };
  }

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
          console.log(responseJson);
          console.log('Buying UID from response: ' + JSON.stringify(responseJson.buying_id));
          this.storeUID(JSON.stringify(responseJson.buying_id));
          this.props.navigation.navigate('Match');
        })
        .catch((error) => {
          console.log('Could not create matches');
          console.log(error);
        });
    });
  }

  async storeUID(uid) {
    try {
      console.log('storing buying uid ' + uid);
      await AsyncStorage.setItem(BUYING_UID, uid);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    // fetch(`${IP_ADDRESS}users`)
    //   .then(response => response.json())
    //   .then((responseJson) => {
    //     this.setState({
    //       dataSource: responseJson,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  onChangeText(text) {
    ['brand', 'brandPriority', 'model', 'minPrice', 'maxPrice', 'materials', 'type', 'gender', 'condition', 'size', 'color']
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmit() {
    const data = new FormData();
    data.append('listing_title', '');
    data.append('item_sex', this.state.gender);
    data.append('sex_priority', this.state.genderPriority);
    data.append('item_type', this.state.type);
    data.append('type_priority', this.state.typePriority);
    data.append('item_brand', this.state.brand);
    data.append('brand_priority', this.state.brandPriority);
    data.append('item_model', this.state.model);
    data.append('model_priority', this.state.modelPriority);
    data.append('item_condition', this.state.condition);
    data.append('condition_priority', this.state.conditionPriority);
    data.append('item_colour', this.state.color);
    data.append('colour_priority', this.state.colorPriority);
    data.append('item_material', this.state.materials);
    data.append('material_priority', this.state.materialsPriority);
    data.append('item_size', this.state.size);
    data.append('size_priority', this.state.sizePriority);
    data.append('min_price', this.state.minPrice);
    data.append('max_price', this.state.maxPrice);
    data.append('item_notes', '');
    console.log(data);
    this.postData(data, 'buying/');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  renderForm = () => {
    return (
      <KeyboardAwareScrollView>
        <Text style={[material.headline, sanFranciscoWeights.semibold]}>
          Find the perfect Shoe!
        </Text>
        <Dropdown
          ref={this.brandRef}
          label="Brand"
          data={brand}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.brandPriorityRef}
          baseColor="#edc374"
          value={0}
          label="Brand - Priority"
          data={setting}
          onChangeText={this.onChangeText}
        />

        <TextField
          ref={this.modelRef}
          label="Model"
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.modelPriorityRef}
          baseColor="#edc374"
          value={0}
          label="Model - Priority"
          data={setting}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.typeRef}
          label="Type"
          data={type}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.typePriorityRef}
          baseColor="#edc374"
          value={0}
          label="Type - Priority"
          data={setting}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.genderRef}
          label="Shoe Gender"
          data={gender}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.genderPriorityRef}
          baseColor="#edc374"
          value={0}
          label="Shoe Gender - Priority"
          data={setting}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.conditionRef}
          label="Condition"
          data={condition}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.conditionPriorityRef}
          baseColor="#edc374"
          value={0}
          label="Condition - Priority"
          data={setting}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.materialsRef}
          label="Materials"
          data={materials}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.materialsPriorityRef}
          baseColor="#edc374"
          value={0}
          label="Materials - Priority"
          data={setting}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.sizeRef}
          label="Size (UK)"
          data={size}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.sizePriorityRef}
          baseColor="#edc374"
          value={0}
          label="Size - Priority"
          data={setting}
          onChangeText={this.onChangeText}
        />

        <TextField
          ref={this.colorRef}
          label="Color"
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.colorPriorityRef}
          baseColor="#edc374"
          value={0}
          label="Color - Priority"
          data={setting}
          onChangeText={this.onChangeText}
        />

        <TextField
          ref={this.minPriceRef}
          label="Minimum Price"
          onChangeText={this.onChangeText}
        />

        <TextField
          ref={this.maxPriceRef}
          label="Maximum Price"
          onChangeText={this.onChangeText}
        />
      </KeyboardAwareScrollView>
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
          <Card containerStyle={{ borderRadius: 5 }}>
            {this.renderForm()}
          </Card>
        </View>
        <View style={styles.postContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onSubmit}
          >
            <Text style={styles.buttonText}>CREATE MATCH</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
