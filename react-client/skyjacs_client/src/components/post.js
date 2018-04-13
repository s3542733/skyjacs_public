import React from 'react';
import { Modal, CameraRoll, Image, Dimensions, RefreshControl, Button, Text, ScrollView, View, TouchableHighlight, StyleSheet } from 'react-native';
import { TabNavigation } from 'react-navigation';
import { CheckBox } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectedPhoto from './selectedPhoto';
import ImageUpload from './imageUpload';

export default class PostScreen extends React.Component {
	constructor(props){
		super(props);

		this.onFocus = this.onFocus.bind(this);
      	this.onSubmit = this.onSubmit.bind(this);
      	this.onSubmitBrand = this.onSubmitBrand.bind(this);
      	this.onSubmitType = this.onSubmitType.bind(this);
      	this.onSubmitGender = this.onSubmitGender.bind(this);
      	this.onSubmitCondition = this.onSubmitCondition.bind(this);
      	this.onSubmitSize = this.onSubmitSize.bind(this);
      	this.onSubmitColor = this.onSubmitColor.bind(this);
      	this.onSubmitDescription = this.onSubmitDescription.bind(this);

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
			gender: '',
			condition: '',
			size: '',
			color: '',
			description: '',
			modalVisible: false,
	    	photos: [],
		    index: null,
		    showSelectedPhoto: false,
    		uri: ''
		};
	}

	onFocus() {
		let { errors = {} } = this.state;

		for (let name in errors) {
			let ref = this[name];

			if (ref && ref.isFocused()) {
				delete errors[name];
			}	
		}
		this.setState({ errors })
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

	updateRef(name, ref) {
		this[name] = ref;
	}

	onSubmit() {
		// let errors = {};
		// var count = 0;

		// ['brand', 'type', 'gender', 'condition', 'size', 'color', 'description']
		// 	.forEach((name) => {
		// 		let value = this[name].value();

		// 		if(!value) {
		// 			errors[name] = 'Should not be empty';
		// 			count++;
		// 		} else {
		// 		// if size is not a number throw error
		// 		}
		// 	});
		// this.setState({ errors })

		// if (this.state.showSelectedPhoto) {
		// 	var photo = {
		// 		uri: this.state.uri,
		// 		type: 'image/jpeg',
		// 		name: 'photo.jpeg'
		// 	}
		// }
		
		// var data = new FormData();
		// data.append('photo', photo);
		// data.append('title', 'random photo');

		// fetch("http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/listing/", {
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
		
		this.props.navigation.navigate('ImageUpload');

	}

	// getting camera data

	getPhotos = () => {
    	CameraRoll.getPhotos({
      		first: 100,
      		assetType: 'All'
    	})
    	.then(r => this.setState({ photos: r.edges }))
  	}

  	toggleModal = () => {
    	this.setState({ modalVisible: !this.state.modalVisible });
  	}

  	setIndex = (index) => {
    	if (index === this.state.index) {
      		index = null
    	}
    	this.setState({ index })
    	alert(index)
    	this.setState({ modalVisible: !this.state.modalVisible });
  	}


	handleBrand = (text) => {
		this.setState({ brand: text })
	}

	handleType = (text) => {
		this.setState({ type: text})
	}

	handleGender = (text) => {
		this.setState({ gender: text})
	}

	handleCondition = (text) => {
		this.setState({ condition: text })
	}

	handleSize = (text) => { 
		this.setState({ size: text })
	}

	handleColor = (text) => {
		this.setState({ color: text })
	}

	handleDescription = (text) => {
		this.setState({ description: text })
	}

	post = (brand, type, gender, condition, size, color, description) => {
		alert('brand: ' + brand + '\n' +
			'type: ' + type + '\n' +
			'gender: ' + gender + '\n' +
			'condition: ' + condition + '\n' +
			'size: ' + size + '\n' +
			'color: ' + color + '\n' +
			'description: ' + description)
	}

	renderSelectedPhoto = (showSelectedPhoto, uri) =>  {
		if (showSelectedPhoto) {
			return (
				<SelectedPhoto uri={uri} />
			)
		}
	}

	render() {
		const { showSelectedPhoto, uri, errors = {} } = this.state;

		return(
			<View style={styles.screen}>
				<View style={styles.container}>
	        		<KeyboardAwareScrollView>
		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		        			error={errors.brand}
		  					label='Brand'
		        			data={brand}
		        			onSubmitEditing={this.onSubmitBrand}
		        			onChangeText={this.handleBrand}/>
		        		<Dropdown
		        			ref={this.typeRef}
		        			onFocus={this.onFocus}
		  					error={errors.type}
		  					label='Type'
		        			data={type}
		        			onSubmitEditing={this.onSubmitType}
		        			onChangeText={this.handleType}/>

		        		<Dropdown
		        			ref={this.genderRef}
		        			onFocus={this.onFocus}
		  					error={errors.gender}
		  					label='Shoe Gender'
		        			data={gender}
		        			onSubmitEditing={this.onSubmitGender}
		        			onChangeText={this.handleGender}/>

		        		<Dropdown
		        			ref={this.conditionRef}
		        			onFocus={this.onFocus}
		  					error={errors.condition}
		  					label='Condition'
		        			data={condition}
		        			onSubmitEditing={this.onSubmitCondition}
		        			onChangeText={this.handleCondition}/>
		        		
		        		<TextField
		        			ref={this.sizeRef}
		        			onFocus={this.onFocus}
		  					error={errors.size}
		  					label='Size (US)'
		        			onSubmitEditing={this.onSubmitSize}
		        			onChangeText={this.handleSize}/>

		        		<TextField
		        			ref={this.colorRef}
		        			onFocus={this.onFocus}
		  					error={errors.color}
		  					label='Color'
		        			onSubmitEditing={this.onSubmitColor}
		        			onChangeText={this.handleColor}/>/>

		        		<TextField
		        			ref={this.descriptionRef}
		        			onFocus={this.onFocus}
							error={errors.description}
							label="Description"
							multiline={true}
							onSubmitEditing={this.onSubmitDescription}
							onChangeText={this.handleDescription}
							characterRestriction={255}/>

						{ this.renderSelectedPhoto(showSelectedPhoto, uri) }

					</KeyboardAwareScrollView>
	    		</View>
	    		<View style={styles.postContainer}>
		    		<Button
						title="Submit"
						accessibilityLabel="Learn more about this purple button"
						onPress={() => this.props.navigation.navigate('ImageUpload')}
						/>
					<Button
      				title='Add Photo'
      				onPress={() => { this.toggleModal(); this.getPhotos() }}
        			/>
        			<Modal
						animationType={"slide"}
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => console.log('closed')}>
						<View style={styles.modalContainer}>
							<Button
								title='Close'
								onPress={this.toggleModal}
							/>
							<ScrollView contentContainerStyle={styles.scrollView}>
								{
								this.state.photos.map((p, i) => {
								const { uri } = p.node.image;
								return (
									<TouchableHighlight
										style={{opacity: i === this.state.index ? 0.5 : 1
										}}
										key={i}
										underlayColor='transparent'
										onPress={() => this.setState({ 
											showSelectedPhoto: true, 
											uri: uri, 
											modalVisible: !this.state.modalVisible
										})}>
										<Image
											style={{
											width: width/3,
											height: width/3
											}}
											source={{uri: p.node.image.uri}}
										/>
									</TouchableHighlight>
									)
								})
							}
							</ScrollView>
						</View>
        			</Modal>
	    		</View>
	    		<View style={styles.footer}/>
			</View>
    	);
	}
}

// get width of screen to scale for cameraroll images
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: 'white'
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
    	marginVertical: 8,
    	paddingHorizontal: 8,
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

const rightButtonConfig = {
  title: 'Next',
  handler: () => alert('hello!'),
};

const titleConfig = {
  title: 'Post',
};

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
 	value: 'Low top Sneakers',
}, {
  	value: 'High top Sneakers',
}, {
  	value: 'Slip on Sneakers',
}, {
	value: 'Runners/Joggers',
}, {
	value: 'Basketball',
}, {
	value: 'Skaters',
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

