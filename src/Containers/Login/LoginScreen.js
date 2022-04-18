import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import { View, ActivityIndicator, Image, KeyboardAvoidingView, Text, Linking } from 'react-native'
import { Button } from 'react-native-elements'
import AsyncStorage from '@callstack/async-storage';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from '../../Stores/Example/Actions'
import Style from './LoginScreenStyle'
import { Images, Colors } from '../../Theme'
import AppleSignin from 'react-apple-signin-auth';
import FlashMessage from 'react-native-flash-message';

// import appleAuth, {
//   AppleButton,
//   AppleAuthError,
//   AppleAuthRequestScope,
//   AppleAuthRequestOperation,
// } from '@invertase/react-native-apple-authentication'

// eslint-disable-next-line no-unused-vars
let user = null

const theme = {
  Button: {
    titleStyle: {
      color: Colors.$white,
    },
    buttonStyle: {
      borderColor: Colors.$lightHighlight,
      backgroundColor: Colors.$lightHighlight,
    },
  },
  Input: {
    inputStyle: {
      color: Colors.$darkHighlight,
    },
  },
}

const handlePress = (href) => {
  Linking.canOpenURL(href).then(supported => {
    if (supported) {
      Linking.openURL(href);
    } else {
      console.log("Don't know how to open URI: " + href);
    }
  });
}

const Anchor = (props) => (
  <Text {...props} style={{ color: '#1559b7' }} onPress={() => handlePress(props.href)}>
    {props.children}
  </Text>
)

class LoginScreen extends React.Component {
  
  constructor(props) {

    super(props)
    this.state = { email: '', password: '', hasToken: false, isLoaded: false, error:false, Loading:false }
  }

  onPress = async () => {
    try {
      // make sign in request and return a response object containing authentication data
      // const appleAuthRequestResponse = await appleAuth.performRequest({
      //   requestedOperation: AppleAuthRequestOperation.LOGIN,
      //   requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      // })

      // retrieve identityToken from sign in request
      // const {
      //   user: newUser,
      //   // eslint-disable-next-line no-unused-vars
      //   email,
      //   // eslint-disable-next-line no-unused-vars
      //   fullName,
      //   // eslint-disable-next-line no-unused-vars
      //   nonce,
      //   identityToken,
      //   // eslint-disable-next-line no-unused-vars
      //   realUserStatus /* etc */,
      // } = appleAuthRequestResponse

      // user = newUser

      // you may also want to send the device's ID to your server to link a device with the account
      // const deviceId = getUniqueId()

      // identityToken generated
      // if (identityToken) {
        this.setState({error:false, Loading:true});
        if(this.state.email!="" && this.state.password!=''){
          
        this.props.loginUser({
          email: this.state.email,
          password: this.state.password,
          firstName: "MARK TEST",
        })
        setTimeout(() => {
          this.props.login.loginDone();
          this.setState({error:false, Loading:false});
        }, 3000)
      }
      else{
        this.setState({error:true, Loading:false});
      }
       
      // } else {
      //   // no token, failed sign in
      //   console.log('NO TOKEN, FAILED')
      // }
    } catch (error) {
      // if (error.code === AppleAuthError.CANCELED) {
      //   // user cancelled Apple Sign-in
      //   console.log('USER CANCELED', error)
      // } else {
        // other unknown error
        console.log('OTHER ERROR there', error)
      // }
    }
  }

  componentDidMount() {
    try {
      AsyncStorage.getItem('id_token').then((token) => {
        this.setState({ hasToken: token !== null, isLoaded: true })
        this.checkForToken(token)
      })
    } catch (e) {
      console.log(e)
    }
  }

  checkForToken(token) {
    if (this.state.isLoaded && this.state.hasToken) {
      // this.props.loginUser({
      //   email: token,
      //   password: token,
      //   firstName: 'null',
      // })
      this.props.login.loginDone();
    } else {
      // no token, failed sign in
      console.log('NO TOKEN, FAILED')
    }
  }

  onChangeEmail = (text) => {
    this.setState({ email: text.target.value })
  }

  onChangePassword = (text) => {
    this.setState({ password: text.target.value });
  }

  render() {
    return (
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-6">
            
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                <img className="loginlogo" alt="" src="http://zavius.in/balance/assets/images/balanceTab.png" />
                {this.state.error?
                <div class="alert alert-danger" role="alert">
                Please check the details
              </div>
              :""}
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <input type="email" placeholder='Username' id="typeEmailX-2" onChange={this.onChangeEmail} className="form-control form-control-lg" />
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" placeholder='Password' id="typePasswordX-2" onChange={this.onChangePassword} className="form-control form-control-lg" />
                  </div>

                  {/* <div className="form-check d-flex justify-content-start mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label className="form-check-label" for="form1Example3"> Remember password </label>
                  </div> */}
                  {
                    !this.state.Loading?
                  <button className="btn btn-primary btn-lg btn-block" onClick={this.onPress} type="submit">Login</button>
                  :
                  <button className="btn btn-primary btn-lg btn-block" type="button">Please Wait...</button>
                }

                  <hr className="my-4" />

                  <button className="btn btn-lg btn-block btn-primary w70" type="submit"><i className="fa fa-google me-2"></i> Sign in with google</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      //   <ThemeProvider theme={theme}>
      //     <KeyboardAvoidingView style={Style.container} behavior="padding" enabled>
      //       {/* {this.props.isFetching ? (
      //         <ActivityIndicator size="large" style={Style.lightHighlight} />
      //       ) :  */}

      //         <View style={Style.margin30}>
      //           <View style={Style.logoContainer}>
      //             <Image style={Style.logo} source={Images.balance} resizeMode={'contain'} />
      //           </View>
      //           <View>
      //           <Button variant="primary">Primary</Button>{' '}
      //             <Button
      //                //buttonStyle={Button.Style.WHITE}
      //                //buttonType={Button.Type.SIGN_IN}
      //               // style={Style.appleButton}
      //               onPress={() => this.onPress()}
      //             />
      //           </View>
      //         </View>

      //       <View style={Style.legalSection}> 
      //         <View style={Style.link}>
      //           <Anchor href="https://www.websitepolicies.com/policies/view/x8zoKEp2"> 
      //             Privacy Policy 
      //           </Anchor> 
      //         </View> 
      //         <View style={Style.link}> 
      //           <Anchor href="https://findingbalance.io/tos.html"> 
      //             Terms and Conditions 
      //           </Anchor> 
      //         </View> 
      //       </View>
      //     </KeyboardAvoidingView>
      //   </ThemeProvider>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

LoginScreen.propTypes = {
  user: PropTypes.object,
  isFetching: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  createUser: PropTypes.func,
  createApple: PropTypes.func,
  loginUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  isFetching: state.example.isFetching,
  userErrorMessage: state.example.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
  createUser: (user) => dispatch(ExampleActions.createUser(user)),
  createApple: (user) => dispatch(ExampleActions.createApple(user)),
  loginUser: (user) => dispatch(ExampleActions.loginUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
