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
    this.onChangeText = this.onChangeText.bind(this);

    this.modelRef = this.updateRef.bind(this, 'model');
    this.materialRef = this.updateRef.bind(this, 'material');
    this.brandRef = this.updateRef.bind(this, 'brand');
    this.typeRef = this.updateRef.bind(this, 'type');
    this.genderRef = this.updateRef.bind(this, 'gender');
    this.conditionRef = this.updateRef.bind(this, 'condition');
    this.sizeRef = this.updateRef.bind(this, 'size');
    this.colorRef = this.updateRef.bind(this, 'color');

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
    ['brand', 'model', 'material', 'type', 'gender', 'condition', 'size', 'color']
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmit() {
    const data = new FormData();

    // test dummy
    data.append('user', `${IP_ADDRESS}users/2/`);
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

    fetch(`${IP_ADDRESS}listings/`, {
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

    this.props.navigation.navigate('Match');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  handleBrandPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ brandPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ brandStrict: true });
    }
  };

  handleModelPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ modelPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ modelStrict: true });
    }
  };

  handleTypePriority = (text) => {
    if (text === 'Priority') {
      this.setState({ typePriority: true });
    }
    if (text === 'Strict') {
      this.setState({ typeStrict: true });
    }
  };

  handleGenderPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ genderPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ genderStrict: true });
    }
  };

  handleConditionPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ conditionPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ conditionStrict: true });
    }
  };

  handleSizePriority = (text) => {
    if (text === 'Priority') {
      this.setState({ sizePriority: true });
    }
    if (text === 'Strict') {
      this.setState({ sizeStrict: true });
    }
  };

  handleColorPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ colorPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ colorStrict: true });
    }
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
              label="Brand"
              data={brand}
              onChangeText={this.onChangeText}
            />

            <Dropdown
              ref={this.brandPriorityRef}
              baseColor="#edc374"
              value="None"
              label="Brand - Priority"
              data={setting}
              onChangeText={this.handleBrandPriority}
            />

            <TextField
              ref={this.modelRef}
              label="Model"
              onChangeText={this.onChangeText}
            />

            <Dropdown
              ref={this.modelPriorityRef}
              baseColor="#edc374"
              value="None"
              label="Model - Priority"
              data={setting}
              onChangeText={this.handleModelPriority}
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
              value="None"
              label="Type - Priority"
              data={setting}
              onChangeText={this.handleTypePriority}
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
              value="None"
              label="Shoe Gender - Priority"
              data={setting}
              onChangeText={this.handleGenderPriority}
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
              value="None"
              label="Condition - Priority"
              data={setting}
              onChangeText={this.handleConditionPriority}
            />

            <Dropdown
              ref={this.materialRef}
              label="Material"
              data={material}
              onChangeText={this.onChangeText}
            />

            <Dropdown
              ref={this.materialPriorityRef}
              baseColor="#edc374"
              value="None"
              label="Material - Priority"
              data={setting}
              onChangeText={this.handleMaterialPriority}
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
              value="None"
              label="Size - Priority"
              data={setting}
              onChangeText={this.handleSizePriority}
            />

            <TextField
              ref={this.colorRef}
              label="Color"
              onChangeText={this.onChangeText}
            />

            <Dropdown
              ref={this.colorPriorityRef}
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
