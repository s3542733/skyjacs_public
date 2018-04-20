import { TabNavigator, StackNavigator } from 'react-navigation';

import HomeScreen from './home';
import UserScreen from './user';
import StarredScreen from './starred';
import PostScreen from './post';
import NotificationScreen from './notification';
import MatchScreen from './match';
import LoginScreen from './login';
import CreateScreen from './create';
// import ImageUploadScreen from './imageUpload';

export const UserStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
    },
  },
  User: {
    screen: UserScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'User',
    }),
  },
  Create: {
    screen: CreateScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Match',
    }),
  },
  Match: {
    screen: MatchScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Found Matches',
    }),
  },
});

export const PostStack = StackNavigator({
  Post: {
    screen: PostScreen,
    navigationOptions: {
      title: 'Post',
    },
  },
});

export const Tabs = TabNavigator({
  Home: { screen: HomeScreen },
  User: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: 'User',
    },
  },
  Post: {
    screen: PostStack,
    navigationOptions: {
      tabBarLabel: 'Post',
    },

  },
  Starred: { screen: StarredScreen },
  Notification: { screen: NotificationScreen },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
