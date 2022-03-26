import React, { Component } from 'react'
//import NavigationService from '../Services/NavigationService'
//import NavigationService from '../../Services/NavigationService'
import AppNavigator from '../../Navigators/AppNavigator'
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
import USerDetails from '../Profile/userDetails'
import { BrowserRouter, Switch, Route, Redirect, BackButton, DeepLinking } from "react-native-web-router";
// import Header from '../Header/Header'
// import Sidebar from '../Header/Sidebar'
// import Footer from '../Header/Footer'
import Header from './Header';
import Rightpanel from './Rightpanel';
import Footer from './Footer';
import Sidebar from './Sidebar';
// import '../../../App.css';
import ExampleActions from '../../Stores/Example/Actions'
import SubscriptionScreen from '../Subscription/SubscriptionScreen'
import AddScreen from '../Add/AddScreen'
import StartUp from '../StartUp/StartUp'

class RootScreen extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    show: false,
    changeScreen: "login"
  }

  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.startup()
    // Add your logic for the transition
    // this.props.loginUser({
    //     email: "abc@abc.com",
    //     password: "stub",
    //     firstName: 'sub',
    // })

    setTimeout(() => {
      this.setState({ show: true })
    }, 1000)
  }
  autheticated(){
    this.setState({ changeScreen: "" })
  }
  showHideScreen(data) {
    this.setState({ changeScreen: data })
  }
  render() {
    // console.log("Hello");

    return (
      <>
        {this.state.show &&
          <div>
            <div className="container-scroller">
            {(this.state.changeScreen != "login")?
              <Header balanceScore={this.props.balanceScores[0]} userName={this.props.user.firstName} />
              :""}
              {/* <MainScreen />  */}
              <div className={(this.state.changeScreen != "login")?"container-fluid page-body-wrapper":""}>
                {(this.state.changeScreen != "login") ?
                  <Sidebar navdata={{ showHideScreen: this.showHideScreen.bind(this) }} />
                  : ""
                }
                <div className={(this.state.changeScreen != "login")?"main-panel":""}>
                  <div className='row'>
                    <div className={(this.state.changeScreen != "login")?"col-md-8 middle-center":"col-md-12 middle-center"}>

                      {(this.state.changeScreen == "med") ?
                        <Meditaion />
                        :
                        (this.state.changeScreen == "profile") ?
                          <ProfileScreen />
                          : (this.state.changeScreen == "login") ?
                            <LoginScreen  login={{ loginDone: this.autheticated.bind(this) }} />
                            :
                            <Dashboard />

                      }
                    
                    </div>
                    {(this.state.changeScreen != "login") ?
                    <div className='col-md-4'>
                      
                        <Rightpanel />
                        
                    </div>
                    : ""}
                  </div>

                  {(this.state.changeScreen != "login") ?
                    <Footer />
                    : ""}
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
  fetchBalanceScores: PropTypes.func,
  user: PropTypes.object,
  fetchUser: PropTypes.func,
  balanceScores: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
}

const mapStateToProps = (state) => ({
  balanceScores: state.example.balanceScores,
  user: state.example.user,
})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  loginUser: (user) => dispatch(ExampleActions.loginUser(user)),
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
