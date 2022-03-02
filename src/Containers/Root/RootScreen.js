import React, { Component } from 'react'
//import NavigationService from '../Services/NavigationService'
//import NavigationService from '../../Services/NavigationService'
import AppNavigator  from '../../Navigators/AppNavigator'
//import AppNavigator from '../Navigators/AppNavigator'
// eslint-disable-next-line no-unused-vars
import { View, StatusBar } from 'react-native-web'
import styles from './RootScreenStyle'
import { connect } from 'react-redux'
//import StartupActions from '../../Stores/Startup/Actions'
import StartupActions from '../../Stores/Startup/Actions'
import { PropTypes } from 'prop-types'
import SplashScreen from '../SplashScreen/SplashScreen'
import SignupScreen from '../Signup/SignupScreen'
import LoginScreen from '../Login/LoginScreen'
import CalendarScreen from '../Calendar/CalendarScreen'
import MainScreen from '../Main/MainScreen'
import ProfileScreen from '../Profile/ProfileScreen'
import {BrowserRouter,Switch,Route,Redirect,BackButton,DeepLinking} from "react-native-web-router";
// import Header from '../Header/Header'
// import Sidebar from '../Header/Sidebar'
// import Footer from '../Header/Footer'
import Header from './Header';
import Rightpanel from './Rightpanel';
import Footer from './Footer';
import Sidebar from './Sidebar';
import logo from '../../../logo.svg';
import '../../../App.css';

import SubscriptionScreen from '../Subscription/SubscriptionScreen'
import AddScreen from '../Add/AddScreen'

class RootScreen extends Component {
  
  componentDidMount() {
     // Run the startup saga when the application is starting
    this.props.startup()
  }

  render() { 
    console.log("Hello");
    return (
      
      // <View style={styles.container}>
        
          //  {/* <SubscriptionScreen /> */}
          //  {/* <LoginScreen />
          //  <AddScreen /> */}
// {/* <MainScreen /> */}

            // {/* <ProfileScreen />        */}
          //  </View>
          <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className='row'>
            <div className='col-md-8'>
            {/* <LoginScreen /> */}
            {/* <MainScreen /> */}
            {/* <SubscriptionScreen /> */}
          
            
              {/* <BrowserRouter>
                <Switch>
                  <Route path="/" exact={true} component={MainScreen} />
                </Switch>
                <Switch>
                  <Route path="/add"  exact={true} component={AddScreen} />
                </Switch>
              </BrowserRouter>  */}
              {/* <Meditaion />*/}
            </div>
            <div className='col-md-4'>
              <Rightpanel />
            </div>
          </div>


          <Footer />
        </div>
      </div>
    </div>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
