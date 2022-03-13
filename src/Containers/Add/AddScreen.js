/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { Button, Text } from 'react-native-elements'
import {
  Platform,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Alert,
  Picker,
  TextInput,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from '../../Stores/Example/Actions'
import Style from './AddScreenStyle'
import CalendarStrip from 'react-native-calendar-strip'
//import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePicker from 'react-datetime-picker';
import Activity from './imgs/index'
import Mood from './mood-imgs/index'
import AnalyticsScreen from '../Analytics/AnalyticsScreen'
//import { ScrollView } from 'react-native-gesture-handler'

function RenderType(props) {
  const activitySize = 50
  console.log(props.todaySleep);
  const moodArr = [
    { "img": "loved.png", "name": "Loved", "param3": "loved", "number": 10 },
    { "img": "happy.png", "name": "Happy", "param3": "happy", "number": 10 },
    { "img": "silly.png", "name": "Goofy", "param3": "goofy", "number": 9 },
    { "img": "confident.png", "name": "Confident", "param3": "confident", "number": 9 },
    { "img": "grateful.png", "name": "Grateful", "param3": "grateful", "number": 9 },
    { "img": "hopeful.png", "name": "Hopeful", "param3": "hopeful", "number": 8 },
    { "img": "excited.png", "name": "Excited", "param3": "excited", "number": 8 },
    { "img": "relaxed.png", "name": "Relaxed", "param3": "relaxed", "number": 7 },
    { "img": "bored.png", "name": "Bored", "param3": "bored", "number": 6 },
    { "img": "tired.png", "name": "Tired", "param3": "tired", "number": 5 },
    { "img": "sick.png", "name": "Sick", "param3": "sick", "number": 5 },
    { "img": "hurt.png", "name": "Hurt", "param3": "hurt", "number": 5 },
    { "img": "worried.png", "name": "Worried", "param3": "worried", "number": 4 },
    { "img": "annoyed.png", "name": "Annoyed", "param3": "annoyed", "number": 5 },
    { "img": "anxious.png", "name": "Anxious", "param3": "anxious", "number": 4 },
    { "img": "frustrated.png", "name": "Frustrated", "param3": "frustrated", "number": 4 },
    { "img": "sad.png", "name": "Sad", "param3": "sad", "number": 4 },
    { "img": "scared.png", "name": "Scared", "param3": "scared", "number": 3 },
    { "img": "angry.png", "name": "Angry", "param3": "angry", "number": 3 },
    { "img": "disappointed.png", "name": "Disappointed", "param3": "disappointed", "number": 3 },
    { "img": "overwhelmed.png", "name": "Overwhelmed", "param3": "overwhelmed", "number": 3 },
    { "img": "stressed.png", "name": "Stressed", "param3": "stressed", "number": 3 },
    { "img": "lonely.png", "name": "Lonely", "param3": "lonely", "number": 2 },
    { "img": "depressed.png", "name": "Depressed", "param3": "depressed", "number": 1 }

  ];
  const activeArr = [
    { "img": "soccer.png", "name": "Soccer", "param3": "soccer" },
    { "img": "football.png", "name": "Football", "param3": "football" },
    { "img": "baseball.png", "name": "Baseball", "param3": "baseball" },
    { "img": "lacrosse.png", "name": "Lacrosse", "param3": "lacrosse" },
    { "img": "gymnastics.png", "name": "Gymnastics", "param3": "gymnastics" },
    { "img": "golf.png", "name": "Golf", "param3": "golf" },
    { "img": "yoga.png", "name": "Yoga", "param3": "yoga" },
    { "img": "basketball.png", "name": "Basketball", "param3": "basketball" },
    { "img": "biking.png", "name": "Biking", "param3": "biking" },
    { "img": "running.png", "name": "Running", "param3": "running" },
    { "img": "hockey.png", "name": "Hockey", "param3": "hockey" },
    { "img": "weightlifting.png", "name": "Weightlifting", "param3": "weightlifting" },
    { "img": "volleyball.png", "name": "Volleyball", "param3": "volleyball" },
    { "img": "surfing.png", "name": "Surfing", "param3": "surfing" },
    { "img": "swimming.png", "name": "Swimming", "param3": "swimming" },
    { "img": "cheer.png", "name": "Cheer", "param3": "cheer" },
    { "img": "tennis.png", "name": "Tennis", "param3": "tennis" },
    { "img": "scootering.png", "name": "Scootering", "param3": "scootering" },
    { "img": "skiing.png", "name": "Skiing", "param3": "skiing" },
    { "img": "skateboarding.png", "name": "Skateboarding", "param3": "skateboarding" },
    { "img": "dance.png", "name": "Dance", "param3": "dance" },
    { "img": "hike.png", "name": "Hike", "param3": "hike" },
    { "img": "martialarts.png", "name": "Martialarts", "param3": "martialarts" },
    { "img": "walk.png", "name": "Walk", "param3": "walk" },
    { "img": "soccer.png", "name": "Soccer", "param3": "soccer" }

  ];
  if (props.onMood) {
    return (
      <div>
        <div className="row">
          {moodArr.map((prop, key) => {
            return (
              <div className="col-md-2 mood-icon"
              >
                <TouchableOpacity
                  onPress={() => {
                    props.onModal(true, prop.name, prop.param3, prop.number)
                  }}
                >
                  <img
                    src={"../../Assets/Images/Moods/" + prop.img}
                  />
                </TouchableOpacity>
                <span>{prop.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    )

    // )
  }
  if (props.onActivity) {
    return (
      <div>
        <div className="row">
          {activeArr.map((prop, key) => {
            return (
              <div className="col-md-2 mood-icon"
              >
                <TouchableOpacity
                  onPress={() => {
                    props.onActivityModal(true, prop.name, prop.param3)
                  }}
                >
                  <img
                    src={"../../Assets/Images/Activities/" + prop.img}
                  />
                </TouchableOpacity>
                <span>{prop.name}</span>
              </div>
            )
          })}
        </div>
      </div>
     
    )
  }
  if (props.onSleep) {
    return (
      <View style={Style.sleepColumn}>
        {props.todaySleep.length !== 0 ? (
          <Fragment>
            {Object.entries(props.todaySleep).map(function (sleep, index) {
              return (
                <Fragment key={index}>
                  {props.editSleep ? (
                    <Fragment>
                      <Text h4 h4Style={Style.emotionText}>
                        How Much Sleep Did You Get?{' '}
                      </Text>
                      <Text h3 h3Style={Style.emotionText}>
                        {props.sleep} Hours
                      </Text>
                      <Picker selectedValue={props.sleep} onValueChange={this.updateSleep}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="1.5" value="1.5" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="2.5" value="2.5" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="3.5" value="3.5" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="4.5" value="4.5" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="5.5" value="5.5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="6.5" value="6.5" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="7.5" value="7.5" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="8.5" value="8.5" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="9.5" value="9.5" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="10.5" value="10.5" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="11.5" value="11.5" />
                        <Picker.Item label="12" value="12" />
                        <Picker.Item label="12.5" value="12.5" />
                        <Picker.Item label="13" value="13" />
                      </Picker>

                      <View style={Style.confirmButton}>
                        <Button
                          style={Style.height50}
                          onPress={() => {
                            props.onSleepConfirm()
                            this.editSleep(false)
                          }}
                          title="Confirm"
                          type="solid"
                          titleStyle={Style.titleStyle}
                          buttonStyle={Style.buttonStyle}
                        />
                      </View>
                    </Fragment>
                  ) : (
                    <Fragment key={index}>
                      <Text h4 h4Style={Style.emotionText}>
                        You Slept {sleep.hours} Hours Last Night {props.editSleep}
                      </Text>
                      <View style={Style.sleepImgHolder}>
                        <Image
                          style={Style.sleepImage}
                          source={require('../../Assets/Images/sleep.png')}
                        />
                      </View>
                      <Button
                        buttonStyle={Style.lightBackground}
                        title="Edit Sleep"
                        onPress={() => {
                          this.editSleep(true)
                        }}
                      ></Button>
                    </Fragment>
                  )}
                </Fragment>
              )
            })}
          </Fragment>
        ) : (
          <Fragment>
            <Text h4 h4Style={Style.emotionText}>
              How Much Sleep Did You Get?{' '}
            </Text>
            <Text h3 h3Style={Style.emotionText}>
              {props.sleep} Hours
            </Text>
            <Picker selectedValue={props.sleep} onValueChange={this.updateSleep}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="1.5" value="1.5" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="2.5" value="2.5" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="3.5" value="3.5" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="4.5" value="4.5" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="5.5" value="5.5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="6.5" value="6.5" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="7.5" value="7.5" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="8.5" value="8.5" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="9.5" value="9.5" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="10.5" value="10.5" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="11.5" value="11.5" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="12.5" value="12.5" />
              <Picker.Item label="13" value="13" />
            </Picker>

            <View style={Style.confirmButton}>
              <Button
                style={Style.height50}
                onPress={() => {
                  props.onSleepConfirm()
                }}
                title="Confirm"
                type="solid"
                titleStyle={Style.titleStyle}
                buttonStyle={Style.buttonStyle}
              />
            </View>
          </Fragment>
        )}
      </View>
    )
  } else {
    return (
      <View>
        <View style={Style.rowOne}>
          <View
            onPress={() => console.log('Works!')}
            // activeOpacity={0.7}
            style={Style.borderLine}
          />

          <View
            onPress={() => console.log('Works!')}
            // activeOpacity={0.7}
            style={Style.selectorBox}
          />
        </View>

        <View style={Style.rowTwo}>
          <View onPress={() => console.log('Works!')} style={Style.selectorBox} />

          <View onPress={() => console.log('Works!')} style={Style.selectorBox} />
        </View>
      </View>
    )
  }
}

class AddScreen extends React.Component {
  constructor(props) {
    console.log('sdn',props)
    super(props)
    const today = new Date()
    this.state = {}
    this.state = {
      editSleep: false,
      onMood: true,
      onActivity: false,
      selectedDay: today,
      onSleep: false,
      mainModalVisible: true,
      improve:false,
      modalVisible: false,
      clockModalVisible: false,
      journalModalVisible: false,
      durationModalVisible: false,
      activityModalVisible: false,
      journalInput: null,
      localActivity: null,
      localActivityImg: 'running',
      localMood: null,
      moodScore: '10',
      entry: '',
      sleep: '6',
      duration: '30',
      localEmoji: 'grinning',
      date: today,
      mode: 'time',
    }
    // eslint-disable-next-line no-undef
    var updateSleep = (sleep) => {
      this.setState({ sleep: sleep })
    }
    // eslint-disable-next-line no-undef
    var editSleep = (bool) => {
      this.setState({ editSleep: bool })
    }
  }

  onSleepConfirm = () => {
    this._createSleep(this.state.sleep, this.state.selectedDay)
    this._fetchSleeps(this.state.selectedDay)
    Alert.alert(
      'Success',
      'Sleep Submitted',
      [{ text: 'OK', onPress: () => this._fetchSleeps(this.state.selectedDay) }],
      { cancelable: false }
    )
  }

  componentDidMount() {
    this._fetchUser()
    this._fetchSleeps(this.state.selectedDay)
  }

  render() {
    // const { navigate } = this.props.navigation
    const { date } = this.state
    return (
      <SafeAreaView style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#9086A6" />
        ) : (
          <div>
            <div className={"modal fade " + (this.state.modalVisible ? "show" : "")}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.')
              }}
              role="dialog">
              <div className="modal-dialog  modal-dialog-centered" role="document">
                <div className="modal-content">
                  {/* <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div> */}
                  <div className="modal-body">
                    {/* <Modal
                          animationType="slide"
                          transparent={false}

                        > */}
                    <View style={Style.modalHeader}>
                      <View>
                        <Text h4 h4Style={Style.modalText}>
                          You Are Feeling {this.state.localMood}{' '}
                        </Text>

                        <View style={Style.modalImage}>
                          <Image
                            style={Style.bigActivity}
                            source={Mood.image[this.state.localEmoji]}
                          />
                        </View>
                        <View style={Style.confirmButton}>
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.setClockModalVisible(true)
                            }}
                            title="Confirm"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.buttonStyle}
                          />
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.setModalVisible(
                                !this.state.modalVisible,
                                '',
                                'grinning',
                                this.state.moodScore
                              )
                              this.props.data.showHideAddScreen(false);
                            }}
                            title="Cancel"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.cancelStyle}
                          />
                        </View>
                      </View>
                    </View>
                    {/* </Modal> */}
                  </div>
                </div>
              </div>
            </div>

            <div className={"modal fade " + (this.state.clockModalVisible ? "show" : "")}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.')
              }}
              role="dialog">
              <div className="modal-dialog  modal-dialog-centered" role="document">
                <div className="modal-content">

                  <div className="modal-body">
                    <View style={Style.modalHeader}>
                      <View>
                        <Text h4 h4Style={Style.modalText}>
                          At What Time?
                        </Text>

                        <DateTimePicker
                          style={Style.datepickerText}
                          value={date}
                          mode={this.state.mode}
                          is24Hour={true}
                          display="spinner"
                          onChange={this.setTime}
                        />

                        <View style={Style.confirmButton}>
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.setJournalModalVisible(true)
                            }}
                            title="Confirm"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.buttonStyle}
                          />
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.setClockModalVisible(!this.state.clockModalVisible)
                              this.props.data.showHideAddScreen(false);
                            }}
                            title="Cancel"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.cancelStyle}
                          />
                        </View>
                      </View>
                    </View>
                  </div>
                </div>
              </div>
            </div>

            <div className={"modal fade " + (this.state.journalModalVisible ? "show" : "")}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.')
              }}
              role="dialog">
              <div className="modal-dialog  modal-dialog-centered" role="document">
                <div className="modal-content">

                  <div className="modal-body">
                    <View style={Style.journalHeader}>
                      <View>
                        <Text h4 h4Style={Style.modalText}>
                          Journal your Mood
                        </Text>

                        <TextInput
                          // {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                          style={{ backgroundColor: '#ededed', height: 120, margin: 30 }}
                          multiline={true}
                          value={this.state.value}
                          placeholder={'How do you feel?'}
                          autoFocus={true}
                          onChangeText={(e) => {
                            this.setEntry(e)
                          }}
                          editable
                          maxLength={300}
                        />

                        <View style={Style.confirmButton}>
                          <View style={Style.confirmButton}>
                            <Button
                              style={Style.height50}
                              onPress={() => {
                                this.confirmLogic()
                                // this.setJournalModalVisible(!this.state.clockModalVisible)
                              }}
                              title="Skip"
                              type="solid"
                              titleStyle={Style.titleStyle}
                              buttonStyle={Style.buttonStyle}
                            />
                            <Button
                              style={Style.height50}
                              onPress={() => {
                                this.confirmLogic()
                              }}
                              title="Confirm"
                              type="solid"
                              titleStyle={Style.titleStyle}
                              buttonStyle={Style.cancelStyle}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </div>
                </div>
              </div>
            </div>

            <div className={"modal fade " + (this.state.durationModalVisible ? "show" : "")}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.')
              }}
              role="dialog">
              <div className="modal-dialog  modal-dialog-centered" role="document">
                <div className="modal-content">

                  <div className="modal-body">
                    <View style={Style.modalHeader}>
                      <View>
                        <Text h4 h4Style={Style.modalText}>
                          For How Long?
                        </Text>

                        <Text h3 h3Style={Style.durationText}>
                          {this.state.duration} Minutes
                        </Text>
                        <Picker
                          selectedValue={this.state.duration}
                          onValueChange={this.updateDuration}
                        >
                          <Picker.Item label="15" value="15" />
                          <Picker.Item label="30" value="30" />
                          <Picker.Item label="60" value="60" />
                          <Picker.Item label="90" value="90" />
                          <Picker.Item label="120" value="120" />
                        </Picker>

                        <View style={Style.confirmButton}>
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.onActivityConfirm()
                            }}
                            title="Confirm"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.buttonStyle}
                          />
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.setDurationModalVisible(!this.state.durationModalVisible)
                              this.props.data.showHideAddScreen(false);
                            }}
                            title="Cancel"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.cancelStyle}
                          />
                        </View>
                      </View>
                    </View>
                  </div>
                </div>
              </div>
            </div>


            <div className={"modal fade " + (this.state.activityModalVisible ? "show" : "")}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.')
              }}
              role="dialog">
              <div className="modal-dialog  modal-dialog-centered" role="document">
                <div className="modal-content">

                  <div className="modal-body">
                    <View style={Style.modalHeader}>
                      <View>
                        <Text h4 h4Style={Style.modalText}>
                          Your Activity Was {this.state.localActivity}
                        </Text>

                        <View style={Style.modalImage}>
                          <Image
                            style={Style.bigActivity}
                            source={Activity.image[this.state.localActivityImg]}
                          />
                        </View>

                        <View style={Style.confirmButton}>
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.setDurationModalVisible(true)
                            }}
                            title="Confirm"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.buttonStyle}
                          />
                          <Button
                            style={Style.height50}
                            onPress={() => {
                              this.setActivityModalVisible(!this.state.activityModalVisible)
                              this.props.data.showHideAddScreen(false);
                            }}
                            title="Cancel"
                            type="solid"
                            titleStyle={Style.titleStyle}
                            buttonStyle={Style.cancelStyle}
                          />
                        </View>
                      </View>
                    </View>
                  </div>
                </div>
              </div>
            </div>

            {/* <Text h4 h4Style={Style.headerText}>
                Add{' '}
              </Text> */}
            {/* <div className='row'>
              <div className='col-md-12 main-title'>
                <h2 className='wish-title'>Good Morning, Susan</h2>
                <p className='wish-sub-title'>You have <span className="badge badge-pill badge-danger">2</span> new task and 5% sleep to reach your goal</p>
              </div>
              <div className='col-md-12'>
                <Fragment>
                  <CalendarStrip
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    onDateSelected={(day) => this.changeSelectedDay(day)}
                    daySelectionAnimation={{
                      type: 'border',
                      duration: 200,
                      borderWidth: 0,
                      borderHighlightColor: 'grey',
                    }}
                    style={{ height: 200, paddingTop: 20, paddingBottom: 10 }}
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
              </div></div> */}
            {/* <Fragment>
              <Button
                style={Style.todayButton}
                onPress={() => {
                  this.changeSelectedDay(moment())
                }}
                title="Go to Today"
                type="solid"
                titleStyle={Style.titleStyle}
                buttonStyle={Style.buttonStyle}
              ></Button>
            </Fragment> */}
            {/* <Fragment>
              <View style={Style.circles}>
                <TouchableOpacity
                  style={this.state.onMood ? Style.circlesActive : Style.circlesInactive}
                  onPress={() =>
                    this.setState({
                      onActivity: false,
                      onMood: true,
                      onSleep: false,
                    })
                  }
                >
                  <Text style={this.state.onMood ? Style.activeText : Style.inactiveText}>
                    Mood
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={this.state.onActivity ? Style.circlesActive : Style.circlesInactive}
                  onPress={() =>
                    this.setState({
                      onActivity: true,
                      onMood: false,
                      onSleep: false,
                    })
                  }
                >
                  <Text style={this.state.onActivity ? Style.activeText : Style.inactiveText}>
                    Activity
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={this.state.onSleep ? Style.circlesActive : Style.circlesInactive}
                  onPress={() =>
                    this.setState({
                      onActivity: false,
                      onMood: false,
                      onSleep: true,
                    })
                  }
                >
                  <Text style={this.state.onSleep ? Style.activeText : Style.inactiveText}>
                    Sleep
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment> */}

            {/* <Fragment> */}

            {/* <RenderType
              onSleepConfirm={this.onSleepConfirm.bind(this)}
              todaySleep={this.props.sleeps}
              onActivityModal={this.setActivityModalVisible.bind(this)}
              onModal={this.setModalVisible.bind(this)}
              onMood={this.state.onMood}
              sleep={this.state.sleep}
              duration={this.state.duration}
              onActivity={this.state.onActivity}
              onSleep={this.state.onSleep}
              editSleep={this.state.editSleep}
            ></RenderType> */}
            <div className={"modal-backdrop fade" + ((this.state.modalVisible || this.state.clockModalVisible || this.state.journalModalVisible || this.state.durationModalVisible || this.state.activityModalVisible || this.state.mainModalVisible) ? " show" : " hide")}></div>

            <div className={"modal fade bd-example-modal-lg addpopup" + ((this.state.mainModalVisible) ? " show" : " hide")} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg  modal-dialog-centered">
                <div className="modal-content">
                  <div className="row">
                    <div className="col-md-4">
                      <ul className="side-nav">
                        <li  className={this.state.onMood?"active":""}>

                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                improve:false,
                                onActivity: false,
                                onMood: true,
                                onSleep: false,
                              })
                            }
                          >
                            <div className="float-left iconbox">
                              <img src='../../Assets/Images/Moods/loved.png' />
                            </div>
                            <div className="float-left navtext">
                              <p>Mood</p>
                              <p>This is for test</p>
                            </div>
                            <div className="clear"></div>
                          </TouchableOpacity>


                        </li>
                        <li  className={this.state.onSleep?"active":""}>
                        <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                improve:false,
                                onActivity: false,
                                onMood: false,
                                onSleep: true,
                              })
                            }
                          >
                            <div className="float-left iconbox">
                              <img src='../../Assets/Images/Moods/loved.png' />
                            </div>
                            <div className="float-left navtext">
                              <p>Sleep</p>
                              <p>Add Your Sleep Time</p>
                            </div>
                            <div className="clear"></div>
                          </TouchableOpacity>
                        </li>
                        <li className={this.state.onActivity?"active":""}>
                        <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                improve:false,
                                onActivity: true,
                                onMood: false,
                                onSleep: false,
                              })
                            }
                          >
                            <div className="float-left iconbox">
                              <img src='../../Assets/Images/Moods/loved.png' />
                            </div>
                            <div className="float-left navtext">
                              <p>Activity</p>
                              <p>Add New Activity to Tracke</p>
                            </div>
                            <div className="clear"></div>
                          </TouchableOpacity>
                        </li>
                        <li>
                        <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                improve:true,
                                onActivity: false,
                                onMood: false,
                                onSleep: false,
                              })
                            }
                          >
                          <div className="float-left iconbox">
                            <img src='../../Assets/Images/Moods/loved.png' />
                          </div>
                          <div className="float-left navtext">
                            <p>Mindfulness</p>
                            <p>Add New Activity to Track</p>
                          </div>
                          <div className="clear"></div>
                          </TouchableOpacity>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-8 moodsicons">
                    <TouchableOpacity
                  onPress={() => {
                    this.setState({ mainModalVisible: false })
                    this.props.data.showHideAddScreen(false); 
                  }}
                >
        <button className="btn text-right">X</button>
      </TouchableOpacity>
      {this.state.improve?
                  (<AnalyticsScreen />)
                  :(
                    <div>
                      <h2>Select Your Mood Now</h2>
                      <RenderType
                        onSleepConfirm={this.onSleepConfirm.bind(this)}
                        todaySleep={this.props.sleeps}
                        onActivityModal={this.setActivityModalVisible.bind(this)}
                        onModal={this.setModalVisible.bind(this)}
                        onMood={this.state.onMood}
                        sleep={this.state.sleep}
                        duration={this.state.duration}
                        onActivity={this.state.onActivity}
                        onSleep={this.state.onSleep}
                        editSleep={this.state.editSleep}
                      ></RenderType>
                      </div>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
              
            </div>
          </div>
        )
        }
      </SafeAreaView>

    )
  }

  setTime = (date,event) => {
    date = date || this.state.date

    var today = new Date(this.state.date)

    var year = today.getFullYear()
    var month = today.getMonth()
    var day = today.getDate()
    var hours = date.getHours()
    var minutes = date.getMinutes()

    date = new Date(year, month, day, hours, minutes, 0, 0)

    this.setState({
      show: true,
      date,
    })
  }

  resetTime = (date,event) => {
    date = date || this.state.date

    var now = new Date()

    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate()
    var hours = now.getHours()
    var minutes = now.getMinutes()

    date = new Date(year, month, day, hours, minutes, 0, 0)

    this.setState({
      show: true,
      date,
    })
  }

  updateDuration = (duration) => {
    this.setState({ duration: duration })
  }

  changeSelectedDay(day) {
    this.setState({ selectedDay: day._d }, () => {
      this._fetchSleeps(this.state.selectedDay)
      this.setTime()
    })
  }

  setModalVisible(visible, name, emoji, score) {
    // reset time
    this.resetTime()
    this.setState({ mainModalVisible: false })
    this.setState({ modalVisible: visible })
    this.setState({ localMood: name })
    this.setState({ localEmoji: emoji })
    this.setState({ moodScore: score })
  }

  setActivityModalVisible(visible, name, activity) {
    this.setState({ mainModalVisible: false })
    this.setState({ activityModalVisible: visible })
    this.setState({ localActivity: name })
    this.setState({ localActivityImg: activity })
  }

  setClockModalVisible(visible) {
    if (this.state.onActivity) {
      this.setState({ clockModalVisible: visible }, () => {
        this.setActivityModalVisible(false, this.state.localActivity, 'running')
      })
    }
    if (this.state.onMood) {
      this.setState({ clockModalVisible: visible }, () => {
        this.setModalVisible(false, this.state.localMood, 'grinning', this.state.moodScore)
      })
    }
  }

  setEntry(e) {
    this.setState({ entry: e })
  }

  setJournalModalVisible(visible) {
    if (this.state.onActivity) {
      this.setState({ journalModalVisible: visible }, () => {
        this.setClockModalVisible(false, this.state.localActivity, 'running')
      })
    }
    if (this.state.onMood) {
      this.setState({ journalModalVisible: visible }, () => {
        this.setClockModalVisible(false, this.state.localActivity, 'running')
      })
    }
  }

  setDurationModalVisible(visible) {
    if (this.state.onActivity) {
      this.setState({ durationModalVisible: visible }, () => {
        this.setClockModalVisible(false, this.state.localActivity, 'running')
      })
    }
    // if(this.state.onMood) {
    //   this.setState({clockModalVisible: visible}, () => {
    //     this.setModalVisible(false, this.state.localMood, 'grinning');
    //   });
    // }
  }

  onActivityConfirm() {
    this._createActivity(this.state.localActivity, this.state.date, this.state.duration)
    this.setDurationModalVisible(!this.state.durationModalVisible, '', 'running')
    this.props.data.showHideAddScreen(false);
  }

  confirmLogic() {
    if (this.state.onActivity) {
      this.setDurationModalVisible(true)
    }
    if (this.state.onMood) {
      this.onConfirm()
    }
    this.props.data.showHideAddScreen(false);
  }

  onConfirm() {
    this._createMood(this.state.localMood, this.state.date, this.state.moodScore, this.state.entry)
    this.setJournalModalVisible(false, '', 'grinning', this.state.moodScore)
  }

  _createMood(moodType, targetDate, moodScore, entry) {
    this.props.createMood(moodType, targetDate, moodScore, entry)
  }

  _createActivity(activityType, targetDate, activityDuration) {
    this.props.createActivity(activityType, targetDate, activityDuration)
  }

  _createSleep(sleepHours, targetDate) {
    this.props.createSleep(sleepHours, targetDate)
    this.props.sleeps = ['1']
    this._fetchSleeps(this.state.selectedDay)
    this.setState({ onActivity: false, onMood: true, onSleep: false })
  }

  _fetchUser() {
    this.props.fetchUser()
  }

  _fetchSleeps(thisDate) {
    this.props.fetchSleeps(thisDate)
  }
}

AddScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  createMood: PropTypes.func,
  createActivity: PropTypes.func,
  createSleep: PropTypes.func,
  fetchSleeps: PropTypes.func,
  sleeps: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  sleeps: state.example.sleeps,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
  createMood: (moodType, targetDate, moodScore, entry) =>
    dispatch(ExampleActions.createMood(moodType, targetDate, moodScore, entry)),
  createActivity: (activityType, targetDate, activityDuration) =>
    dispatch(ExampleActions.createActivity(activityType, targetDate, activityDuration)),
  createSleep: (sleepHours, targetDate) =>
    dispatch(ExampleActions.createSleep(sleepHours, targetDate)),
  fetchSleeps: (thisDate) => dispatch(ExampleActions.fetchSleeps(thisDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen)
