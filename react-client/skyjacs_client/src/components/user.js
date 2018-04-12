import React from 'react';
import { Modal, CameraRoll, Image, Dimensions, RefreshControl, Button, Text, ScrollView, View, TouchableHighlight, StyleSheet } from 'react-native';
import { TabNavigation } from 'react-navigation';
import NavigationBar from 'react-native-navbar';
import { CheckBox } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectedPhoto from './selectedPhoto';


export default class UserScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			checked: false,
			username: '',
			email: '',
			brand: '',
			type: '',
			gender: '',
			condition: '',
			size: '',
			color: '',
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

	//submit function need to rework
	onSubmit() {
		var count = 0;
		var data = new FormData();
		data.append('title');

		fetch("http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/shoes/", {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: data
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
			})
			.catch((error) => {
				console.log(error)
				postSubmit(["Oops, something when wrong"]);
			})

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

	render() {
		const titleConfig = {
  			title: this.state.username,
		};

		return(
			
			<View style={styles.screen}>
				<NavigationBar
	      			tintColor={'green'}
	        		title={titleConfig}
	        		rightButton={rightButtonConfig}
  				/>
				<View style={styles.userHeader}>
					
				</View>
				<View style={styles.container}>
	        		<KeyboardAwareScrollView>
		        		<Dropdown
		        			ref={this.brandRef}
		        			onFocus={this.onFocus}
		  					label='Brand'
		        			data={brand}
		        			onChangeText={this.handleBrand}/>


		        		<CheckBox
					     	title='Click Here'
							checked={this.state.checked}
							// onPress={() => this.setState( checked: true)}
						/>

		        		<Dropdown
		        			ref={this.typeRef}
		        			onFocus={this.onFocus}
		  					label='Type'
		        			data={type}
		        			onChangeText={this.handleType}/>

		        		<Dropdown
		        			ref={this.genderRef}
		        			onFocus={this.onFocus}
		  					label='Shoe Gender'
		        			data={gender}
		        			onChangeText={this.handleGender}/>

		        		<Dropdown
		        			ref={this.conditionRef}
		        			onFocus={this.onFocus}
		  					label='Condition'
		        			data={condition}
		        			onChangeText={this.handleCondition}/>
		        		
		        		<TextField
		        			ref={this.sizeRef}
		        			onFocus={this.onFocus}
		  					label='Size (US)'
		        			onChangeText={this.handleSize}/>

		        		<TextField
		        			ref={this.colorRef}
		        			onFocus={this.onFocus}
		  					label='Color'
		        			onChangeText={this.handleColor}/>/>

					</KeyboardAwareScrollView>
	    		</View>
	    		<View style={styles.postContainer}>
		    		<Button
						title="Search"
						accessibilityLabel="Learn more about this purple button"
						onPress={this.onSubmit}
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
	},
	modalContainer: {
    	paddingTop: 20,
    	flex: 1
	},
	userHeader: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
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
		backgroundColor: 'green'
	}

});

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