import React from 'react';
import { Modal, CameraRoll, Image, Dimensions, RefreshControl, Button, Text, ScrollView, View, TouchableHighlight, StyleSheet } from 'react-native';
import { TabNavigation } from 'react-navigation';
import NavigationBar from 'react-native-navbar';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class PostScreen extends React.Component {
	constructor(props){
		super(props);
		
	}

	state = {
		brand: '',
		type: '',
		gender: '',
		condition: '',
		size: '',
		color: '',
		description: '',
		modalVisible: false,
    	photos: [],
	    index: null
	}
	

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

	render() {
		return(
			<View style={styles.screen}>
				<NavigationBar
	      			tintColor={'green'}
	        		title={titleConfig}
	        		rightButton={rightButtonConfig}
  				/>
				<View style={styles.container}>
	        		<KeyboardAwareScrollView>
		        		<Dropdown
		  					label='Brand'
		        			data={brand}
		        			onChangeText={this.handleBrand}/>

		        		<Dropdown
		  					label='Type'
		        			data={type}
		        			onChangeText={this.handleType}/>

		        		<Dropdown
		  					label='Gender'
		        			data={gender}
		        			onChangeText={this.handleGender}/>

		        		<Dropdown
		  					label='Condition'
		        			data={condition}
		        			onChangeText={this.handleCondition}/>
		        		
		        		<TextField
		  					label='Size'
		        			onChangeText={this.handleSize}/>

		        		<TextField
		  					label='Color'
		        			onChangeText={this.handleColor}/>/>

		        		<TextField
							label="Description"
							onChangeText={this.handleDescription}/>
					</KeyboardAwareScrollView>
	    		</View>
	    		<View style={styles.postContainer}>
		    		<Button
			        	style={styles.post}
						title="Upload"
						color="black"
						accessibilityLabel="Learn more about this purple button"
						onPress={() => this.post(this.state.brand, this.state.type, this.state.gender,
							this.state.condition, this.state.size, this.state.color, this.state.description)}
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
								return (
									<TouchableHighlight
										style={{opacity: i === this.state.index ? 0.5 : 1
										}}
										key={i}
										underlayColor='transparent'
										onPress={() => this.setIndex(i)}>
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

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	screen: {
		flex: 1,
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
	},
	postContainer: {
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
		backgroundColor: 'green'
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

