import React from 'react';
import { FlatList, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
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
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Image 
				source={{uri: `${item.photo}`}} 
				style={{height: 600, width: 600}}
				resizeMode= 'cover'
        		/>
    		}		
          keyExtractor={(item, id) => id}
        />
      </View>
    );
  }
}