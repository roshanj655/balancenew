/* eslint-disable react-native/no-inline-styles */
import React, { useState,Fragment } from 'react'
//import { NavigationEvents } from 'react-navigation'
import { Text, Button, Card, ButtonGroup } from 'react-native-elements'
import {
  View,
  ActivityIndicator,
  Dimensions,
  Alert,
  Modal,
  Image,
} from 'react-native'

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;

import AsyncStorage from '@callstack/async-storage';
//import { AgendaCalender } from 'react-agenda-calendar'
import { Agenda } from 'react-native-calendars'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from '../../Stores/Example/Actions'
import Style from './MainScreenStyle'
// import { ProgressChart, ContributionGraph } from '@marknauf/react-native-chart-kit'
//import { ProgressChart } from '@marknauf/react-native-chart-kit'
import ContributionGraph  from '../../mark/contribution-graph'
import ProgressChart from '../../mark/progress-chart'
//import PushNotificationIOS from '@react-native-community/push-notification-ios'
//import { ScrollView, TouchableOpacity } from 'react-gesture-handler'
import {ScrollView,TouchableOpacity } from 'react-native-web'
//import MonthPicker from 'react-month-year-picker'
//import MonthPicker from 'react-native-month-year-picker'
import MonthYearPicker from "react-month-year-picker";
import CalendarStrip from 'react-native-calendar-strip'
//import NavigationService from '../../Services/NavigationService'
import Mood from '../Add/mood-imgs/index'
import Activity from '../Add/imgs/index'
import Mindful from '../Analytics/mindfulness-imgs/index'

class MainScreen extends React.Component {
  constructor(props) {
    super(props)
   
    const today = new Date()
    var pullToday = {}
    var todaysDate = this.formatDate()
    pullToday[todaysDate] = { selected: true }
    
    this.state = {
      isNew: false,
      isTrue: true,
      selectedDay: pullToday,
      selectedIndex: 0,
      date: null,
      mode: 'date',
      items: {},
      initDate: today,
      show: false,
      showConfirm: false,
      smonth: 1,
      syear:2020
    }
    this.updateIndex = this.updateIndex.bind(this)
    
    // PushNotificationIOS.addEventListener('register', this.onRegistered)
    // PushNotificationIOS.addEventListener('registrationError', this.onRegistrationError)
    // PushNotificationIOS.addEventListener('notification', this.onRemoteNotification)

    // PushNotificationIOS.requestPermissions().then(
    //   (data) => {
    //     console.log('PushNotificationIOS.requestPermissions', data)
    //   },
    //   (data) => {
    //     console.log('PushNotificationIOS.requestPermissions failed', data)
    //   }
    // )
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  onRegistered = (deviceToken) => {
console.log("MS Token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NDU1NTY0OTYsImV4cCI6MTY0NTY0Mjg5NiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjIwYTQ1ZjUzNWIzZDYwMDFjZDc2NWFkIiwianRpIjoiNDc4MDdkMTEtZmQ5NC00MDIyLWJmN2UtMGM1MjFiZDFkZTQ3In0.rxzyn-T7zPFpq3LzyYc0HNS4eowZLMPtFWRFpsNSYAw"

    this.props.updateToken(token)

    // Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
    //   {
    //     text: 'Dismiss',
    //     onPress: null,
    //   },
    // ])
  }

 

  setModalOff() {
    this.setState({
      isNew: false,
    })
  }

  onRemoteNotification = (notification) => {
    const result = `
      Title:  ${notification.getTitle()};\n
      Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()}.`

    Alert.alert('Push Notification Received', result, [
      {
        text: 'Dismiss',
        onPress: null,
      },
    ])
  }

  formatDate() {
    var d = new Date()
    var month = '' + (d.getMonth() + 1)
    var day = '' + d.getDate()
    var year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  componentDidMount() {
    this.fetchAll()
    console.log("ahfghgfgfhgfh",this.props.moods)
    this.props.moods.forEach(element => {
      console.log("element",element);      
    });
    //this.pullNewDay1()
  }

  async logout() {
    // console.log('LOGOUT')
    try {
      await AsyncStorage.removeItem('id_token')
      await AsyncStorage.removeItem('subscription_purchase_stub')
     // NavigationService.navigate('SubscriptionScreen')
    } catch (exception) {
      // console.log(exception)
    }
  }

  // _checkTrial() {
  //   if (this.state.initDate !== this.props.user.startTrial) {
  //     Alert.alert(this.props.user.startTrial, this.state.initDate)
  //     // this.logout()
  //   }
  // }

  fetchAll() {
    
    this._fetchUser()
    this._fetchMoods(this.state.initDate)
    this.fetchMain()
    this._fetchAgenda(this.state.initDate)
  }
  fetchMain() {
    this._fetchMain(new Date())
  }

  _fetchMain(todayDate) {
    this.props.fetchMain(todayDate)
    if (!this.props.dob) {
      this.setState({
        isNew: true,
      })
    }
  }

  pullNewDay1(day) {
    console.log("pullllllllllllllllllll")
    const formatDay = new Date()
    this._fetchAll(formatDay)
    console.log("pulll" + this.props.activities)
    let finalObj = {}
    for (var a in this.props.activities) {
      console.log("pulll activities" + a)
      if (this.props.activities.hasOwnProperty(a)) {
        const date = this.props.activities[a].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.activities[a])
        } else {
          finalObj[date] = [this.props.activities[a]]
        }
      }
    }
    for (var b in this.props.moods) {
      console.log("pulll moods" + b)
      if (this.props.moods.hasOwnProperty(b)) {
        const date = this.props.moods[b].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.moods[b])
        } else {
          finalObj[date] = [this.props.moods[b]]
        }
      }
    }
    for (var c in this.props.sleeps) {
      console.log("pulll Sleeps" + c)
      if (this.props.moods.hasOwnProperty(c)) {
        const date = this.props.sleeps[c].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.sleeps[c])
        } else {
          finalObj[date] = [this.props.sleeps[c]]
        }
      }
    }
    console.log(finalObj)
    this.setState({
      items: finalObj,
    })
    console.log("Pulll "+this.props.moods[0])
    console.log("Pulll ends")
  }

  render() {
    const { initDate, date } = this.state
    const buttons = ['Progress', 'Journal']
    const { selectedIndex } = this.state
    
    return (
      
      <View style={Style.container}>
        {/* <fetchAll /> */}
        {/* <NavigationEvents onDidFocus={() =>
           this.fetchAll()} /> */}
        {!this.state.isTrue ? (
          <ActivityIndicator size="large" style={Style.activityIndicator} />
        ) : (
          <Fragment>
            <View>
      {/* //from here */}
      <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.isNew}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.')
                }}
              >
                <View style={Style.modalHeader}>
                  <ScrollView style={Style.margin50}>
                    <Text h4 h4Style={Style.modalText}>
                      <Text style={Style.margin50}>Welcome to Balance</Text>
                    </Text>
                    <View style={Style.textContainer}>
                      <Card>
                      <Icon name="square" size={40} color="#84AFAD" style={Style.iconPos}/>
                        <ion-icon name="triangle" type="ionicon" color="#84AFAD" />
                        <Text style={Style.welcomeText}>
                          Balance uses mood + activity + sleep to determine total well-being.
                        </Text>
                      </Card>
                    </View>

                    <View style={Style.additionalContainer}>
                      <Card>
                      <Icon name="rocket" size={40} color="#637580"  style={Style.iconPos}/>
                      
                        <ion-icon name="analytics-outline" type="ionicon" color="#637580" />
                        <Text style={Style.welcomeText}>
                          Personalized scores can be reviewed to identify patterns over time.
                        </Text>
                      </Card>
                    </View>

                    <View style={Style.additionalContainer}>
                      <Card>
                      <Icon name="heart" size={40} color="#D58063"  style={Style.iconPos}/>
                        {/* <Icon name="heart" type="ionicon" color="#D58063" /> */}
                        <Text style={Style.welcomeText}>
                          These trends can help you understand your overall wellness and achieve
                          Balance.
                        </Text>
                      </Card>
                    </View>

                    <Text h4 h4Style={Style.birthdayText}>
                      <Text style={Style.margin50}>
                        To get started, please provide the month and year of your birth.
                      </Text>
                    </Text>
                    <View style={Style.confirmButton}>
                      <Button
                        style={Style.height50}
                        onPress={() =>
                          this.setState({
                            show: true,
                          })
                        }
                        className="btn"
                        title="Select Birthday"
                        type="solid"
                        titleStyle={Style.titleStyle}
                        buttonStyle={Style.buttonStyle}
                      />
                    </View>

                    {this.state.show && (
                      <MonthYearPicker
                        selectedMonth={this.state.smonth}
                        selectedYear={this.state.syear}
                        minYear={1920}
                        maxYear={2030}
                        onChangeYear={year => this.setDate("setYear", year)}//this.setState({ syear: year })}
                        onChangeMonth={month =>this.setDate("setMonth",month) }//this.setState({ smonth: month })}
                        
                      />
                    )}
                    {/* </View> */}

                    {this.state.showConfirm && (
                      <View>
                        <Text h4 h4Style={Style.birthdayText}>
                          <Text style={Style.margin50}>You Selected:</Text>
                          <Text>{' ' + this.state.date}</Text>
                        </Text>

                        <View style={Style.confirmButton}>
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.props.addBirthdate({
                                dob: date,
                              })
                              this.setState({
                                isNew: false,
                              })
                            }}
                            title="Confirm"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.buttonStyle}
                          />
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </View>
              </Modal>
      {/* //Modl ends         */}
            </View>
            <ScrollView>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedButtonStyle={Style.darkHighlight}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={Style.height30}
              />
              {selectedIndex === 0 && (
                <Fragment>
                  <View>
                    <View
                      style={{
                        margin: 5,
                        marginTop: 50,
                        paddingRight: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text h3 h3Style={Style.header3}>
                        My Daily Balance{' '}
                      </Text>
                      <TouchableOpacity
                        style={{ marginTop: 5 }}
                        onPress={() =>
                          Alert.alert(
                            'My Daily Balance',
                            'Your daily indicator of your total well-being',
                            { cancelable: false }
                          )
                        }
                      >
                        <Icon name="help-circle-outline" type="ionicon" color="#84AFAD" />
                      </TouchableOpacity>
                    </View>

                    <Text h2 h2Style={Style.header2}>
                      {this.props.balanceScores.length === 1
                        ? this.props.balanceScores[0].score
                        : 0}{' '}
                    </Text>
                  </View>

                  <View style={Style.progressTop}>
                    <ProgressChart
                      data={this.props.data}
                      width={ Dimensions.get("window").width - 15 }
                      height={1000}
                      chartConfig={{
                        backgroundColor: '#008000',
                        backgroundGradientFrom: '#F0F2F3',
                        backgroundGradientTo: '#F0F2F3',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 16,
                          marginVertical: 8,
                        },
                      }}
                    />
                  </View>
                </Fragment>
              )}

              {selectedIndex === 1 && (
                <Fragment>
                  <View>
                    <View
                      style={{
                        margin: 5,
                        marginTop: 50,
                        paddingRight: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text h3 h3Style={Style.header3}>
                        My Total Balance{' '}
                      </Text>
                      <TouchableOpacity
                        style={{ marginTop: 5 }}
                        onPress={() =>
                          Alert.alert('My Total Balance', 'Your total well-being score over time', {
                            cancelable: false,
                          })
                        }
                      >
                        <Icon name="help-circle-outline" type="ionicon" color="#84AFAD" />
                      </TouchableOpacity>
                    </View>
                    <Text h2 h2Style={Style.header2}>
                      {this.props.average ? this.props.average : 0}{' '}
                    </Text>
                  </View>

                  <View style={{ marginTop: 50 }}></View>
                  {/* <Agenda
                    renderEmptyData={() => <Text>{}</Text>}
                    dayLoading={false}
                    items={this.state.items}
                    loadItemsForMonth={this.testLoad.bind(this)}
                    selected={initDate}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    showClosingKnob={true}
                    theme={{
                      dotColor: '#95B9B7',
                      selectedDayBackgroundColor: '#95B9B7',
                      agendaDayTextColor: '#95B9B7',
                      agendaTodayColor: '#D58063',
                      todayTextColor: '#D58063',
                    }}
                    // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                  /> */}
                  <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                onDateSelected={(day) => this.changeSelectedDay(day)}
                daySelectionAnimation={{
                  type: 'border',
                  duration: 200,
                  borderWidth: 0,
                  borderHighlightColor: 'grey',
                }}
                 style={{height: 200, paddingTop: 20, paddingBottom: 10}}
                calendarHeaderStyle={Style.titleText}
                // calendarColor={'#7743CE'}
                dateNumberStyle={Style.titleText}
                dateNameStyle={Style.titleText}
                highlightDateNumberStyle={Style.lightHighlight}
                highlightDateNameStyle={Style.lightHighlight}
                disabledDateNameStyle={Style.titleText}
                disabledDateNumberStyle={Style.titleText}
                iconLeft={require('../../Assets/Images/leftArrow.png')}
                iconRight={require('../../Assets/Images/rightArrow.png')}
                iconContainer={{ flex: 0.1 }}
                style={Style.calendarStrip}
              />
                </Fragment>
              )}

              <View style={{ marginTop: 50 }}></View>
            </ScrollView>
          </Fragment>
        )}
      </View>
    )
  }

  pullNewDay(day) {
    const formatDay = new Date(day.dateString)
    this._fetchAll(formatDay)
    let finalObj = {}
    for (var a in this.props.activities) {
      if (this.props.activities.hasOwnProperty(a)) {
        const date = this.props.activities[a].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.activities[a])
        } else {
          finalObj[date] = [this.props.activities[a]]
        }
      }
    }
    for (var b in this.props.moods) {
      if (this.props.moods.hasOwnProperty(b)) {
        const date = this.props.moods[b].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.moods[b])
        } else {
          finalObj[date] = [this.props.moods[b]]
        }
      }
    }
    for (var c in this.props.sleeps) {
      if (this.props.moods.hasOwnProperty(c)) {
        const date = this.props.sleeps[c].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.sleeps[c])
        } else {
          finalObj[date] = [this.props.sleeps[c]]
        }
      }
    }
    console.log(finalObj)
    this.setState({
      items: finalObj,
    })
  }

  testLoad(day) {
    let finalObj = {}
    for (var a in this.props.activities) {
      if (this.props.activities.hasOwnProperty(a)) {
        const date = this.props.activities[a].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.activities[a])
        } else {
          finalObj[date] = [this.props.activities[a]]
        }
      }
    }
    for (var b in this.props.moods) {
      if (this.props.moods.hasOwnProperty(b)) {
        const date = this.props.moods[b].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.moods[b])
        } else {
          finalObj[date] = [this.props.moods[b]]
        }
      }
    }
    for (var c in this.props.sleeps) {
      if (this.props.moods.hasOwnProperty(c)) {
        const date = this.props.sleeps[c].day.split('T')[0]
        if (finalObj[date]) {
          finalObj[date].push(this.props.sleeps[c])
        } else {
          finalObj[date] = [this.props.sleeps[c]]
        }
      }
    }
    console.log(finalObj)
    this.setState({
      items: finalObj,
    })
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 5; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000
        const strTime = this.timeToString(time)
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = []
          const numItems = Math.floor(Math.random() * 3 + 1)
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            })
          }
        }
      }
      const newItems = {}
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key]
      })
      this.setState({
        items: newItems,
      })
    }, 1000)
  }

  renderItem(item) {
    return (
      <View
        // testID={testIDs.agenda.ITEM}
        style={[Style.item, { height: 'auto' }]}
        // onPress={() => Alert.alert(item.name)}
      >
        {item.duration && (
          <View>
            <Image style={Style.imageSize} source={Activity.image[item.type.toLowerCase()]} />
            <Text>
              Activity: You did {item.type} for {item.duration} minutes
            </Text>
          </View>
        )}

        {!item.duration && !item.hours && (
          <View>
            <Image style={Style.imageSize} source={Mood.image[item.type.toLowerCase()]} />
            <Text>Mood: You felt {item.type} </Text>
            {item.entry !== '' && item.entry && <Text>Journal Entry: {item.entry} </Text>}
          </View>
        )}

        {item.hours && (
          <View>
            <Image style={Style.imageSize} source={require('../../Assets/Images/sleep.png')} />
            <Text>Sleep: You slept {item.hours} hours</Text>
          </View>
        )}
      </View>
    )
  }

  renderEmptyDate() {
    return (
      <View style={Style.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    )
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name
  }

  timeToString(time) {
    const date = new Date(time)
    return date.toISOString().split('T')[0]
  }

setDate = (event, date) => {

console.log("MS event "+event+"date = "+date);
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

   if (event === 'dismissedAction') {
      date = new Date()
    }

    if(event == "setYear"){
      this.setState({ syear: date })
    }else if(event == "setMonth"){
      this.setState({ smonth: date })
      date = monthNames[this.state.smonth] + '-' + this.state.syear//date.getFullYear()
    
      var initDate = date || this.state.date

      initDate = new Date(initDate)
  
      this.setState({
        date,
        initDate,
        show: true,
      })
     //if (event === 'dateSetAction') 
     {
        this.setState({
          showConfirm: true,
        })
      }
    }

    
    //date = monthNames[date.getMonth()] + '-' + date.getFullYear()

    

    // if (event === 'dateSetAction') {
    //   this.setState({
    //     showConfirm: true,
    //   })
    // }
  }

  _fetchUser() {
    this.props.fetchUser()
  }
  _fetchMoods(moodDate) {
    console.log(' fetchMood date', moodDate)
    this.props.fetchMoods(moodDate)
  }
  _fetchAll(moodDate) {
    this.props.fetchAll(moodDate)
    console.log(' fetchAll Mooddate', moodDate)
  }
  _fetchAgenda(moodDate) {
    this.props.fetchAgenda(moodDate)
    console.log('MOODDATE', moodDate)
  }
}

MainScreen.propTypes = {
  average: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  balanceScores: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  commitsData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  fetchActivityScores: PropTypes.func,
  fetchBalanceScores: PropTypes.func,
  fetchMain: PropTypes.func,
  fetchAll: PropTypes.func,
  fetchAgenda: PropTypes.func,
  fetchMoodScores: PropTypes.func,
  fetchMoods: PropTypes.func,
  moods: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  sleeps: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  activities: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  sleep: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  fetchOverall: PropTypes.func,
  fetchSleepScores: PropTypes.func,
  fetchUser: PropTypes.func,
  isFetching: PropTypes.bool,
  // isOnboarded: PropTypes.bool,
  updateToken: PropTypes.func,
  addBirthdate: PropTypes.func,
  user: PropTypes.object,
  // startTrial: PropTypes.date,
  dob: PropTypes.string,
  userErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  dob: state.example.user.dob,
  moods: state.example.moods,
  sleeps: state.example.sleeps,
  activities: state.example.activities,
  // startTrial: state.example.startTrial,
  balanceScores: state.example.balanceScores,
  moodScores: state.example.moodScores,
  sleepScores: state.example.sleepScores,
  activityScores: state.example.activityScores,
  isFetching: state.example.isFetching,
  // isOnboarded: state.example.isOnboarded,
  userErrorMessage: state.example.userErrorMessage,
  overall: state.example.overall,
  data: state.example.triangle,
  average: state.example.average,
  commitsData: state.example.commitsData,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
  fetchMoods: (moodDate) => dispatch(ExampleActions.fetchMoods(moodDate)),
  addBirthdate: (user) => dispatch(ExampleActions.addBirthdate(user)),
  fetchAll: (moodDate) => dispatch(ExampleActions.fetchAll(moodDate)),
  fetchAgenda: (moodDate) => dispatch(ExampleActions.fetchAgenda(moodDate)),
  fetchMain: (todayDate) => dispatch(ExampleActions.fetchMain(todayDate)),
  updateToken: (token) => dispatch(ExampleActions.updateToken(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
