/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from 'react'
import { Text, ButtonGroup } from 'react-native-elements'
import { View, ActivityIndicator, ScrollView, Image, Dimensions } from 'react-native-web'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import StartupActions from '../../Stores/Startup/Actions'
import Style from './CalendarStyle'
//import { NavigationEvents } from 'react-navigation'
import LineChart  from '../../mark/line-chart'
import MoodChart  from '../../mark/mood-chart'
import {CalendarStrip} from 'react-native-calendar-strip'
import Mood from '../Add/mood-imgs/index'
import Activity from '../Add/imgs/index'
import Mindful from '../Analytics/mindfulness-imgs/index'

import FlashMessage, { showMessage } from 'react-native-flash-message'
//here import { TouchableOpacity } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
class CalendarScreen extends React.Component {
  constructor(props) {
    super(props)
    var today = {}
    var todaysDate = this.formatDate()
    today[todaysDate] = { selected: true }
    this.state = {
      selectedDay: today,
      selectedIndex: 0,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  getEmojiSize = function(duration) {
    if (duration === '15') {
      return 24
    }
    if (duration === '30') {
      return 27
    }
    if (duration === '60') {
      return 32
    }
    if (duration === '90') {
      return 36
    }
    if (duration === '120') {
      return 40
    } else {
      return 30
    }
  }

  componentDidMount() {
    // this._fetchUser()
  }

  pullDate() {
    this._fetchMonth(this.state.selectedDay)
    this._fetchAll(this.state.selectedDay)
  }

  pullMonth() {
    this._fetchMonth(this.state.selectedDay)
  }

  initialPullDate() {
    var keys = Object.keys(this.state.selectedDay)
    var dayString = keys[0]
    if (dayString) {
      var dateParse = dayString.split('-')
      var newDate = dateParse[1] + '/' + dateParse[2] + '/' + dateParse[0]
      var finalDate = new Date(newDate)
      this._fetchAll(finalDate)
      this._fetchMonth(finalDate)
    } else {
      this.changeSelectedDay(new Date())
    }
  }

  initialFetchAllData() {
    this.initialPullDate()
  }

  fetchAllData() {
    this.pullDate()
  }

  getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay()
    return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'][dayOfWeek]
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

  changeSelectedDay(day) {
    if (day._d) {
      var x = {}
      x[day.dateString] = { selected: true }
      this.setState({ selectedDay: day._d }, () => {
        this.pullDate()
      })
    } else {
      this.setState({ selectedDay: day }, () => {
        this.pullDate()
      })
    }
  }

  render() {
    const buttons = ['Day', 'Week', 'Month']
    const { selectedIndex } = this.state
    return (
      <View style={Style.container}>
        {/* <NavigationEvents onDidFocus={() => this.initialFetchAllData()} /> */}
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#9086A6" />
        ) : (
          <View>
            <Text h4 h4Style={Style.headerText}>
              {' '}
            </Text>
            <CalendarStrip
              calendarAnimation={{ type: 'sequence', duration: 30 }}
              selectedDate={this.state.selectedDay}
              onDateSelected={(day) => this.changeSelectedDay(day)}
              daySelectionAnimation={{
                type: 'border',
                duration: 200,
                borderWidth: 0,
                borderHighlightColor: 'grey',
              }}
              calendarHeaderStyle={Style.titleTextCal}
              dateNumberStyle={Style.titleTextCal}
              dateNameStyle={Style.titleTextCal}
              highlightDateNumberStyle={Style.lightHighlight}
              highlightDateNameStyle={Style.lightHighlight}
              disabledDateNameStyle={Style.titleTextCal}
              disabledDateNumberStyle={Style.titleTextCal}
              iconLeft={require('../../Assets/Images/leftArrow.png')}
              iconRight={require('../../Assets/Images/rightArrow.png')}
              iconContainer={{ flex: 0.1 }}
              style={Style.calendarStrip}
            />

            <FlashMessage
              titleStyle={Style.titleStyle}
              style={Style.flashMessage}
              duration={3000}
            />
            <View style={Style.addMargin}>
              <Fragment>
                <Text style={Style.titleText}>
                  Your Balance Score:{' '}
                  {this.props.balanceScores.length === 1 ? this.props.balanceScores[0].score : 0}{' '}
                </Text>

                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedButtonStyle={Style.darkHighlight}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={Style.height30}
                />
                {this.props.isFetching ? (
                  <ActivityIndicator size="small" style={Style.activityIndicator} />
                ) : (
                  <Fragment>
                    {/* DAY VIEW */}
                    {selectedIndex === 0 ? (
                      <ScrollView>
                        <View style={Style.scrollStyle}>
                          {this.props.moodData.length !== 0 ? (
                            <Fragment>
                              <Text style={Style.titleText}>You Felt </Text>

                              <View style={Style.graph}>
                                <ScrollView horizontal={true}>
                                  <MoodChart
                                    data={{
                                      labels: this.props.moodHours,
                                      icons: this.props.moodIcons,
                                      entries: this.props.moodEntries,
                                      datasets: [
                                        {
                                          data: this.props.moodData,
                                        },
                                      ],
                                    }}
                                    fromZero={true}
                                    width={100 * this.props.moodData.length} // from react-native
                                    height={170}
                                    // yAxisLabel={'$'}
                                    withHorizontalLabels={false}
                                    // fromZero= {true}
                                    segments={1}
                                    yAxisInterval={2}
                                    withInnerLines={false}
                                    withOuterLines={false}
                                    chartConfig={{
                                      backgroundColor: '#000',
                                      backgroundGradientFrom: '#F0F2F3',
                                      backgroundGradientTo: '#F0F2F3',
                                      decimalPlaces: 0, // optional, defaults to 2dp
                                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                      style: {
                                        borderRadius: 16,
                                      },
                                    }}
                                    bezier
                                    style={Style.moodChart}
                                    onDataPointClick={({ value, time, entry, getColor }) =>
                                      showMessage({
                                        message: `${value}  ${time.replace(/ /g, '')} \n ${entry}`,
                                        // description: "HELLO" ,
                                        backgroundColor: '#F0F2F3',
                                      })
                                    }
                                  />
                                  {/* <FlashMessage style={Style.flashMessage} duration={1000} />  */}
                                </ScrollView>
                              </View>
                              <View style={Style.calendar}></View>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          {this.props.sleeps[0] ? (
                            <Fragment>
                              <Text style={Style.sleptText}>You Slept </Text>

                              <View style={Style.graph}>
                                <Text style={Style.sleepNumber}>
                                  {' '}
                                  {this.props.sleeps[0].hours} Hours{' '}
                                </Text>
                                <Image
                                  style={Style.sleepImage}
                                  source={require('../../Assets/Images/sleep.png')}
                                />
                              </View>
                              <View style={Style.calendar}></View>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          {this.props.activityData.length !== 0 ? (
                            <Fragment>
                              <Text style={Style.titleText}>Your Activities </Text>

                              <View style={Style.activityDayContainer}>
                                <ScrollView horizontal={true}>
                                  {this.props.activityIcons.map(function(dActivity, index) {
                                    return (
                                      <View style={Style.activityColumn} key={index}>
                                        <Image
                                          style={Style.dayActivity}
                                          source={Activity.image[dActivity.toLowerCase()]}
                                        />
                                        <Text style={Style.activityText}>
                                          {this.props.activityData[index]}
                                          {' mins'}
                                        </Text>
                                        <Text style={Style.activityText}>{dActivity} </Text>
                                      </View>
                                    )
                                  }, this)}
                                </ScrollView>
                              </View>
                              <View style={Style.calendar}></View>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          {this.props.mindfulnesses.length !== 0 ? (
                            <Fragment>
                              <Text style={Style.titleText}>Your Mindful Bonuses</Text>

                              <View style={Style.activityDayContainer}>
                                <ScrollView horizontal={true}>
                                  {Array.from(this.props.mindfulnesses).map((mindful, index) => {
                                    var imageString = mindful.type.replace(/\s/g, '')
                                    if (imageString === 'Cook/Bake') {
                                      imageString = 'cook'
                                    }
                                    if (imageString === 'ListenToMusic') {
                                      imageString = 'music'
                                    }
                                    if (imageString === 'Arts&Crafts') {
                                      imageString = 'artsandcrafts'
                                    }
                                    return (
                                      <View style={Style.activityColumn} key={index}>
                                        <Image
                                          style={Style.dayActivity}
                                          source={Mindful.image[imageString.toLowerCase()]}
                                        />

                                        <Text style={Style.activityText}>{mindful.type} </Text>
                                        <Text style={Style.activityText}>{'+5'}</Text>
                                      </View>
                                    )
                                  })}
                                </ScrollView>
                              </View>
                              <View style={Style.calendar}></View>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          {this.props.activityData.length === 0 &&
                          !this.props.sleeps[0] &&
                          this.props.moodData.length === 0 &&
                          this.props.mindfulnesses.length === 0 ? (
                            <Fragment>
                              <Text style={Style.noData}>No Data Available </Text>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          <View style={Style.height200} />
                        </View>
                      </ScrollView>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {/* WEEK VIEW    */}
                    {selectedIndex === 1 ? (
                      <ScrollView>
                        <View style={Style.scrollStyle}>
                          {this.props.moodWeekHours.length !== 0 ? (
                            <Fragment>
                              <Text style={Style.titleText}>You Felt </Text>

                              <View style={Style.graph}>
                                <ScrollView horizontal={true}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'space-between',
                                      flexDirection: 'row',
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Mon</Text>

                                      {this.props.moodWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Mon') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dMood.duration),
                                                    width: this.getEmojiSize(dMood.duration),
                                                  }}
                                                  source={Mood.image[dMood.type.toLowerCase()]}
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Tue</Text>

                                      {this.props.moodWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Tue') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dMood.duration),
                                                    width: this.getEmojiSize(dMood.duration),
                                                  }}
                                                  source={Mood.image[dMood.type.toLowerCase()]}
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Wed</Text>

                                      {this.props.moodWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Wed') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dMood.duration),
                                                    width: this.getEmojiSize(dMood.duration),
                                                  }}
                                                  source={Mood.image[dMood.type.toLowerCase()]}
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Thu</Text>

                                      {this.props.moodWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Thurs') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dMood.duration),
                                                    width: this.getEmojiSize(dMood.duration),
                                                  }}
                                                  source={Mood.image[dMood.type.toLowerCase()]}
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Fri</Text>

                                      {this.props.moodWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Fri') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dMood.duration),
                                                    width: this.getEmojiSize(dMood.duration),
                                                  }}
                                                  source={Mood.image[dMood.type.toLowerCase()]}
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Sat</Text>

                                      {this.props.moodWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Sat') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dMood.duration),
                                                    width: this.getEmojiSize(dMood.duration),
                                                  }}
                                                  source={Mood.image[dMood.type.toLowerCase()]}
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Sun</Text>

                                      {this.props.moodWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Sun') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dMood.duration),
                                                    width: this.getEmojiSize(dMood.duration),
                                                  }}
                                                  source={Mood.image[dMood.type.toLowerCase()]}
                                                />
                                              </TouchableOpacity>
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                  </View>
                                </ScrollView>
                              </View>
                              <View style={Style.calendar}></View>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          {this.props.sleepData.length !== 0 ? (
                            <Fragment>
                              <Text style={Style.titleText}>You Slept </Text>

                              <View style={Style.graph}>
                                <LineChart
                                  data={{
                                    labels: this.props.sleepDays,
                                    datasets: [
                                      {
                                        data: this.props.sleepData,
                                      },
                                    ],
                                  }}
                                  width={Dimensions.get('window').width - 10} // from react-native
                                  height={80}
                                  // yAxisLabel={'$'}
                                  chartConfig={{
                                    backgroundColor: '#000',
                                    backgroundGradientFrom: '#F0F2F3',
                                    fillShadowGradientOpacity: '1',
                                    fillShadowGradient: '#7a9ac0',
                                    backgroundGradientTo: '#F0F2F3',
                                    // fillShadowGradientOpacity: '.3',
                                    // fillShadowGradient: '#167eb9',
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    color: (opacity = 1) => `rgba(6, 57, 112, ${opacity})`,
                                    style: {
                                      borderRadius: 16,
                                    },
                                  }}
                                  bezier
                                  fromZero={true}
                                  withShadow={true}
                                  withInnerLines={false}
                                  withHorizontalLabels={false}
                                  withOuterLines={false}
                                  style={Style.moodChart}
                                  renderDotContent={({ x, y, index }) => {
                                    return (
                                      <View
                                        key={index}
                                        style={{
                                          position: 'absolute',
                                          top: y - 20,
                                          left: x - 12,
                                        }}
                                      >
                                        <Text style={{ fontSize: 9 }}>
                                          {this.props.sleepData[index]} {'hours'}
                                        </Text>
                                      </View>
                                    )
                                  }}
                                  onDataPointClick={({ value, getColor }) =>
                                    showMessage({
                                      message: `${value}`,
                                      // description: "" ,
                                      backgroundColor: '#F0F2F3',
                                    })
                                  }

                                  // verticalLabelRotation={30}
                                />
                              </View>
                              <View style={Style.calendar}></View>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          {this.props.activityWeekHours.length !== 0 ? (
                            <Fragment>
                              <Text style={Style.titleText}>Your Activities </Text>

                              <View style={Style.graph}>
                                <ScrollView horizontal={true}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'space-between',
                                      flexDirection: 'row',
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Mon</Text>

                                      {this.props.activityWeekData.map(function(dActivity, index) {
                                        if (this.getDayOfWeek(dActivity.day) === 'Mon') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dActivity.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dActivity.duration),
                                                    width: this.getEmojiSize(dActivity.duration),
                                                  }}
                                                  source={
                                                    Activity.image[dActivity.type.toLowerCase()]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Tue</Text>

                                      {this.props.activityWeekData.map(function(dActivity, index) {
                                        if (this.getDayOfWeek(dActivity.day) === 'Tue') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dActivity.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dActivity.duration),
                                                    width: this.getEmojiSize(dActivity.duration),
                                                  }}
                                                  source={
                                                    Activity.image[dActivity.type.toLowerCase()]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Wed</Text>

                                      {this.props.activityWeekData.map(function(dActivity, index) {
                                        if (this.getDayOfWeek(dActivity.day) === 'Wed') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dActivity.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dActivity.duration),
                                                    width: this.getEmojiSize(dActivity.duration),
                                                  }}
                                                  source={
                                                    Activity.image[dActivity.type.toLowerCase()]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Thu</Text>

                                      {this.props.activityWeekData.map(function(dActivity, index) {
                                        if (this.getDayOfWeek(dActivity.day) === 'Thurs') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dActivity.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dActivity.duration),
                                                    width: this.getEmojiSize(dActivity.duration),
                                                  }}
                                                  source={
                                                    Activity.image[dActivity.type.toLowerCase()]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Fri</Text>

                                      {this.props.activityWeekData.map(function(dActivity, index) {
                                        if (this.getDayOfWeek(dActivity.day) === 'Fri') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message:
                                                      dActivity.type +
                                                      '\n Time Spent: ' +
                                                      dActivity.duration +
                                                      ' minutes',
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dActivity.duration),
                                                    width: this.getEmojiSize(dActivity.duration),
                                                  }}
                                                  source={
                                                    Activity.image[dActivity.type.toLowerCase()]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Sat</Text>

                                      {this.props.activityWeekData.map(function(dActivity, index) {
                                        if (this.getDayOfWeek(dActivity.day) === 'Sat') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dActivity.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dActivity.duration),
                                                    width: this.getEmojiSize(dActivity.duration),
                                                  }}
                                                  source={
                                                    Activity.image[dActivity.type.toLowerCase()]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Sun</Text>

                                      {this.props.activityWeekData.map(function(dActivity, index) {
                                        if (this.getDayOfWeek(dActivity.day) === 'Sun') {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dActivity.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dActivity.duration),
                                                    width: this.getEmojiSize(dActivity.duration),
                                                  }}
                                                  source={
                                                    Activity.image[dActivity.type.toLowerCase()]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                  </View>
                                </ScrollView>
                              </View>
                              <View style={Style.calendar}></View>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          {this.props.mindfulnessWeekHours.length !== 0 ? (
                            <Fragment>
                              <Text style={Style.titleText}>Your Mindful Bonuses</Text>

                              <View style={Style.graph}>
                                <ScrollView horizontal={true}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'space-between',
                                      flexDirection: 'row',
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Mon</Text>

                                      {this.props.mindfulnessWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Mon') {
                                          if (dMood.type === 'Cook/Bake') {
                                            dMood.type = 'cook'
                                          }
                                          if (dMood.type === 'Arts & Crafts') {
                                            dMood.type = 'artsandcrafts'
                                          }
                                          if (dMood.type === 'Listen To Music') {
                                            dMood.type = 'music'
                                          }
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: 30,
                                                    width: 30,
                                                  }}
                                                  source={
                                                    Mindful.image[
                                                      dMood.type
                                                        .split(' ')
                                                        .join('')
                                                        .toLowerCase()
                                                    ]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Tue</Text>

                                      {this.props.mindfulnessWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Tue') {
                                          if (dMood.type === 'Cook/Bake') {
                                            dMood.type = 'cook'
                                          }
                                          if (dMood.type === 'Arts & Crafts') {
                                            dMood.type = 'artsandcrafts'
                                          }
                                          if (dMood.type === 'Listen To Music') {
                                            dMood.type = 'music'
                                          }
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: 30,
                                                    width: 30,
                                                  }}
                                                  source={
                                                    Mindful.image[
                                                      dMood.type
                                                        .split(' ')
                                                        .join('')
                                                        .toLowerCase()
                                                    ]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Wed</Text>

                                      {this.props.mindfulnessWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Wed') {
                                          if (dMood.type === 'Cook/Bake') {
                                            dMood.type = 'cook'
                                          }
                                          if (dMood.type === 'Arts & Crafts') {
                                            dMood.type = 'artsandcrafts'
                                          }
                                          if (dMood.type === 'Listen To Music') {
                                            dMood.type = 'music'
                                          }
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: 30,
                                                    width: 30,
                                                  }}
                                                  source={
                                                    Mindful.image[
                                                      dMood.type
                                                        .split(' ')
                                                        .join('')
                                                        .toLowerCase()
                                                    ]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Thu</Text>

                                      {this.props.mindfulnessWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Thurs') {
                                          if (dMood.type === 'Cook/Bake') {
                                            dMood.type = 'cook'
                                          }
                                          if (dMood.type === 'Arts & Crafts') {
                                            dMood.type = 'artsandcrafts'
                                          }
                                          if (dMood.type === 'Listen To Music') {
                                            dMood.type = 'music'
                                          }
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: 30,
                                                    width: 30,
                                                  }}
                                                  source={
                                                    Mindful.image[
                                                      dMood.type
                                                        .split(' ')
                                                        .join('')
                                                        .toLowerCase()
                                                    ]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Fri</Text>

                                      {this.props.mindfulnessWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Fri') {
                                          if (dMood.type === 'Cook/Bake') {
                                            dMood.type = 'cook'
                                          }
                                          if (dMood.type === 'Arts & Crafts') {
                                            dMood.type = 'artsandcrafts'
                                          }
                                          if (dMood.type === 'Listen To Music') {
                                            dMood.type = 'music'
                                          }
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: 30,
                                                    width: 30,
                                                  }}
                                                  source={
                                                    Mindful.image[
                                                      dMood.type
                                                        .split(' ')
                                                        .join('')
                                                        .toLowerCase()
                                                    ]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Sat</Text>

                                      {this.props.mindfulnessWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Sat') {
                                          if (dMood.type === 'Cook/Bake') {
                                            dMood.type = 'cook'
                                          }
                                          if (dMood.type === 'Arts & Crafts') {
                                            dMood.type = 'artsandcrafts'
                                          }
                                          if (dMood.type === 'Listen To Music') {
                                            dMood.type = 'music'
                                          }
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: this.getEmojiSize(dMood.duration),
                                                    width: this.getEmojiSize(dMood.duration),
                                                  }}
                                                  source={
                                                    Mindful.image[
                                                      dMood.type
                                                        .split(' ')
                                                        .join('')
                                                        .toLowerCase()
                                                    ]
                                                  }
                                                />
                                              </TouchableOpacity>
                                              {/* <Text style={{ fontSize: 8 }}>{dActivity.type}</Text> */}
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'column-reverse',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Text>Sun</Text>

                                      {this.props.mindfulnessWeekData.map(function(dMood, index) {
                                        if (this.getDayOfWeek(dMood.day) === 'Sun') {
                                          if (dMood.type === 'Cook/Bake') {
                                            dMood.type = 'cook'
                                          }
                                          if (dMood.type === 'Arts & Crafts') {
                                            dMood.type = 'artsandcrafts'
                                          }
                                          if (dMood.type === 'Listen To Music') {
                                            dMood.type = 'music'
                                          }
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                marginBottom: 3,
                                                alignItems: 'center',
                                              }}
                                            >
                                              <TouchableOpacity
                                                onPress={() =>
                                                  showMessage({
                                                    message: dMood.type,
                                                    backgroundColor: '#F0F2F3',
                                                  })
                                                }
                                              >
                                                <Image
                                                  style={{
                                                    marginTop: 3,
                                                    height: 30,
                                                    width: 30,
                                                  }}
                                                  source={
                                                    Mindful.image[
                                                      dMood.type
                                                        .split(' ')
                                                        .join('')
                                                        .toLowerCase()
                                                    ]
                                                  }
                                                />
                                              </TouchableOpacity>
                                            </View>
                                          )
                                        } else
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                width: 60,
                                                alignItems: 'center',
                                              }}
                                            ></View>
                                          )
                                      }, this)}
                                    </View>
                                  </View>
                                </ScrollView>
                              </View>
                              <View style={Style.calendar}></View>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          {this.props.activityData.length === 0 &&
                          this.props.sleepData.length === 0 &&
                          this.props.mindfulnessData.length === 0 &&
                          this.props.moodWeekData.length === 0 ? (
                            <Fragment>
                              <Text style={Style.noData}>No Data Available </Text>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}

                          <View style={Style.height200} />
                        </View>
                      </ScrollView>
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {/* MONTH VIEW */}
                    {selectedIndex === 2 ? (
                      <ScrollView>
                        <View style={Style.scrollStyle}>
                          {!this.props.isMonthFetching ? (
                            <Fragment>
                              {this.props.moodMonthStats.length > 0 ? (
                                <Fragment>
                                  <Text style={Style.monthTitleText}>Top Moods Last 30 Days </Text>

                                  <View style={Style.topPad}>
                                    {this.props.moodMonthStats.map(function(mMood, index) {
                                      if (index < 3) {
                                        return (
                                          <View style={Style.modalImage} key={index}>
                                            <Text style={Style.monthlyText}>{mMood.type} </Text>
                                            <Image
                                              style={Style.bigActivity}
                                              source={Mood.image[mMood.type.toLowerCase()]}
                                            />
                                          </View>
                                        )
                                      }
                                    })}
                                  </View>
                                </Fragment>
                              ) : (
                                <Fragment></Fragment>
                              )}

                              {this.props.sleepMonthStats.length !== 0 &&
                              this.props.sleepMonthStats ? (
                                <Fragment>
                                  <Text style={Style.monthTitleText}>
                                    Average Sleep Last 30 Days{' '}
                                  </Text>

                                  <View style={Style.sleepPad}>
                                    <Text style={Style.monthlyText}>
                                      {' '}
                                      {this.props.sleepMonthStats} hours per night
                                    </Text>
                                    <Image
                                      style={{ width: 36, height: 36, marginLeft: 15 }}
                                      source={require('../../Assets/Images/sleep.png')}
                                    />
                                  </View>
                                </Fragment>
                              ) : (
                                <Fragment></Fragment>
                              )}

                              {this.props.activityMonthStats.length > 0 ? (
                                <Fragment>
                                  <Text style={Style.monthTitleText}>
                                    Top Activities Last 30 Days{' '}
                                  </Text>

                                  <View style={Style.topPad}>
                                    {this.props.activityMonthStats.map(function(mActivity, index) {
                                      if (index < 3) {
                                        return (
                                          <View style={Style.modalImage} key={index}>
                                            <Text style={Style.monthlyText} key={index}>
                                              {mActivity.type}{' '}
                                            </Text>
                                            <Image
                                              style={Style.bigActivity}
                                              source={Activity.image[mActivity.type.toLowerCase()]}
                                            />
                                          </View>
                                        )
                                      }
                                    })}
                                  </View>
                                </Fragment>
                              ) : (
                                <Fragment></Fragment>
                              )}

                              {this.props.moodMonthStats.length === 0 &&
                              !this.props.sleepMonthStats &&
                              this.props.activityMonthStats.length === 0 ? (
                                <Fragment>
                                  <Text style={Style.noData}>No Data Available </Text>
                                </Fragment>
                              ) : (
                                <Fragment></Fragment>
                              )}
                            </Fragment>
                          ) : (
                            <Fragment>
                              <Text style={Style.noData}>
                                Monthly Stats are being calculated. This may take up to 60 seconds
                                to load.{' '}
                              </Text>

                              <ActivityIndicator
                                style={Style.marginTop100}
                                size="small"
                                color="#9086A6"
                              />
                            </Fragment>
                          )}
                          <View style={Style.height200} />
                        </View>
                      </ScrollView>
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </Fragment>
                )}
              </Fragment>
            </View>
          </View>
        )}
      </View>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }

  _fetchAll(moodDate) {
    this.props.fetchAll(moodDate)
  }

  _fetchMonth(moodDate) {
    // TODO add same month logic here
    this.props.fetchMonth(moodDate)
  }

  getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay()
    return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'][dayOfWeek]
  }

  formatAMPM(date) {
    var day = new Date(date)
    var hours = day.getHours()
    var minutes = day.getMinutes()
    var ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours || 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    var strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }
}

CalendarScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  isMonthFetching: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  balanceScores: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  mindfulnessData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodHours: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodIcons: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodEntries: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  sleepData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  activityData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  mindfulnesses: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  activityHours: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  activityIcons: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodWeekHours: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  mindfulnessWeekHours: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodWeekData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  mindfulnessWeekData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodWeekDays: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodWeekIcons: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  sleepDays: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  sleeps: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  activityWeekHours: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  activityWeekData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  activityWeekDays: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  activityWeekIcons: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  moodMonthStats: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  sleepMonthStats: PropTypes.number,
  activityMonthStats: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  fetchAll: PropTypes.func,
  fetchMonth: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  isFetching: state.example.isFetching,
  isMonthFetching: state.example.isMonthFetching,
  userErrorMessage: state.example.userErrorMessage,
  moods: state.example.moods,
  sleeps: state.example.sleeps,
  balanceScores: state.example.balanceScores,
  sleepWeek: state.example.sleepWeek,
  moodWeekData: state.example.moodWeekData,
  mindfulnessWeekData: state.example.mindfulnessWeekData,
  moodWeekHours: state.example.moodWeekHours,
  mindfulnessWeekHours: state.example.mindfulnessWeekHours,
  moodWeekIcons: state.example.moodWeekIcons,
  moodWeekDays: state.example.moodWeekDays,
  activityWeekData: state.example.activityWeekData,
  activityWeekHours: state.example.activityWeekHours,
  activityWeekIcons: state.example.activityWeekIcons,
  activityWeekDays: state.example.activityWeekDays,
  activities: state.example.activities,
  moodData: state.example.moodData,
  mindfulnessData: state.example.mindfulnessData,
  moodHours: state.example.moodHours,
  moodIcons: state.example.moodIcons,
  moodEntries: state.example.moodEntries,
  sleepData: state.example.sleepData,
  sleepDays: state.example.sleepDays,
  activityData: state.example.activityData,
  mindfulnesses: state.example.mindfulnesses,
  activityHours: state.example.activityHours,
  activityIcons: state.example.activityIcons,
  moodMonthStats: state.example.moodMonthStats,
  activityMonthStats: state.example.activityMonthStats,
  sleepMonthStats: state.example.sleepMonthStats,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
  fetchAll: (moodDate) => dispatch(ExampleActions.fetchAll(moodDate)),
  fetchMonth: (moodDate) => dispatch(ExampleActions.fetchMonth(moodDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
