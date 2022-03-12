import React, { Fragment } from 'react'
import { Button, Text } from 'react-native-elements'
import {
  Platform,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native-web'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from '../../Stores/Example/Actions'
import Style from './AnalyticsStyle'
// import CalendarStrip from 'react-native-calendar-strip'
import DateTimePicker from '@react-native-community/datetimepicker'
import Mindfulness from './mindfulness-imgs/index'
//import Video from 'react-native-video'
import Util from './Utils'

function RenderType(props) {
  const activitySize = 70
  const meditationSize = 90

  if (props.onImprove) {
    return (
      <View style={Style.mainContain}>
        <Button
          buttonStyle={Style.backButton}
          title="Back"
          onPress={() => {
            props.clickBack()
          }}
        ></Button>
        </View>
)
  }
}

class AnalyticsScreen extends React.Component {
  constructor(props) {
    console.log("analy",props);
    super(props)
    const today = new Date()
    this.state = {}
    this.state = {
      onImprove: false,
      onRelax: false,
      onReduceAnxiety: false,
      onEnhanceCalm: false,
      onRelaxSub: false,
      onBuildFocus: false,
      onDecreaseStress: false,
      onImproveSleep: false,
      onSoothingSounds: false,
      onMain: true,
      selectedDay: today,
      // onSleep: false,
      modalVisible: false,
      clockModalVisible: false,
      durationModalVisible: false,
      localRelax: null,
      localRelaxImg: 'running',
      localMood: null,
      moodScore: '10',
      // sleep: "1",
      duration: '30',
      localEmoji: 'grinning',
      orientationWidth: 400,
      orientationHeight: 400,
      date: today,
      mode: 'time',
    }

    this.onLayout = this.onLayout.bind(this)
  }

  componentDidMount() {
    this._fetchUser()
    this.resizeVideoPlayer()
  }

  resizeVideoPlayer() {
    // Always in 16 /9 aspect ratio
    let { width, height } = Dimensions.get('window')

    if (Util.isPortrait()) {
      this.setState({
        orientationWidth: width * 0.8,
        orientationHeight: width * 0.8 * 0.56,
      })
    } else {
      this.setState({
        orientationHeight: height * 0.8,
        orientationWidth: height * 0.8 * 1.77,
      })
    }
  }

  onLayout(e) {
    console.log('on layout called')
    this.resizeVideoPlayer()
  }

  render() {
    const { date } = this.state
    return (
      
      <SafeAreaView style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#9086A6" />
        ) : (
          <Fragment>
            <Fragment>
              <View>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                  }}
                >
                  <View style={Style.centerFlex}>
                    <View>
                      <Text h4 h4Style={Style.modalText}>
                        {' '}
                        {this.state.localMood}{' '}
                      </Text>

                      <View style={Style.centerMargin}>
                        <Image
                          style={Style.bigActivity}
                          source={Mindfulness.image[this.state.localEmoji]}
                        />
                      </View>
                      <View style={Style.confirmButton}>
                        <Button
                          style={Style.height50}
                          onPress={() => {
                            this.confirmLogic()
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
                          }}
                          title="Cancel"
                          type="solid"
                          titleStyle={Style.titleStyle}
                          buttonStyle={Style.cancelStyle}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>

              <View>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.clockModalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                  }}
                >
                  <View style={Style.centerFlex}>
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
                            this.confirmLogic()
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
                          }}
                          title="Cancel"
                          type="solid"
                          titleStyle={Style.titleStyle}
                          buttonStyle={Style.buttonStyle}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>

              <Text h4 h4Style={Style.headerText}>
                Mindfulness{' '}
              </Text>
            </Fragment>
            {/* <Fragment>
              <View style={Style.circles}>
                <TouchableOpacity
                  style={this.state.onImprove ? Style.circlesActive : Style.circlesInactive}
                  onPress={() =>
                    this.setState({
                      onRelax: false,
                      onImprove: true,
                    })
                  }
                >
                  <Text style={this.state.onImprove ? Style.activeText : Style.inactiveText}>
                    Improve
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={this.state.onRelax ? Style.circlesActive : Style.circlesInactive}
                  onPress={() =>
                    this.setState({
                      onRelax: true,
                      onImprove: false,
                      //  onSleep: false
                    })
                  }
                >
                  <Text style={this.state.onRelax ? Style.activeText : Style.inactiveText}>
                    Relax
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment> */}

            {/* <Fragment> */}

            <RenderType
              // onSleepConfirm = {this.onSleepConfirm.bind(this)} todaySleep = {this.props.sleeps}
              onModal={this.setModalVisible.bind(this)}
              onButtonPress={this.onButtonPress.bind(this)}
              clickImprove={this.clickImprove.bind(this)}
              clickRelax={this.clickRelax.bind(this)}
              clickReduceAnxiety={this.clickReduceAnxiety.bind(this)}
              clickEnhanceCalm={this.clickEnhanceCalm.bind(this)}
              clickRelaxSub={this.clickRelaxSub.bind(this)}
              clickBuildFocus={this.clickBuildFocus.bind(this)}
              clickDecreaseStress={this.clickDecreaseStress.bind(this)}
              clickImproveSleep={this.clickImproveSleep.bind(this)}
              clickSoothingSounds={this.clickSoothingSounds.bind(this)}
              clickBack={this.clickBack.bind(this)}
              clickBackOne={this.clickBackOne.bind(this)}
              onVideoEnd={this.onVideoEnd.bind(this)}
              onImprove={this.state.onImprove}
              sleep={this.state.sleep}
              duration={this.state.duration}
              onRelax={this.state.onRelax}
              onReduceAnxiety={this.state.onReduceAnxiety}
              onEnhanceCalm={this.state.onEnhanceCalm}
              onRelaxSub={this.state.onRelaxSub}
              onBuildFocus={this.state.onBuildFocus}
              onDecreaseStress={this.state.onDecreaseStress}
              onImproveSleep={this.state.onImproveSleep}
              onSoothingSounds={this.state.onSoothingSounds}
              orientationHeight={this.state.orientationHeight}
              orientationWidth={this.state.orientationWidth}
            ></RenderType>
          </Fragment>
        )}
      </SafeAreaView>
    )
  }

  setTime = (event, date) => {
    date = date || this.state.date

    var today = new Date(this.state.selectedDay)

    var year = today.getFullYear()
    var month = today.getMonth()
    var day = today.getDate()
    var hours = date.getHours()
    var minutes = date.getMinutes()

    date = new Date(year, month, day, hours, minutes, 0, 0)

    this.setState({
      show: Platform.OS === 'ios',
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
    this.setState({ modalVisible: visible })
    this.setState({ localMood: name })
    this.setState({ localEmoji: emoji })
    this.setState({ moodScore: score })
  }

  clickImprove() {
    this.setState({ onImprove: true })
    this.setState({ onMain: false })
    this.setState({ onRelax: false })
    this.setState({ onReduceAnxiety: false })
  }

  clickRelax() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: true })
    this.setState({ onReduceAnxiety: false })
  }

  clickReduceAnxiety() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: false })
    this.setState({ onReduceAnxiety: true })
  }

  clickEnhanceCalm() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: false })
    this.setState({ onEnhanceCalm: true })
  }

  clickRelaxSub() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: false })
    this.setState({ onRelaxSub: true })
  }

  clickBuildFocus() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: false })
    this.setState({ onBuildFocus: true })
  }

  clickDecreaseStress() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: false })
    this.setState({ onDecreaseStress: true })
  }

  clickImproveSleep() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: false })
    this.setState({ onImproveSleep: true })
  }

  clickSoothingSounds() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: false })
    this.setState({ onSoothingSounds: true })
  }

  clickBack() {
    this.setState({ onImprove: false })
    this.setState({ onMain: true })
    this.setState({ onRelax: false })
    this.setState({ onReduceAnxiety: false })
  }
  clickBackOne() {
    this.setState({ onImprove: false })
    this.setState({ onMain: false })
    this.setState({ onRelax: true })
    this.setState({ onReduceAnxiety: false })
    this.setState({ onEnhanceCalm: false })
    this.setState({ onRelaxSub: false })
    this.setState({ onBuildFocus: false })
    this.setState({ onDecreaseStress: false })
    this.setState({ onImproveSleep: false })
    this.setState({ onSoothingSounds: false })
  }

  onButtonPress(video, type) {
    if (video != null) this._createVideo(type, this.state.date, 1)
    video.presentFullscreenPlayer()
  }

  onVideoEnd(video, type) {
    console.log('Video has ended')
    this._createVideo(type, this.state.date, 4)
    video.dismissFullscreenPlayer()
  }

  setClockModalVisible(visible) {
    if (this.state.onRelax) {
      this.setState({ clockModalVisible: visible }, () => {
        // this.setRelaxModalVisible(false, this.state.localRelax, 'running');
      })
    }
    if (this.state.onImprove) {
      this.setState({ clockModalVisible: visible }, () => {
        this.setModalVisible(false, this.state.localMood, 'grinning', this.state.moodScore)
      })
    }
  }

  setDurationModalVisible(visible) {
    if (this.state.onRelax) {
      this.setState({ durationModalVisible: visible }, () => {
        // this.setClockModalVisible(false, this.state.localRelax, 'running');
      })
    }
  }

  confirmLogic() {
    if (this.state.onRelax) {
      this.setDurationModalVisible(true)
    }
    if (this.state.onImprove) {
      this.setState({ clockModalVisible: false }, () => {
        this.setModalVisible(false, this.state.localMood, 'grinning', this.state.moodScore)
        this.onConfirm()
      })
    }
  }

  onConfirm() {
    this._createMindfulness(this.state.localMood, this.state.date, this.state.moodScore)
    // this.setClockModalVisible(!this.state.clockModalVisible, '', 'grinning', this.state.moodScore)
  }

  _createMindfulness(moodType, targetDate, moodScore) {
    this.props.createMindfulness(moodType, targetDate, moodScore)
  }

  _createVideo(videoType, targetDate, videoScore) {
    this.props.createVideo(videoType, targetDate, videoScore)
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

AnalyticsScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  createMindfulness: PropTypes.func,
  createVideo: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
  createMindfulness: (moodType, targetDate, moodScore) =>
    dispatch(ExampleActions.createMindfulness(moodType, targetDate, moodScore)),
  createVideo: (videoType, targetDate, videoScore) =>
    dispatch(ExampleActions.createVideo(videoType, targetDate, videoScore)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsScreen)
