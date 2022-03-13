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
import AnalyticsScreen from '../Analytics/AnalyticsScreen';
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

class Meditation extends React.Component {
  constructor(props) {
    super(props)
   
    
  }

  render() {
    
    return (
        <div className="row meditation">
          
        <div className="col-md-12">
            <div className="main-head">
            <h2>Meditations</h2>
            <p>Choose a video below to get started</p>
        </div>
        <AnalyticsScreen meditationShow="true"/>
        </div>
    </div>
      
    )
  }

} 
export default Meditation
