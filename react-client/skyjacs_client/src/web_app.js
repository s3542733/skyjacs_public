import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
// tabs
// login stack
import SignInScreen from './auth/login';
import LoginForm from './auth/signUp';
// import User from './user';
import HomeScreen from './home';
import UserScreen from './user';
import MatchScreen from './match';
export const UserStack = StackNavigator({
  Match: {
    screen: MatchScreen,
    navigationOptions: ({
      title: 'Found Matches',
    }),
  },
});

// export const PostStack = StackNavigator({
//   Post: {
//     screen: PostScreen,
//     navigationOptions: {
//       title: 'Post',
//     },
//   },
// });

export const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
    },
  },
});

export const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  User: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: 'User',
    },
  }
}, {
  animationEnabled: true,
  swipeEnable: false,
  tabBarPosition: 'Top',
  tarBarOptionL: {
    activeTintColor: '#2980b6',
    inactiveTintColor: '#d1cece',
    showLabel: false,
  },
});

const Root = StackNavigator({
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: LoginForm,
  },
  User: {
      screen: UserScreen,
      navigationOptions: {
      tabBarLabel: 'User',
    },
  },
  Tabs: {
    screen: Tabs,
  },
}, {
  headerMode: 'none',
});

export default class App extends Component {
  render() {
    return (
      <Root />
    );
  }
}

