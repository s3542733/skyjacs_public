import React from 'react';
import {
  Button,
  View,
  StyleSheet,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IP_ADDRESS from './constants';
import { brand, type, setting, gender, condition, material, size } from './createConstants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  radioFormContainer: {
    marginHorizontal: 2,
    marginVertical: 2,
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
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 40,
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

export default class CreateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      brand: '',
      type: '',
      model: '',
      gender: '',
      condition: '',
      size: '',
      color: '',
      material: '',
      brandPriority: false,
      typePriority: false,
      modelPriority: false,
      genderPriority: false,
      conditionPriority: false,
      sizePriority: false,
      colorPriority: false,
      materialPriority: false,
      brandStrict: false,
      modelStrict: false,
      typeStrict: false,
      genderStrict: false,
      conditionStrict: false,
      sizeStrict: false,
      colorStrict: false,
      materialStrict: false,
    };
  }

  // Gets user information - although this is not the proper method
  // function() {
  //   //
  //   // SET USER DATA
  //   // DUMMY TEST HERE
  //   this.state.dataSource.map(
  //     function(user) {
  //       if ('sotoambak' === user.username) {
  //         this.setState({ username: user.username });
  //       }
  //     }.bind(this));
  // }.bind(this),

  componentDidMount() {
    fetch(`${IP_ADDRESS}users`)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onChangeText(text) {
    ['brand', 'type', 'gender', 'condition', 'size', 'color', 'description']
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  // submit function need to rework
  onSubmit() {
    const data = new FormData();

    // test dummy
    data.append('user', `${IP_ADDRESS} + users/2/`);
    data.append('listing_type', 'Buying');
    data.append('item_sex', this.state.gender);
    data.append('sex_priority', this.state.genderPriority);
    data.append('sex_strict', this.state.genderStrict);
    data.append('item_type', this.state.type);
    data.append('type_priority', this.state.typePriority);
    data.append('type_strict', this.state.typeStrict);
    data.append('item_brand', this.state.brand);
    data.append('brand_priority', this.state.brandPriority);
    data.append('brand_strict', this.state.brandStrict);
    data.append('item_model', this.state.model);
    data.append('model_priority', this.state.modelPriority);
    data.append('model_strict', this.state.modelStrict);
    data.append('item_condition', this.state.condition);
    data.append('condition_priority', this.state.conditionPriority);
    data.append('condition_strict', this.state.conditionStrict);
    data.append('item_colour', this.state.color);
    data.append('color_priority', this.state.colorPriority);
    data.append('color_strict', this.state.colorStrict);
    data.append('item_material', this.state.material);
    data.append('material_priority', this.state.materialPriority);
    data.append('material_strict', this.state.materialStrict);
    data.append('item_size', this.state.size);
    data.append('size_priority', this.state.sizePriority);
    data.append('size_strict', this.state.sizeStrict);

    fetch(`${IP_ADDRESS} + listings/`, {
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
        this.postSubmit(['Oops, something when wrong']);
      });

    this.props.navigation.navigate('Match');
  }

  _onSelect = (item) => {
    console.log(item);
  };


  handleBrand = (text) => {
    this.setState({ brand: text });
  };

  handleBrandPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ brandPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ brandStrict: true });
    }
  };

  handleModel = (text) => {
    this.setState({ model: text });
  };

  handleModelPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ modelPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ modelStrict: true });
    }
  };

  handleType = (text) => {
    this.setState({ type: text });
  };

  handleTypePriority = (text) => {
    if (text === 'Priority') {
      this.setState({ typePriority: true });
    }
    if (text === 'Strict') {
      this.setState({ typeStrict: true });
    }
  };

  handleGender = (text) => {
    this.setState({ gender: text });
  };

  handleGenderPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ genderPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ genderStrict: true });
    }
  };

  handleCondition = (text) => {
    this.setState({ condition: text });
  };

  handleConditionPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ conditionPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ conditionStrict: true });
    }
  };

  handleSize = (text) => {
    this.setState({ size: text });
  };

  handleSizePriority = (text) => {
    if (text === 'Priority') {
      this.setState({ sizePriority: true });
    }
    if (text === 'Strict') {
      this.setState({ sizeStrict: true });
    }
  };

  handleColor = (text) => {
    this.setState({ color: text });
  };

  handleColorPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ colorPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ colorStrict: true });
    }
  };

  handleMaterial = (text) => {
    this.setState({ material: text });
  };

  handleMaterialPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ materialPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ materialStrict: true });
    }
  };

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <Dropdown
              ref={this.brandRef}
              onFocus={this.onFocus}
              label="Brand"
              data={brand}
              onChangeText={this.onChangeText}
            />

            <Dropdown
              ref={this.brandRef}
              onFocus={this.onFocus}
              baseColor="#edc374"
              value="None"
              label="Brand - Priority"
              data={setting}
              onChangeText={this.handleBrandPriority}
            />

            <TextField
              ref={this.modelRef}
              onFocus={this.onFocus}
              label="Model"
              onChangeText={this.handleModel}
            />

            <Dropdown
              ref={this.modelRef}
              onFocus={this.onFocus}
              baseColor="#edc374"
              value="None"
              label="Model - Priority"
              data={setting}
              onChangeText={this.handleModelPriority}
            />

            <Dropdown
              ref={this.typeRef}
              onFocus={this.onFocus}
              label="Type"
              data={type}
              onChangeText={this.handleType}
            />

            <Dropdown
              ref={this.typeRef}
              onFocus={this.onFocus}
              baseColor="#edc374"
              value="None"
              label="Type - Priority"
              data={setting}
              onChangeText={this.handleTypePriority}
            />

            <Dropdown
              ref={this.genderRef}
              onFocus={this.onFocus}
              label="Shoe Gender"
              data={gender}
              onChangeText={this.handleGender}
            />

            <Dropdown
              ref={this.genderRef}
              onFocus={this.onFocus}
              baseColor="#edc374"
              value="None"
              label="Shoe Gender - Priority"
              data={setting}
              onChangeText={this.handleGenderPriority}
            />

            <Dropdown
              ref={this.conditionRef}
              onFocus={this.onFocus}
              label="Condition"
              data={condition}
              onChangeText={this.handleCondition}
            />

            <Dropdown
              ref={this.conditionRef}
              onFocus={this.onFocus}
              baseColor="#edc374"
              value="None"
              label="Condition - Priority"
              data={setting}
              onChangeText={this.handleConditionPriority}
            />

            <Dropdown
              ref={this.conditionRef}
              onFocus={this.onFocus}
              label="Material"
              data={material}
              onChangeText={this.handleMaterial}
            />

            <Dropdown
              ref={this.materialRef}
              onFocus={this.onFocus}
              baseColor="#edc374"
              value="None"
              label="Material - Priority"
              data={setting}
              onChangeText={this.handleMaterialPriority}
            />

            <Dropdown
              ref={this.sizeRef}
              onFocus={this.onFocus}
              label="Size (UK)"
              data={size}
              onChangeText={this.handleSize}
            />

            <Dropdown
              ref={this.sizeRef}
              onFocus={this.onFocus}
              baseColor="#edc374"
              value="None"
              label="Size - Priority"
              data={setting}
              onChangeText={this.handleSizePriority}
            />

            <TextField
              ref={this.colorRef}
              onFocus={this.onFocus}
              label="Color"
              onChangeText={this.handleColor}
            />

            <Dropdown
              ref={this.colorRef}
              onFocus={this.onFocus}
              baseColor="#edc374"
              value="None"
              label="Color - Priority"
              data={setting}
              onChangeText={this.handleColorPriority}
            />
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.postContainer}>
          <Button
            title="Search"
            accessibilityLabel="Learn more about this purple button"
            onPress={this.onSubmit}
          />
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}
