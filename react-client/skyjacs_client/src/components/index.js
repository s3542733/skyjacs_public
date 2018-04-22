import { TabNavigator, StackNavigator } from 'react-navigation';
// tabs
import HomeScreen from './home';
import StarredScreen from './starred';
import PostScreen from './post';
import NotificationScreen from './notification';
// user stack
import UserScreen from './user';
import CreateScreen from './create';
import MatchScreen from './match';
import DetailScreen from './detail';
// login stack
import SignInScreen from './auth/signIn';
import SignUpScreen from './auth/signUp';

export const UserStack = StackNavigator({
  User: {
    screen: UserScreen,
    navigationOptions: ({
      title: 'User',
    }),
  },
  Create: {
    screen: CreateScreen,
    navigationOptions: ({
      title: 'Create Match',
    }),
  },
  Match: {
    screen: MatchScreen,
    navigationOptions: ({
      title: 'Found Matches',
    }),
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({
      title: 'Detail View',
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
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
    },
  },
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
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
  Tabs: {
    screen: Tabs,
  },
}, {
  headerMode: 'none',
});
