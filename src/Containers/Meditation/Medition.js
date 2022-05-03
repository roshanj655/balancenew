/* eslint-disable react-native/no-inline-styles */
import React, { useState,Fragment } from 'react'
// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AnalyticsScreen from '../Analytics/AnalyticsScreen';
// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;


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
