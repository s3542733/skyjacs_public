import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import HomeScreen from './home';
import UserScreen from './user';
import StarredScreen from './starred';
import PostScreen from './post';
import NotificationScreen from './notification';
import ImageUploadScreen from './imageUpload';

export const PostStack = StackNavigator({
	Post: {
		screen: PostScreen,
		navigationOptions: {
			title: 'Post'
		},
	},
	ImageUpload: {
		screen: ImageUploadScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Image Upload',
		}),
	},
});

export const Tabs = TabNavigator({
	Home: { screen: HomeScreen },
	User: { screen: UserScreen },
	Post: { 
		screen: PostStack,
		navigationOptions: {
			tabBarLabel: 'Post'
		}

	},
	Starred: { screen: StarredScreen },
	Notification: { screen: NotificationScreen },
});

// app calls root which calls the tab screen
export const Root = StackNavigator({
	Tabs: {
		screen: Tabs,
	},
}, 	{
		mode: 'modal',
		headerMode: 'none',
});