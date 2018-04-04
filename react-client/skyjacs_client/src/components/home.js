import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { TabNavigation } from 'react-navigation';

export default class HomeScreen extends React.Component {
	render() {
		return (
			// parent view
			<ScrollView>

		      	<View style={{
			        flex: 1,
			        flexDirection: 'column',
			    }}>
			    	// child views

			        <View style={{height: 260, backgroundColor: '#6eb7ac'}} />

			        // popular

			        <View style={{height: 200, backgroundColor: '#ccc7b9'}}>
			        	<View>
			        		<Text>Popular Items</Text>
			        	</View>
			        	<ScrollView horizontal={true}>
			        		
			        	</ScrollView>
			        </View>

			        // recently viewed

			        <View style={{height: 200, backgroundColor: '#fbefda'}}>
			        	<View>
			        		<Text>Recently Viewed</Text>
			        	</View>
			        	<ScrollView horizontal={true}>
			        		
			        	</ScrollView>
			        </View>

			        // newly listed

			        <View style={{height: 200, backgroundColor: '#aaaaaa'}}>
			        	<View>
			        		<Text>Newly Listed</Text>
			        	</View>
			        	<ScrollView horizontal={true}>
			        		
			        	</ScrollView>
			        </View>

			        // starred items

			        <View style={{height: 200, backgroundColor: '#b76e79'}}>
			        	<View>
			        		<Text>Starred Items</Text>
			        	</View>
			        	<ScrollView horizontal={true}>
			        		
			        	</ScrollView>
			        </View>

			    </View>

		    </ScrollView>
     	);
	}
}