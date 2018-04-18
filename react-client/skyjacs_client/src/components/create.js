import React from 'react';
import { Modal, CameraRoll, Image, Dimensions, RefreshControl, Button, Text, ScrollView, View, TouchableHighlight, StyleSheet, FlatList } from 'react-native';
import { TabNavigation } from 'react-navigation';
import { CheckBox } from 'react-native-elements' 
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectedPhoto from './selectedPhoto';

export default class CreateScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			value: 0,
			checked: false,
			username: '',
			email: '',
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
		    index: null,
		    showSelectedPhoto: false,
		};
	}
	//get dummy test user info
	componentDidMount(){
    	fetch('http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/users/?format=json')
      	.then((response) => response.json())
      	.then((responseJson) => {

        this.setState({
			isLoading: false,
          	dataSource: responseJson,
        },function() {
        	//
        	// SET USER DATA
        	// DUMMY TEST HERE
        	this.state.dataSource.map(function(user) {
			if ("sotoambak" == user.username) {
				this.setState({ username: user.username })
				}
			}.bind(this));

        }.bind(this));

  		})
      		.catch((error) =>{
        	console.error(error);
  		});

	}

	onChangeText(text) {
		['brand', 'type', 'gender', 'condition', 'size', 'color', 'description']
			.map((name) => ({ name, ref: this[name] }))
			.forEach(({ name, ref }) => {
				if (ref.isFocused()) {
					this.setState({ [name]: text });
				}
		});
	}

	_onSelect = ( item ) => {
      console.log(item);
    };

	//submit function need to rework
	onSubmit() {
		// var count = 0;
		// var data = new FormData();
		
		// // test dummy 
	 // 	data.append("user", "http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/users/2/")
  //       data.append("listing_type", "Buying")
  //       data.append("item_sex", this.state.gender)
  //       data.append("sex_priority", this.state.genderPriority)
  //       data.append("sex_strict", this.state.genderStrict)
  //       data.append("item_type", this.state.type)
  //       data.append("type_priority", this.state.typePriority)
  //       data.append("type_strict", this.state.typeStrict)
  //       data.append("item_brand", this.state.brand)
  //       data.append("brand_priority", this.state.brandPriority)
  //       data.append("brand_strict", this.state.brandStrict)
  //       data.append("item_model", this.state.model)
  //       data.append("model_priority", this.state.modelPriority)
  //       data.append("model_strict", this.state.modelStrict)
  //       data.append("item_condition", this.state.condition)
  //       data.append("condition_priority", this.state.conditionPriority)
  //       data.append("condition_strict", this.state.conditionStrict)
  //       data.append("item_colour", this.state.color)
  //       data.append("item_material", this.state.material)
  //       data.append("material_priority", this.state.materialPriority)
  //       data.append("material_strict", this.state.materialStrict)
  //       data.append("item_size", this.state.size)
  //       data.append("size_priority", this.state.sizePriority)
  //       data.append("size_strict", this.state.sizeStrict)

		// fetch("http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/listings/", {
		// 	method: 'POST',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'multipart/form-data',
		// 	},
		// 	body: data
		// })
		// 	.then((response) => response.json())
		// 	.then((responseJson) => {
		// 		console.log(responseJson);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error)
		// 		postSubmit(["Oops, something when wrong"]);
		// 	})

		this.props.navigation.navigate('Match')
	}

	handleBrand = (text) => {
		this.setState({ brand: text })
	}

	handleBrandPriority = (text) => {
		if (text == 'Priority') {
			this.setState({ brandPriority: true })		
		}
		if (text == 'Strict') {
			this.setState({ brandStrict: true })		
		}
	}

	handleModel = (text) => {
		this.setState({ model: text })
	}

	handleModelPriority = (text) => {
		if (text == 'Priority') {
			this.setState({ modelPriority: true })		
		}
		if (text == 'Strict') {
			this.setState({ modelStrict: true })		
		}
	}

	handleType = (text) => {
		this.setState({ type: text})
	}

	handleTypePriority = (text) => {
		if (text == 'Priority') {
			this.setState({ typePriority: true })		
		}
		if (text == 'Strict') {
			this.setState({ typeStrict: true })		
		}
	}

	handleGender = (text) => {
		this.setState({ gender: text})
	}

	handleGenderPriority = (text) => {
		if (text == 'Priority') {
			this.setState({ genderPriority: true })		
		}
		if (text == 'Strict') {
			this.setState({ genderStrict: true })		
		}
	}

	handleCondition = (text) => {
		this.setState({ condition: text })
	}

	handleConditionPriority = (text) => {
		if (text == 'Priority') {
			this.setState({ conditionPriority: true })		
		}
		if (text == 'Strict') {
			this.setState({ conditionStrict: true })		
		}
	}

	handleSize = (text) => { 
		this.setState({ size: text })
	}

	handleSizePriority = (text) => { 
		if (text == 'Priority') {
			this.setState({ sizePriority: true })		
		}
		if (text == 'Strict') {
			this.setState({ sizeStrict: true })		
		}
	}

	handleColor = (text) => {
		this.setState({ color: text })
	}

	handleColorPriority = (text) => {
		if (text == 'Priority') {
			this.setState({ colorPriority: true })		
		}
		if (text == 'Strict') {
			this.setState({ colorStrict: true })		
		}
	}

	handleMaterial = (text) => {
		this.setState({ material: text })
	}

	handleMaterialPriority = (text) => {
		if (text == 'Priority') {
			this.setState({ materialPriority: true })		
		}
		if (text == 'Strict') {
			this.setState({ materialStrict: true })		
		}
	}

	render() {

		const titleConfig = {
  			title: this.state.username,
		};

		return(
			
			<View style={styles.screen}>
				<View style={styles.container}>
	        		<KeyboardAwareScrollView>

		    			<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		  					label='Brand'
		        			data={brand}
		        			onChangeText={this.handleBrand}/>

		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			baseColor={'#edc374'}
		        			value={'None'}
		  					label='Brand - Priority'
		        			data={setting}
		        			onChangeText={this.handleBrandPriority}/>

		        		<TextField
		        			ref={this.colorRef}
		        			onFocus={this.onFocus}
		  					label='Model'
		        			onChangeText={this.handleModel}/>

		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			baseColor={'#edc374'}
		        			value={'None'}
		  					label='Model - Priority'
		        			data={setting}
		        			onChangeText={this.handleModelPriority}/>

		        		<Dropdown
		        			ref={this.typeRef}
		        			onFocus={this.onFocus}
		  					label='Type'
		        			data={type}
		        			onChangeText={this.handleType}/>

		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			baseColor={'#edc374'}
		        			value={'None'}
		  					label='Type - Priority'
		        			data={setting}
		        			onChangeText={this.handleTypePriority}/>

		        		<Dropdown
		        			ref={this.genderRef}
		        			onFocus={this.onFocus}
		  					label='Shoe Gender'
		        			data={gender}
		        			onChangeText={this.handleGender}/>

		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			baseColor={'#edc374'}
		        			value={'None'}
		  					label='Shoe Gender - Priority'
		        			data={setting}
		        			onChangeText={this.handleGenderPriority}/>

		        		<Dropdown
		        			ref={this.conditionRef}
		        			onFocus={this.onFocus}
		  					label='Condition'
		        			data={condition}
		        			onChangeText={this.handleCondition}/>

		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			baseColor={'#edc374'}
		        			value={'None'}
		  					label='Condition - Priority'
		        			data={setting}
		        			onChangeText={this.handleConditionPriority}/>

		        		<Dropdown
		        			ref={this.conditionRef}
		        			onFocus={this.onFocus}
		  					label='Material'
		        			data={material}
		        			onChangeText={this.handleMaterial}/>

		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			baseColor={'#edc374'}
		        			value={'None'}
		  					label='Material - Priority'
		        			data={setting}
		        			onChangeText={this.handleMaterialPriority}/>
		        		
		        		<Dropdown
		        			ref={this.sizeRef}
		        			onFocus={this.onFocus}
		  					label='Size (UK)'
		        			data={size}
		        			onChangeText={this.handleSize}/>

		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			baseColor={'#edc374'}
		        			value={'None'}
		  					label='Size - Priority'
		        			data={setting}
		        			onChangeText={this.handleSizePriority}/>

		        		<TextField
		        			ref={this.colorRef}
		        			onFocus={this.onFocus}
		  					label='Color'
		        			onChangeText={this.handleColor}/>

		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			baseColor={'#edc374'}
		        			value={'None'}
		  					label='Color - Priority'
		        			data={setting}
		        			onChangeText={this.handleColorPriority}/>

					</KeyboardAwareScrollView>
	    		</View>
	    		<View style={styles.postContainer}>
		    		<Button
						title="Search"
						accessibilityLabel="Learn more about this purple button"
						onPress={this.onSubmit.bind(this)}
						/>
	    		</View>
	    		<View style={styles.footer}/>
			</View>
    	);
	}
}

// get width of screen to scale for cameraroll images
const { width } = Dimensions.get('window')

const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: 'white'
	},
	radioFormContainer: {
		marginHorizontal: 2,
    	marginVertical: 2,
	},
	modalContainer: {
    	paddingTop: 20,
    	flex: 1
	},
  	scrollView: {
    	flexWrap: 'wrap',
    	flexDirection: 'row'
  	},
	container: {
		marginHorizontal: 4,
    	marginVertical: 12,
    	paddingHorizontal: 12,
    	paddingBottom: 40
	},
	postContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
		bottom: 7,
		zIndex: 10
	},
	input: {
		margin: 15,
		height: 50,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginHorizontal:20,
		marginBottom:20,
		borderWidth: 1,
		fontSize: 18
	},
	footer: {
		height: 60,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'white'
	}

});

const setting = [{
	value: 'None',
}, {
	value: 'Strict',
}, {
	value: 'Priority',
}];

const brand = [{
 	value: 'Adidas',
}, {
  	value: 'Nike',
}, {
  	value: 'Puma',
}, {
	value: 'Reebok',
}, {
	value: 'Underarmor',
}, {
	value: 'New Balance',
}, {
	value: 'Converse',
}, {
	value: 'Vans',
}, {
	value: 'Air Jordan',
}, {
	value: 'Asics',
}, {
	value: 'Saucony',
}];

const type = [{
 	value: 'Low Top',
}, {
  	value: 'High Top',
}, {
  	value: 'Slip On',
}, {
	value: 'Runners/Joggers',
}, {
	value: 'Basketball',
}, {
	value: 'Skaters',
}, {
	value: 'Cageless',
}];

const gender = [{
 	value: 'Male',
}, {
  	value: 'Female',
}];

const condition = [{
 	value: 'Damaged',
}, {
  	value: 'Well-worn',
}, {
  	value: 'Good Condition',
}, {
	value: 'New/Little use',
}, {
	value: 'Boxed Mint',
}];

const material = [{
	value: 'Canvas'
}, {
	value: 'Real Leather'
}, {
	value: 'Artificial Leather'
}, {
	value: 'Plastic/Synthetic'
}, {
	value: 'Mesh'
}]

const size = [{
	value: 4
}, {
	value: 4.5
}, {
	value: 5
}, {
	value: 5.5
}, {
	value: 6
}, {
	value: 6.5
}, {
	value: 7
}, {
	value: 7.5
}, {
	value: 8
}, {
	value: 8.5
}, {
	value: 9
}, {
	value: 9.5
}, {
	value: 10
}, {
	value: 10.5
}, {
	value: 11.5
}, {
	value: 12
}, {
	value: 12.5
}, {
	value: 13
}, {
	value: 13.5
}, {
	value: 14
}, {
	value: 14.5
}]



