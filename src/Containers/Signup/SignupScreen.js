import React from 'react'
import { Button, ThemeProvider, Text, Input } from 'react-native-elements'
import {
  Platform,
  Modal,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
} from 'react-native-web'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
//import ExampleActions from 'App/Stores/Example/Actions'
import Style from './SignupScreenStyle'
import { Images, Colors } from '../../Theme'
//import NavigationService from '../../../src/Services/NavigationService'
import DateTimePicker from '@react-native-community/datetimepicker'

const theme = {
  Button: {
    titleStyle: {
      color: Colors.$lightHighlight,
    },
    buttonStyle: {
      borderColor: Colors.$lightHighlight,
    },
  },
  Input: {
    inputStyle: {
      color: Colors.$darkHighlight,
    },
  },
}

class SignupScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      date: null,
      mode: 'date',
      initDate: new Date(),
      show: false,
      modalVisible: false,
    }
  }

  onChangeEmail(text) {
    this.email = text
  }

  onChangePassword(text) {
    this.password = text
  }

  setDate = (event, date) => {
    var monthNames = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ]

    date = date.getDate() + '-' + monthNames[date.getMonth()] + '-' + date.getFullYear()

    var initDate = date || this.state.date

    initDate = new Date(initDate)

    this.setState({
      show: Platform.OS === 'ios',
      date,
      initDate,
    })
  }

  show = (mode) => {
    this.setState({
      show: true,
      mode,
    })
  }

  datepicker = () => {
    this.show('date')
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { initDate, mode } = this.state
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAvoidingView style={Style.container} behavior="padding" enabled>
          {this.props.isFetching ? (
            <ActivityIndicator size="large" color="#9086A6" />
          ) : (
            <View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  // Alert.alert('Modal has been closed.')
                }}
              >
                <View style={Style.container}>
                  <View>
                    <Text h4 h4Style={Style.headerText}>
                      Date of Birth{' '}
                    </Text>
                    <DateTimePicker
                      style={Style.datepickerColor}
                      value={initDate}
                      mode={mode}
                      is24Hour={true}
                      display="spinner"
                      onChange={this.setDate}
                    />

                    <View>
                      <Button
                        style={Style.loginButton}
                        title="Confirm"
                        type="outline"
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible)
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              <View style={Style.logoContainer}>
                <Image style={Style.logo} source={Images.balance} resizeMode={'contain'} />
              </View>
              <View>
                <Input
                  placeholder="First Name"
                  autoFocus={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={(text) => this.setState({ firstName: text })}
                  placeholderTextColor={Colors.$grey}
                  value={this.state.firstName}
                  inputContainerStyle={Style.inputBorder}
                />
                <Input
                  placeholder="Last Name"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={(text) => this.setState({ lastName: text })}
                  placeholderTextColor={Colors.$grey}
                  value={this.state.lastName}
                  inputContainerStyle={Style.inputBorder}
                />
                <Input
                  placeholder="Email"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyBoardType="email-address"
                  returnKeyType="next"
                  onChangeText={(text) => this.setState({ email: text })}
                  placeholderTextColor={Colors.$grey}
                  value={this.state.email}
                  inputContainerStyle={Style.inputBorder}
                />
                <Input
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="send"
                  onChangeText={(text) => this.setState({ password: text })}
                  placeholderTextColor={Colors.$grey}
                  value={this.state.password}
                  inputContainerStyle={Style.inputBorder}
                />

                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(true)
                  }}
                >
                  <Input
                    pointerEvents="none"
                    placeholder="Date of Birth"
                    secureTextEntry={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="send"
                    placeholderTextColor={Colors.$grey}
                    inputContainerStyle={Style.inputBorder}
                    // onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.date ? this.state.date.toString() : null}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Button
                  style={Style.loginButton}
                  title="Create Account"
                  type="outline"
                  onPress={() => {
                    const { email, password, firstName, lastName, date } = this.state
                    this.props.createUser({
                      email: email,
                      password: password,
                      firstName: firstName,
                      lastName: lastName,
                      dob: date,
                    })
                  }}
                />
              </View>

              <View>
                <Text style={Style.orText}>Or</Text>
              </View>

              <View>
                <Button
                  style={Style.loginButton}
                  title="Back"
                  type="outline"
                  onPress={() => {
                    NavigationService.navigate('LoginScreen')
                  }}
                />
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </ThemeProvider>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

SignupScreen.propTypes = {
  user: PropTypes.object,
  isFetching: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  createUser: PropTypes.func,
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
  loginUser: (user) => dispatch(ExampleActions.loginUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
