import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import { View, ActivityIndicator, Image, KeyboardAvoidingView, Text, Linking } from 'react-native'
import { Button} from 'react-native-elements'
import AsyncStorage from '@callstack/async-storage';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from '../../Stores/Example/Actions'
import Style from './LoginScreenStyle'
import { Images, Colors } from '../../Theme'
import AppleSignin from 'react-apple-signin-auth';

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
  <Text {...props} style={{color: '#1559b7'}} onPress={() => handlePress(props.href)}>
    {props.children}
  </Text>
)

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', hasToken: false, isLoaded: false }
  }

  onPress = async () => {
    try {
      // make sign in request and return a response object containing authentication data
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      })

      // retrieve identityToken from sign in request
      const {
        user: newUser,
        // eslint-disable-next-line no-unused-vars
        email,
        // eslint-disable-next-line no-unused-vars
        fullName,
        // eslint-disable-next-line no-unused-vars
        nonce,
        identityToken,
        // eslint-disable-next-line no-unused-vars
        realUserStatus /* etc */,
      } = appleAuthRequestResponse

      user = newUser

      // you may also want to send the device's ID to your server to link a device with the account
      // const deviceId = getUniqueId()

      // identityToken generated
      if (identityToken) {
        this.props.loginUser({
          email: email,
          password: newUser,
          firstName: fullName.givenName,
        })
      } else {
        // no token, failed sign in
        console.log('NO TOKEN, FAILED')
      }
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
        // user cancelled Apple Sign-in
        console.log('USER CANCELED', error)
      } else {
        // other unknown error
        console.log('OTHER ERROR there', error)
      }
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
      this.props.loginUser({
        email: token,
        password: token,
        firstName: 'null',
      })
    } else {
      // no token, failed sign in
      console.log('NO TOKEN, FAILED')
    }
  }

  onChangeEmail(text) {
    this.email = text
  }

  onChangePassword(text) {
    this.password = text
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAvoidingView style={Style.container} behavior="padding" enabled>
          {/* {this.props.isFetching ? (
            <ActivityIndicator size="large" style={Style.lightHighlight} />
          ) :  */}
          
            <View style={Style.margin30}>
              <View style={Style.logoContainer}>
                <Image style={Style.logo} source={Images.balance} resizeMode={'contain'} />
              </View>
              <View>
              <Button variant="primary">Primary</Button>{' '}
                <Button
                   //buttonStyle={Button.Style.WHITE}
                   //buttonType={Button.Type.SIGN_IN}
                  // style={Style.appleButton}
                  onPress={() => this.onPress()}
                />
              </View>
            </View>
          
          <View style={Style.legalSection}> 
            <View style={Style.link}>
              <Anchor href="https://www.websitepolicies.com/policies/view/x8zoKEp2"> 
                Privacy Policy 
              </Anchor> 
            </View> 
            <View style={Style.link}> 
              <Anchor href="https://findingbalance.io/tos.html"> 
                Terms and Conditions 
              </Anchor> 
            </View> 
          </View>
        </KeyboardAvoidingView>
      </ThemeProvider>
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
