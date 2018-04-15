import React from 'react';
import { Modal, ScrollView, Image, CameraRoll, Button, View, Text, TouchableHighlight, StyleSheet } from 'react-native'; 

export default class MatchScreen extends React.Component {

	state = {
		dataSource: [],
	}

	componentDidMount(){
    	return fetch('http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/matches/2')
      	.then((response) => response.json())
      	.then((responseJson) => {

        this.setState({
			isLoading: false,
          	dataSource: responseJson,
        },function(){

        });

  		})
      		.catch((error) =>{
        	console.error(error);
  		});
	}

	render() {
   		const { dataSource } = this.state;
		return (
			<View>
				<ScrollView>
				{
					this.state.dataSource.map((item, index) => (
						<View key = {item.uid} style = {styles.item}>
							<Text>
							Brand: {item.item_brand}{"\n"}
							Type: {item.item_type}{"\n"}
							Model: {item.item_model}{"\n"}
							Gender: {item.item_gender}{"\n"}
							Condition: {item.item_condition}{"\n"}
							Size: {item.item_size}{"\n"}
							Colour: {item.item_colour}{"\n"}
							Material: {item.item_material}{"\n"}
							Match Percentage: {item.item_matching}%</Text>
						</View>
					))
				}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create ({
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   }
})