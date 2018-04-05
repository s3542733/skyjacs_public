import React from 'react';
import { FlatList, Text, View, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import { TabNavigation } from 'react-navigation';

export default class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state ={ isLoading: true,
		base_url: "http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com"}
	}	

  	componentDidMount(){
    	return fetch('http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/shoes/?format=json')
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

	renderSeperator = () => {
		return(
			<View style={styles.seperator}/>
		);
	};


	render(){
	    if(this.state.isLoading){
			return(
	        <View style={{flex: 1, padding: 20}}>
				<ActivityIndicator/>
	        </View>
			)
	    }
	    return(
			<ScrollView>

			<View style={styles.header}>
			<Text style={{backgroundColor: 'green'}}>Header</Text>
			</View>

			<View style={styles.latest}>
				<Text style={{backgroundColor: 'green'}}>Latest</Text>
		        <FlatList
		        	horizontal={true}
					data={this.state.dataSource}
		          	renderItem={({item}) => <Image 
						source={{uri: `${item.photo}`}} 
						style={{height: 100, width: 150}}
						resizeMode= 'cover'
		        		/>
		    		}		
		    		ItemSeperatorComponent={this.renderSeperator}
		          	keyExtractor={(item, id) => id}
		        />
			</View>

			<View style={styles.popular}>
				<Text style={{backgroundColor: 'green'}}>Popular</Text>
				<FlatList
		        	horizontal={true}
					data={this.state.dataSource}
		          	renderItem={({item}) => <Image 
						source={{uri: `${item.photo}`}} 
						style={{height: 100, width: 150}}
						resizeMode= 'cover'
		        		/>
		    		}		
		          	keyExtractor={(item, id) => id}
		        />
			</View>

			<View style={styles.recent}>
				<Text style={{backgroundColor: 'green'}}>Recently Viewed</Text>
				<FlatList
		        	horizontal={true}
					data={this.state.dataSource}
		          	renderItem={({item}) => <Image 
						source={{uri: `${item.photo}`}} 
						style={{height: 100, width: 150}}
						resizeMode= 'cover'
		        		/>
		    		}		
		          	keyExtractor={(item, id) => id}
		        />
			</View>


	  		</ScrollView>
	    );

  	}
}

const styles = StyleSheet.create({
	header: {
		height: 260, 
		backgroundColor: '#6eb7ac',
	},
	latest: {
		height: 200, 
		backgroundColor: '#fbefda',
	},
	popular: {
		height: 200, 
		backgroundColor: '#aaaaaa',
	},
	recent: {
		height: 200,
		backgroundColor: '#b76e79',
	},
	seperator: {
		paddingLeft: "10%",
	},
});



