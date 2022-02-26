// /* eslint-disable react/display-name */
// // import {
// //   createAppContainer,
// //   createStackNavigator,
// //   createSwitchNavigator,
// //   createBottomTabNavigator,
// // } from 'react-navigation'

// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import React from 'react'
// import { Image } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
// import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import MainScreen from '../Containers/Main/MainScreen'
// import SubscriptionScreen from '../Containers/Subscription/SubscriptionScreen'
// import NetworkErrorScreen from '../Containers/NetworkError/NetworkErrorScreen'
// import CalendarScreen from '../Containers/Calendar/CalendarScreen'
// import AnalyticsScreen from '../Containers/Analytics/AnalyticsScreen'
// import AddScreen from '../Containers/Add/AddScreen'
// import ProfileScreen from '../Containers/Profile/ProfileScreen'
// import { Colors, Images } from '../Theme'

// /**
//  * The root screen contains the application's navigation.
//  *
//  * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
//  */

// const StackNav = createStackNavigator(
//   {
//     SubscriptionScreen: {
//       screen: SubscriptionScreen,
//       navigationOptions: {
//         tabBarVisible: false,
//         headerMode: 'none',
//         header: null,
//       },
//     },
//     NetworkErrorScreen: {
//       screen: NetworkErrorScreen,
//       navigationOptions: {
//         tabBarVisible: false,
//         headerMode: 'none',
//         header: null,
//       },
//     },
//   }
//   // {
//   //   initialRouteName: "LoginScreen"
//   // }
// )

// const AppTabNavigator = createBottomTabNavigator(
//   {
//     // Home: StackNav,
//     MainScreen: {
//       screen: MainScreen,
//       navigationOptions: {
//         tabBarLabel: 'Home',
//         tabBarIcon: () => {
//           return <Image style={{ width: 30, height: 30 }} source={Images.balanceTab} />
//         },
//       },
//     },
//     // The main application screen is our "ExampleScreen". Feel free to replace it with your
//     // own screen and remove the example.
//     CalendarScreen: {
//       screen: CalendarScreen,
//       navigationOptions: {
//         // tabBarLabel:"Home",
//         tabBarIcon: () => <Icon name="ios-calendar" size={30} color={Colors.$background} />,
//       },
//     },
//     AddScreen: {
//       screen: AddScreen,
//       navigationOptions: {
//         // tabBarLabel:"Home",
//         tabBarIcon: () => <Icon name="ios-add" size={50} color={Colors.$lightHighlight} />,
//       },
//     },
//     AnalyticsScreen: {
//       screen: AnalyticsScreen,
//       navigationOptions: {
//         // tabBarLabel:"Home",
//         // tabBarIcon: () => <MatIcon name="brain" size={30} color={Colors.$background} />,
//         tabBarIcon: () => {
//           return <Image style={{ width: 30, height: 30 }} source={Images.mind} />
//         },
//       },
//     },
//     ProfileScreen: {
//       screen: ProfileScreen,
//       navigationOptions: {
//         // tabBarLabel:"Home",
//         tabBarIcon: () => <Icon name="ios-person" size={30} color={Colors.$background} />,
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       showLabel: false,
//       showIcon: true,
//       inactiveBackgroundColor: Colors.$lightGrey,
//       activeBackgroundColor: Colors.$lightGrey,
//       // inactiveBackgroundColor: "#343649",
//       // activeBackgroundColor:"#343649",
//       safeAreaInset: {
//         bottom: 'never',
//         top: 'never',
//       },
//       style: {
//         marginBottom: 20,
//         marginTop: 10,
//       },
//     },
//   }
// )

// const MainNavigator = createStackNavigator({
//   firstPage: {
//     screen: StackNav,
//   },
//   dashboard: {
//     screen: AppTabNavigator,
//   },
// })

// export default createAppContainer(MainNavigator)
