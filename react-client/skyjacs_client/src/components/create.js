import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { material, sanFranciscoWeights } from 'react-native-typography';
import IP_ADDRESS from './constants';
import { brand, type, setting, gender, condition, materials, size } from './createConstants';
import { Card } from 'react-native-elements';

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
    padding: 20,
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
  constructor(props) {
    super(props);

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

    this.state = {
      brand: '',
      type: '',
      model: '',
      gender: '',
      condition: '',
      size: '',
      color: '',
      materials: '',
      brandPriority: false,
      typePriority: false,
      modelPriority: false,
      genderPriority: false,
      conditionPriority: false,
      sizePriority: false,
      colorPriority: false,
      materialsPriority: false,
      brandStrict: false,
      modelStrict: false,
      typeStrict: false,
      genderStrict: false,
      conditionStrict: false,
      sizeStrict: false,
      colorStrict: false,
      materialsStrict: false,
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
    ['brand', 'model', 'materials', 'type', 'gender', 'condition', 'size', 'color']
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
    data.append('item_materials', this.state.materials);
    data.append('materials_priority', this.state.materialsPriority);
    data.append('materials_strict', this.state.materialsStrict);
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

  handleMaterialsPriority = (text) => {
    if (text === 'Priority') {
      this.setState({ materialsPriority: true });
    }
    if (text === 'Strict') {
      this.setState({ materialsStrict: true });
    }
  };

  renderForm = () => {
    return (
      <KeyboardAwareScrollView>
        <Text style={[material.headline, sanFranciscoWeights.semibold]}>
          Describe your shoe to us!
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
          ref={this.materialsRef}
          label="Materials"
          data={materials}
          onChangeText={this.onChangeText}
        />

        <Dropdown
          ref={this.materialsPriorityRef}
          baseColor="#edc374"
          value="None"
          label="Materials - Priority"
          data={setting}
          onChangeText={this.handleMaterialsPriority}
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
    );
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Card>
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
