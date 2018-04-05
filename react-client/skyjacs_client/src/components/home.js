import React from 'react';
import { Button, FlatList, Text, View, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { List, ListItem, Avatar, Card } from 'react-native-elements';
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

	render(){
		// loading items from dbs
	    if(this.state.isLoading){
			return(
	        <View style={{flex: 1, padding: 20}}>
				<ActivityIndicator/>
	        </View>
			)
	    }
	    // main view
	    return (
      	<View style={styles.container}>
	        <View style={styles.searchContainer}>
		        <Button
		        	style={styles.search}
					title="Search Bar"
					color="#841584"
					accessibilityLabel="Learn more about this purple button"
					/>
			</View>
	        
	        <ScrollView>
				<View style={[styles.content]}>
		            <View style={styles.header}>
						<Text style={{backgroundColor: 'green'}}>Header</Text>
					</View>
					<View style={styles.box}>
						<Text style={styles.boxText}>Latest</Text>
				        <FlatList
				        	horizontal={true}
							data={this.state.dataSource}
				          	renderItem={({item}) => 
					          	<Avatar
					              	source={{ url: item.photo }}
					              	containerStyle={{ padding: 0, width: 160 }}
					              	avatarStyle={{resizeMode: "cover"}}
					              	width={140}
	              					height={130}
					            />
				    		}		
				          	keyExtractor={(item, id) => id}
				        />
					</View>
					<View style={styles.box}>
						<Text style={styles.boxText}>Popular</Text>
						<FlatList
				        	horizontal={true}
							data={this.state.dataSource}
				          	renderItem={({item}) => 
				          		<Avatar
					              	source={{ url: item.photo }}
					              	containerStyle={{ padding: 0, width: 160 }}
					              	avatarStyle={{resizeMode: "cover"}}
					              	width={140}
	              					height={130}
					            />
				    		}		
				          	keyExtractor={(item, id) => id}
				        />
					</View>
					<View style={styles.box}>
						<Text style={styles.boxText}>Recently Viewed</Text>
						<FlatList
				        	horizontal={true}
							data={this.state.dataSource}
				          	renderItem={({item}) => 
				          		<Avatar
					              	source={{ url: item.photo }}
					              	containerStyle={{ padding: 0, width: 160 }}
					              	avatarStyle={{resizeMode: "cover"}}
					              	width={140}
	              					height={130}
					            />
				    		}		
				          	keyExtractor={(item, id) => id}
				        />
					</View>
				</View>
	        </ScrollView>
		</View>
    	);
  	}
}
 
const styles = StyleSheet.create({
container: {
	flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 19,
},
searchContainer: {
    position: 'absolute',
    right: 30,
    top: 50,
    zIndex: 10
},
content: {
    alignItems: 'center'
},
footer: {
    height: 40,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#8BC34A'
},
header: {
	borderWidth: 10,
	borderColor: '#fbefda',
	width: '100%',
    height: 200,
    backgroundColor: '#aaaaaa',
    marginBottom: 10
},
box: {
	flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
	justifyContent: 'center',
	borderWidth: 10,
	borderColor: '#fbefda',
	width: '100%',
    height: 200,
    backgroundColor: '#aaaaaa',
    marginBottom: 10
},
boxText: {
	position: 'absolute',
	top: 0,
	left: 0,
	zIndex: 10, 
	backgroundColor: 'green'
},
search: {
	width: 30,
	height: 20,
	backgroundColor: 'black'
}
});