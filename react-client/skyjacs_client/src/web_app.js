import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
// tabs
// login stack
import SignInScreen from './auth/login';
import LoginForm from './auth/signUp';
import User from './user';

// export const UserStack = StackNavigator({
//   Match: {
//     screen: MatchScreen,
//     navigationOptions: ({
//       title: 'Found Matches',
//     }),
//   },
// });

// export const PostStack = StackNavigator({
//   Post: {
//     screen: PostScreen,
//     navigationOptions: {
//       title: 'Post',
//     },
//   },
// });

// export const HomeStack = StackNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       title: 'Home',
//     },
//   },
// });

// export const Tabs = TabNavigator({
//   Home: {
//     screen: HomeStack,
//     navigationOptions: {
//       title: 'Home',
//     },
//   },
//   User: {
//     screen: UserStack,
//     navigationOptions: {
//       tabBarLabel: 'User',
//     },
//   },
//   Post: {
//     screen: PostStack,
//     navigationOptions: {
//       tabBarLabel: 'Post',
//     },

//   },
//   Starred: { screen: StarredScreen },
//   Notification: { screen: NotificationScreen },
// }, {
//   animationEnabled: true,
//   swipeEnable: true,
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     activeTintColor: '#2980b6',
//     inactiveTintColor: '#d1cece',
//     showIcon: true,
//     showLabel: false,
//   },
// });

const Root = StackNavigator({
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: LoginForm,
  },
  User: {
      screen: User,
      navigationOptions: {
      tabBarLabel: 'User',
    },
  },
  // Tabs: {
  //   screen: Tabs,
  // },
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

