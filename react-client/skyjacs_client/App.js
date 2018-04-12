import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './src/components/home';
import UserScreen from './src/components/user';
import StarredScreen from './src/components/starred';
import PostScreen from './src/components/post';
import NotificationScreen from './src/components/notification';

export default TabNavigator({
  Home: { screen: HomeScreen },
  User: { screen: UserScreen },
  Post: { screen: PostScreen },
  Starred: { screen: StarredScreen },
  Notification: { screen: NotificationScreen },
});
