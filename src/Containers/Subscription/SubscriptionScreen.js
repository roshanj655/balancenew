import React from 'react'
import { ThemeProvider, Text, Button } from 'react-native-elements'
import {
  View,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Alert,
  NativeModules,
  Linking,
} from 'react-native-web'
import AsyncStorage from '@callstack/async-storage';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Style from './SubscriptionScreenStyle'
import ExampleActions from '../../Stores/Example/Actions'
import { Images, Colors } from '../../Theme'
import ProfileScreen from '../Profile/ProfileScreen';
//import NavigationService from '../../../App/Services/NavigationService'
//import RNUserIdentity, { ICLOUD_ACCESS_ERROR } from 'react-native-user-identity'

const purchasedKey = 'subscription_purchase_stub'

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

class SubscriptionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      isFetching: true,
    }
  }
  purchaseUpdateSubscription = null
  purchaseErrorSubscription = null

  async componentDidMount() {
    this.getSubscriptions()
    //this.loginUserFromPurchase()
   }
 
  fetchUserIdentity = async () => {
    try {
      const result = "620a45f535b3d6001cd765ad";
      if (result === null) {
        alert('User canceled UI flow')
      }
      return result
    } catch (error) {
       alert('Please set up an iCloud account in settings')
    }
  }

  loginUserFromPurchase = async () => {
    // const originalTransactionIdentifierIOS = purchase.originalTransactionIdentifierIOS;
    const userId = await this.fetchUserIdentity()
    // const userStub = originalTransactionIdentifierIOS + '-' + userId;
    const userStub = '' + userId

    return this.loginUser(userStub)
  }

 loginUser = async (stub) => {
    AsyncStorage.setItem(purchasedKey, stub)
    this.props.loginUser({
      email: stub,
      password: stub,
      firstName: 'sub',
    })
    
  }

  checkPurchases = async () => {
    this.setState({ isFetching: true })
    try { 
      var purchased = true;
      return this.loginUserFromPurchase()
      
    } catch (err) {
      Alert.alert('Something has gone wrong. Please close the app and re-open it.')
    } finally {
      this.setState({ isFetching: false })
    }
  }

  getSubscriptions = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NDU0Mjk0NjIsImV4cCI6MTY0NTUxNTg2MiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjIwYTQ1ZjUzNWIzZDYwMDFjZDc2NWFkIiwianRpIjoiODM3Mzc0YzgtYjNiNi00MDIyLWE0MTgtYjg3ZjE0MDM1MzVjIn0.5oX5xeMRY1G90RMxi3C9LWRWeUcU920vhcOGANY6cgw";
      if (token) {
        this.loginUser(token)
        return
      }
        products.sort(function(a, b) {
        return parseInt(a.price) > parseInt(b.price)
      })
      this.setState({ productList: products, isFetching: false })
    } catch (err) {
      console.warn(err)
    }
  }
  render() {
    const { productList, isFetching } = this.state
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAvoidingView style={Style.container}
         behavior="padding" enabled>
          {this.props.isFetching || isFetching ? (
            <ActivityIndicator size="large" style={Style.lightHighlight} />
          ) : (
            <View style={Style.margin30}>
              <View style={Style.privacySection}>
                <View style={Style.link}>
                  <Text
                    style={{ color: '#1559b7' }}
                    onPress={() => {
                      // <ProfileScreen />
                      Linking.openURL('https://www.websitepolicies.com/policies/view/x8zoKEp2')
                    }}
                  >
                    Privacy Policy
                  </Text>
                </View>
              </View>
              <View style={Style.logoContainer}>
                <Image style={Style.logo} source={Images.balance} resizeMode={'contain'} />
              </View>

              <View>
                <Text style={Style.orText}>This app requires a subscription</Text>
              </View>

              {productList.map((subscription, index) => {
                return (
                  <View>
                  <Button
                    onPress={() => this.processFreeTrial()}
                    style={Style.loginButton}
                    title={'Free Trial'}
                    type="outline"
                  />
                  <Text style={Style.subText}>Two week free trial</Text>
                </View>
              
                )
              })}

           </View>
          )}
          <View style={Style.legalSection}>
            <View style={Style.link}>
              <Text style={{ color: '#1559b7' }} onPress={() => this.checkPurchases()}>
                Redeem Purchase
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ThemeProvider>
    )
  }
}
SubscriptionScreen.propTypes = {
  user: PropTypes.object,
  loginUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(ExampleActions.loginUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen)
