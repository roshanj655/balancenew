import React, { Component } from 'react'
import { connect } from 'react-redux'
//import StartupActions from '../../Stores/Startup/Actions'
import StartupActions from '../../Stores/Startup/Actions'
import { PropTypes } from 'prop-types'
import LoginScreen from '../Login/LoginScreen'
import Meditaion from '../Meditation/Medition'
import Dashboard from '../Dashboard/Dashboard'
import ProfileScreen from '../Profile/ProfileScreen'
import Header from './Header';
import Rightpanel from './Rightpanel';
import Footer from './Footer';
import Sidebar from './Sidebar';
// import '../../../App.css';
import ExampleActions from '../../Stores/Example/Actions'

class RootScreen extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    show: false,
    changeScreen: "login",
    newDate:new Date(),
    rerender:false
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
      this.setState({ rerender: 1 })
   
  }
  updateDate(data){
    this.setState({newDate:data});
  }
  render() {

    return (
      <>
        {this.state.show &&
          <div>
            <div className="container-scroller">
            {(this.state.changeScreen != "login")?
              <Header balanceScore={this.props.balanceScores[0]} user={this.props.user} />
              :""}
              {/* <MainScreen />  */}
              <div className={(this.state.changeScreen != "login")?"container-fluid page-body-wrapper":""}>
                {(this.state.changeScreen != "login") ?
                  <Sidebar navdata={{ showHideScreen: this.showHideScreen.bind(this) }}  newDate={this.state.newDate} />
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
                            <Dashboard newDate={{ passUpdatedDate: this.updateDate.bind(this) }} newChange={this.state.rerender}/>

                      }
                    
                    </div>
                    {(this.state.changeScreen != "login") ?
                    <div className='col-md-4'>
                      
                        <Rightpanel newDate={this.state.newDate} />
                        
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
