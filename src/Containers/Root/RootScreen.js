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
import AnalyticsScreen from '../Analytics/AnalyticsScreen'
import { PropTypes } from 'prop-types'
import SplashScreen from '../SplashScreen/SplashScreen'
import SignupScreen from '../Signup/SignupScreen'
import LoginScreen from '../Login/LoginScreen'
import CalendarScreen from '../Calendar/CalendarScreen'
import MainScreen from '../Main/MainScreen'
import Meditaion from '../Meditation/Medition'
import Dashboard from '../Dashboard/Dashboard'
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
import ExampleActions from '../../Stores/Example/Actions'
import SubscriptionScreen from '../Subscription/SubscriptionScreen'
import AddScreen from '../Add/AddScreen'
import StartUp from '../StartUp/StartUp'

class RootScreen extends Component {

  state={
    show: false,
    changeScreen:true
 }

  componentDidMount() {
     // Run the startup saga when the application is starting
    this.props.startup()
    // Add your logic for the transition
    this.props.loginUser({
        email: "abc@abc.com",
        password: "stub",
        firstName: 'sub',
    })

    setTimeout(()=>{
      this.setState({show: true})
   },1000)
  }
  showHideScreen(data){
    this.setState({ changeScreen: data })
  }
  render() { 
    console.log("Hello");
   
    return (
      <>
      {this.state.show && 
      <div>
      <div className="container-scroller">
      <Header />
{/* <MainScreen />  */}
      <div className="container-fluid page-body-wrapper">
        <Sidebar  navdata={{showHideScreen:this.showHideScreen.bind(this)}} />
        <div className="main-panel">
          <div className='row'>
            <div className='col-md-8 middle-center'>
              
              {(!this.state.changeScreen)?
              <Meditaion />
              :
              <Dashboard />
            }
              {/* <AnalyticsScreen /> */}
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
    </div>
  }
    </>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
  login: PropTypes.func,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  loginUser: (user) => dispatch(ExampleActions.loginUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
