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
} from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from '../../Stores/Example/Actions'
import Style from './AnalyticsStyle'
// import CalendarStrip from 'react-native-calendar-strip'
import DateTimePicker from '@react-native-community/datetimepicker'
import Mindfulness from './mindfulness-imgs/index'
// import Video from 'react-native-video'
import { Player } from 'video-react';
import "/node_modules/video-react/dist/video-react.css";
import Util from './Utils'

function RenderType(props) {

  const mindArr = [
    { "img": "cook.png", "name": "Cook/Bake", "param3": "cook", "number": 5 },
    { "img": "playwithanimals.png", "name": "Pet Time", "param3": "pettime", "number": 5 },
    { "img": "listentomusic.png", "name": "Journal", "Listen To Music": "music", "number": 5 },
    { "img": "journal.png", "name": "Journal", "param3": "journal", "number": 5 },
    { "img": "color.png", "name": "Color", "param3": "color", "number": 5 },
    { "img": "park.png", "name": "Go to Park", "param3": "gotopark", "number": 5 },
    { "img": "garden.png", "name": "Garden", "param3": "garden", "number": 5 },
    { "img": "artsandcrafts.png", "name": "Arts & Crafts", "param3": "artsandcrafts", "number": 5 },
    { "img": "listeningwalk.png", "name": "Listening Walk", "param3": "listeningwalk", "number": 5 },
    { "img": "playagame.png", "name": "Play a Game", "param3": "playagame", "number": 5 },
    { "img": "stretch.png", "name": "Stretch", "param3": "stretch", "number": 5 },
    { "img": "family.png", "name": "Family Time", "param3": "familytime", "number": 5 },
    { "img": "stargaze.png", "name": "Stargaze", "param3": "stargaze", "number": 5 },

  ];
  const url="http://zavius.in/balance/assets/images/";
  const activitySize = 70
  const meditationSize = 90

  if (props.onImprove) {
    return (
      <View style={Style.mainContain}>
        <div>
          <div className="row">
            {mindArr.map((prop, key) => {
              return (
                <div className="col-md-2 mood-icon"
                >
                  <TouchableOpacity
                    onPress={() => {
                      props.onModal(true, prop.name, prop.param3, prop.number)
                    }}
                  >
                    <img
                      src={url+"Mindfulness/" + prop.img}
                    />
                  </TouchableOpacity>
                  <span>{prop.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </View>
    )
  }
  if (props.onRelax) {
    return (
      <View style={Style.mainContain}>

        <View style={Style.improveColumn}>
          {/* <Text h4 h4Style={Style.improveText}>
            Meditations
          </Text> */}
          {/* 
          <Text h4 h4Style={Style.descText}>
            Choose a video below.
          </Text> */}

          <View style={Style.improveColumn}>
            {/* <Text h4 h4Style={Style.improveText}>
            Achieve Mindfulness{' '}
          </Text> */}
            <ul className="side-nav meditation">
              <li className="active">
                <TouchableOpacity
                  onPress={() => {
                    props.clickReduceAnxiety()
                    props.onButtonPress("", 'waterfall')
                  }}
                >
                  <div className="float-left iconbox">
                    <img
                      src={url+"Meditation/reduceAnxiety.png"}
                    />
                  </div>
                  <div className="float-left navtext">
                    <p>Reduce Anxiety</p>
                    <p>This is for test</p>
                  </div>
                  <div className="clear"></div>
                </TouchableOpacity>
              </li>
              <li>
                <TouchableOpacity
                  onPress={() => {
                    props.clickEnhanceCalm()
                    props.onButtonPress("", 'fcalm')
                  }}
                >
                  <div className="float-left iconbox">
                    <img
                      src={url+"Meditation/enhanceCalm.png"}
                    />
                  </div>
                  <div className="float-left navtext">
                    <p>Enhance Calm</p>
                    <p>This is for test</p>
                  </div>
                  <div className="clear"></div>
                </TouchableOpacity>
              </li>
              <li>

                <TouchableOpacity
                  onPress={() => {
                    props.clickRelaxSub()
                    props.onButtonPress("", 'Stargaze')
                  }}
                >
                  <div className="float-left iconbox">
                    <img
                      src={url+"Meditation/relax.png"}
                    />
                  </div>
                  <div className="float-left navtext">
                    <p>Relax</p>
                    <p>This is for test</p>
                  </div>
                  <div className="clear"></div>
                </TouchableOpacity>
              </li>
              <li>
                <TouchableOpacity
                  onPress={() => {
                    props.clickBuildFocus()
                    props.onButtonPress("", 'Unhooking from Thoughts')
                  }}
                >
                  <div className="float-left iconbox">
                    <img
                      src={url+"Meditation/buildFocus.png"}
                    />
                  </div>
                  <div className="float-left navtext">
                    <p>Build Focus</p>
                    <p>This is for test</p>
                  </div>
                  <div className="clear"></div>
                </TouchableOpacity>
              </li>
              <li>
                <TouchableOpacity
                  onPress={() => {
                    props.clickImproveSleep()
                    props.onButtonPress("", 'Rainy Day')
                  }}
                >
                  <div className="float-left iconbox">
                    <img
                      src={url+"Meditation/decreaseStress.png"}
                    />
                  </div>
                  <div className="float-left navtext">
                    <p>Improve Sleep</p>
                    <p>This is for test</p>
                  </div>
                  <div className="clear"></div>
                </TouchableOpacity>
              </li>
              <li>
                <TouchableOpacity
                  onPress={() => {
                    props.clickSoothingSounds()
                    props.onButtonPress("", 'Rainforest')
                  }}
                >
                  <div className="float-left iconbox">
                    <img
                      src={url+"Meditation/soothingSounds.png"}
                    />
                  </div>
                  <div className="float-left navtext">
                    <p>Soothing Sounds</p>
                    <p>This is for test</p>
                  </div>
                  <div className="clear"></div>
                </TouchableOpacity>
              </li>
              <li>
                <TouchableOpacity
                  onPress={() => {
                    props.clickDecreaseStress()
                    props.onButtonPress("", 'Nature')
                  }}
                >
                  <div className="float-left iconbox">
                    <img
                      src={url+"Meditation/decreaseStress.png"}
                    />
                  </div>
                  <div className="float-left navtext">
                    <p>Decrease Stress</p>
                    <p>This is for test</p>
                  </div>
                  <div className="clear"></div>
                </TouchableOpacity>
              </li>
            </ul>
            {/* <View style={Style.emojiRow}>
              <View style={Style.centerWithin}>
                <Text style={Style.centerText}>Reduce Anxiety</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.clickReduceAnxiety()
                    // props.onButtonPress(this.videoPlayer2, 'Beach Meditation')
                  }}
                >
                  <Image
                    style={{ width: meditationSize, height: meditationSize }}
                    source={require('../../Assets/Images/Meditation/reduceAnxiety.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={Style.centerWithin}>
                <Text style={Style.centerText}>Enhance Calm</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.clickEnhanceCalm()
                  }}
                >
                  <Image
                    style={{ width: meditationSize, height: meditationSize }}
                    source={require('../../Assets/Images/Meditation/enhanceCalm.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={Style.emojiRow}>
              <View style={Style.centerWithin}>
                <Text style={Style.centerText}>Relax</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.clickRelaxSub()
                  }}
                >
                  <Image
                    style={{ width: meditationSize, height: meditationSize }}
                    source={require('../../Assets/Images/Meditation/relax.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={Style.centerWithin}>
                <Text style={Style.centerText}>Build Focus</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.clickBuildFocus()
                  }}
                >
                  <Image
                    style={{ width: meditationSize, height: meditationSize }}
                    source={require('../../Assets/Images/Meditation/buildFocus.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={Style.emojiRow}>
              <View style={Style.centerWithin}>
                <Text style={Style.centerText}>Decrease Stress</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.clickDecreaseStress()
                  }}
                >
                  <Image
                    style={{ width: meditationSize, height: meditationSize }}
                    source={require('../../Assets/Images/Meditation/decreaseStress.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={Style.centerWithin}>
                <Text style={Style.centerText}>Improve Sleep</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.clickImproveSleep()
                  }}
                >
                  <Image
                    style={{ width: meditationSize, height: meditationSize }}
                    source={require('../../Assets/Images/Meditation/improveSleep.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={Style.emojiRow}>
              <View style={Style.centerWithin}>
                <Text style={Style.centerText}>Soothing Sounds</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.clickSoothingSounds()
                  }}
                >
                  <Image
                    style={{ width: meditationSize, height: meditationSize }}
                    source={require('../../Assets/Images/Meditation/soothingSounds.png')}
                  />
                </TouchableOpacity>
              </View>
            </View> */}

            {/* <View style={Style.emojiRow}>
          <View style={Style.centerWithin}>
              <Text style={Style.centerText}>Do a Puzzle</Text>
              <TouchableOpacity
                // onPress={() => {
                //   props.onModal(true, 'Do a Puzzle', 'doapuzzle', '5')
                // }}
              >
                <Image
                  style={{ width: meditationSize, height: meditationSize }}
                  source={require('../../Assets/Images/Meditation/improveSleep.png')}
                />
              </TouchableOpacity>
            </View>
            </View> */}

            {/* <Video
              ref={(p) => {
                this.videoPlayer = p
              }}
              source={require('./videos/finding-calm.mp4')}
              paused={true}
              onEnd={() => {
                props.onVideoEnd(this.videoPlayer, 'Finding Calm')
              }}
              style={Style.videoPlayer}
              controls={false}
            /> */}
          </View>

          {/* <View onLayout={this.onLayout} style={Style.videoContainer}>
            <Video
              ref={(p) => {
                this.videoPlayer = p
              }}
              source={require('./videos/finding-calm.mp4')}
              paused={true}
              onEnd={() => {
                props.onVideoEnd(this.videoPlayer, 'Finding Calm')
              }}
              style={Style.videoPlayer}
              controls={false}
            />
            <View style={Style.findingCalm}>
              <TouchableOpacity
                onPress={() => {
                  props.onButtonPress(this.videoPlayer, 'Finding Calm')
                }}
              >
                <Image
                  source={require('../../Assets/Images/calm.png')}
                  style={Style.bannerButton}
                ></Image>
              </TouchableOpacity>
            </View>
          </View> */}

          {/* <View onLayout={this.onLayout} style={Style.videoContainer}>
            <Video
              ref={(p) => {
                this.videoPlayer2 = p
              }}
              source={require('./videos/beach-meditation.mp4')}
              paused={true}
              onEnd={() => {
                props.onVideoEnd(this.videoPlayer, 'Beach Meditation')
              }}
              style={Style.videoPlayer}
              controls={false}
            />
            <View style={Style.findingCalm}>
              <TouchableOpacity
                onPress={() => {
                  props.onButtonPress(this.videoPlayer2, 'Beach Meditation')
                }}
              >
                <Image
                  source={require('../../Assets/Images/beach.png')}
                  style={Style.bannerButton}
                ></Image>
              </TouchableOpacity>
            </View>
          </View> */}

          {/* <View style={Style.height300}></View> */}
        </View>
      </View>
    )
  }
  if (props.onReduceAnxiety) {
    return (

      <View style={{ alignItems: 'center' }}>
        <div className='row w100 main-head p0'>
          <div className='col-md-9 p0'>
            <h2>Reduce Anxiety</h2>
          </div>
          <div className='col-md-3 p0'>
            <button class="btn btn-danger float-right" onClick={() => {
              props.clickBackOne()
            }}><i class="fa fa-arrow-left"></i> Back</button>
          </div>

        </div>
        {/* <Button
            </div>
        </div>
        
          buttonStyle={Style.backButton}
          title="Back"
          onPress={() => {
            props.clickBackOne()
          }}
        ></Button> */}
        {props.videoSource == "waterfall" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Anxiety+Meditation.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "lettinggo" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Letting+Go.+Mindfulness+to+reduce+Stress+and+Anxiety.mp4" />
          </Player>
          : ("")}


        <div className='row w100 p0 pt20'>
          <div className='col-md-12 p0'> <h3>Choose a video below to play</h3>
            <br />
          </div>
          <div className='col-md-12 p0'>
            <ul class="list-group cursor-pointer video-list">
              <li class="list-group-item" onClick={() => { props.videoSrc("waterfall") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Waterfall</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("lettinggo") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Letting Go</li>
            </ul>

          </div>
        </div>



      </View>
    )
  }
  if (props.onEnhanceCalm) {
    return (
      <View style={{ alignItems: 'center' }}>
        <div className='row w100 main-head p0'>
          <div className='col-md-9 p0'>
            <h2>Enhance Calm</h2>
          </div>
          <div className='col-md-3 p0'>
            <button class="btn btn-danger float-right" onClick={() => {
              props.clickBackOne()
            }}><i class="fa fa-arrow-left"></i> Back</button>
          </div>

        </div>
        {props.videoSource == "fcalm" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/finding-calm.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "sunset" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Erincarrjordan.Script+3.2.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "bmed" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/beach-meditation.mp4" />
          </Player>
          : ("")}

        <div className='row w100 p0 pt20'>
          <div className='col-md-12 p0'> <h3>Choose a video below to play</h3>
            <br />
          </div>
          <div className='col-md-12 p0'>
            <ul class="list-group cursor-pointer video-list">
              <li class="list-group-item" onClick={() => { props.videoSrc("fcalm") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Finding Calm</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("sunset") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Sunset</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("bmed") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Beach Meditation</li>
            </ul>

          </div>
        </div>

      </View>
    )
  }
  if (props.onRelaxSub) {
    return (
      <View style={{ alignItems: 'center' }}>
        <div className='row w100 main-head p0'>
          <div className='col-md-9 p0'>
            <h2>Relax</h2>
          </div>
          <div className='col-md-3 p0'>
            <button class="btn btn-danger float-right" onClick={() => {
              props.clickBackOne()
            }}><i class="fa fa-arrow-left"></i> Back</button>
          </div>

        </div>
        {props.videoSource == "Stargaze" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Erincarrjordan.Script+2.2.mp4" />
          </Player>
          : ("")}

        <div className='row w100 p0 pt20'>
          <div className='col-md-12 p0'> <h3>Choose a video below to play</h3>
            <br />
          </div>
          <div className='col-md-12 p0'>
            <ul class="list-group cursor-pointer video-list">
              <li class="list-group-item" onClick={() => { props.videoSrc("Stargaze") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Stargaze</li>
            </ul>

          </div>
        </div>
      </View>
    )
  }
  if (props.onBuildFocus) {
    return (
      <View style={{ alignItems: 'center' }}>
        <div className='row w100 main-head p0'>
          <div className='col-md-9 p0'>
            <h2>Build Focus</h2>
          </div>
          <div className='col-md-3 p0'>
            <button class="btn btn-danger float-right" onClick={() => {
              props.clickBackOne()
            }}><i class="fa fa-arrow-left"></i> Back</button>
          </div>

        </div>
        {props.videoSource == "Unhooking from Thoughts" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Unhooking+from+Thoughts.+Focus.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Mountains" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Focus+Meditation.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Focus & Gratitude" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Focus+and+Gratitude+meditation.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Stargaze" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Erincarrjordan.Script+2.2.mp4" />
          </Player>
          : ("")}

        <div className='row w100 p0 pt20'>
          <div className='col-md-12 p0'> <h3>Choose a video below to play</h3>
            <br />
          </div>
          <div className='col-md-12 p0'>
            <ul class="list-group cursor-pointer video-list">
              <li class="list-group-item" onClick={() => { props.videoSrc("Unhooking from Thoughts") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Unhooking from Thoughts</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Mountains") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Mountains</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Focus & Gratitude") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Focus & Gratitude</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Stargaze") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Stargaze</li>
            </ul>

          </div>
        </div>
        
      </View>
    )
  }
  if (props.onDecreaseStress) {
    return (
      <View style={{ alignItems: 'center' }}>
        <div className='row w100 main-head p0'>
          <div className='col-md-9 p0'>
            <h2>Decrease Stress</h2>
          </div>
          <div className='col-md-3 p0'>
            <button class="btn btn-danger float-right" onClick={() => {
              props.clickBackOne()
            }}><i class="fa fa-arrow-left"></i> Back</button>
          </div>

        </div>
        {props.videoSource == "Nature" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Peaceful+music+for+stress+relief%2C+Calm+music%2C+soothing+relaxation%2C+Dream+music.+Nature+sounds+music+(1).mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Letting Go" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Letting+Go.+Mindfulness+to+reduce+Stress+and+Anxiety.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Beach Meditation" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/beach-meditation.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Waterfall" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Anxiety+Meditation.mp4" />
          </Player>
          : ("")}

        <div className='row w100 p0 pt20'>
          <div className='col-md-12 p0'> <h3>Choose a video below to play</h3>
            <br />
          </div>
          <div className='col-md-12 p0'>
            <ul class="list-group cursor-pointer video-list">
              <li class="list-group-item" onClick={() => { props.videoSrc("Nature") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Nature</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Letting Go") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Letting Go</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Beach Meditation") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Beach Meditation</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Waterfall") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Waterfall</li>
            </ul>

          </div>
        </div>

      </View>
    )
  }
  if (props.onImproveSleep) {
    return (
      <View style={{ alignItems: 'center' }}>
        <div className='row w100 main-head p0'>
          <div className='col-md-9 p0'>
            <h2>Improve Sleep</h2>
          </div>
          <div className='col-md-3 p0'>
            <button class="btn btn-danger float-right" onClick={() => {
              props.clickBackOne()
            }}><i class="fa fa-arrow-left"></i> Back</button>
          </div>

        </div>
        {props.videoSource == "Rainy Day" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Sleep+Meditation.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Stary Night" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Erincarrjordan.Script+1.2.mp4" />
          </Player>
          : ("")}

        <div className='row w100 p0 pt20'>
          <div className='col-md-12 p0'> <h3>Choose a video below to play</h3>
            <br />
          </div>
          <div className='col-md-12 p0'>
            <ul class="list-group cursor-pointer video-list">
              <li class="list-group-item" onClick={() => { props.videoSrc("Rainy Day") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Rainy Day</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Stary Night") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Stary Night</li>
            </ul>

          </div>
        </div>
        
      </View>
    )
  }
  if (props.onSoothingSounds) {
    return (
      <View style={{ alignItems: 'center' }}>
        <div className='row w100 main-head p0'>
          <div className='col-md-9 p0'>
            <h2>Soothing Sounds</h2>
          </div>
          <div className='col-md-3 p0'>
            <button class="btn btn-danger float-right" onClick={() => {
              props.clickBackOne()
            }}><i class="fa fa-arrow-left"></i> Back</button>
          </div>

        </div>
        {props.videoSource == "Rainforest" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Peaceful+music+for+stress+relief%2C+Calm+music%2C+soothing+relaxation%2C+Dream+music.+Nature+sounds+music.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Forest" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Peaceful+music+for+stress+relief%2C+Calm+music%2C+soothing+relaxation%2C+Dream+music.+Nature+sounds+music3.mp4" />
          </Player>
          : ("")}
        {props.videoSource == "Nature" ?
          <Player
            playsInline
            poster={url+"poster.png"}
          >
            <source src="https://meditation-videos-naufel.s3.us-west-2.amazonaws.com/Mountain.mp4" />
          </Player>
          : ("")}

        <div className='row w100 p0 pt20'>
          <div className='col-md-12 p0'> <h3>Choose a video below to play</h3>
            <br />
          </div>
          <div className='col-md-12 p0'>
            <ul class="list-group cursor-pointer video-list">
              <li class="list-group-item" onClick={() => { props.videoSrc("Rainforest") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Rainforest</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Forest") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Forest</li>
              <li class="list-group-item" onClick={() => { props.videoSrc("Nature") }}><i class="fa fa-video-camera" aria-hidden="true"></i> Nature</li>
            </ul>

          </div>
        </div>
        
      </View>
    )
  } else {
    return (
      <View style={Style.topContainer}>
        <View style={Style.topView}>
          <Text style={Style.descStyle}>
            Increase your focus and awareness of thoughts, feelings, and body sensations.
          </Text>
        </View>
        <View style={Style.button30View}>
          <TouchableOpacity
            onPress={() => {
              props.clickImprove()
            }}
          >
            <Image
              source={require('../../Assets/Images/mindful.png')}
              style={Style.bannerButton}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={Style.button50View}>
          <TouchableOpacity
            onPress={() => {
              props.clickRelax()
            }}
          >
            <Image
              source={require('../../Assets/Images/relax.png')}
              style={Style.bannerButton}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class AnalyticsScreen extends React.Component {
  constructor(props) {
    super(props)

    const today = new Date()
    this.state = {}
    this.state = {
      onImprove: this.props.mindfullShow,
      onImproveModal: false,
      onRelax: this.props.meditationShow,
      onReduceAnxiety: false,
      videosource: "",
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
              <div className={"modal fade " + (this.state.onImproveModal ? "show" : "")}
                onRequestClose={() => {
                  // Alert.alert('Modal has been closed.')
                }}
                role="dialog">
                <div className="modal-dialog  modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
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
                                this.confirmLogic(),
                                  this.props.data.showAnaHideAddScreen(false);
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
                    </div>
                  </div>
                </div>
              </div>
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
              {this.props.mindfullShow ?
                <Text h4 h4Style={Style.headerText}>
                  Mindfulness{' '}
                </Text>
                : ("")}
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
              videoSrc={this.videoSrc.bind(this)}
              clickSoothingSounds={this.clickSoothingSounds.bind(this)}
              clickBack={this.clickBack.bind(this)}
              clickBackOne={this.clickBackOne.bind(this)}
              onVideoEnd={this.onVideoEnd.bind(this)}
              onImprove={this.state.onImprove}
              sleep={this.state.sleep}
              videoSource={this.state.videosource}
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
  videoSrc(url) {
    this.setState({ videosource: url });
  }

  changeSelectedDay(day) {
    this.setState({ selectedDay: day._d }, () => {
      this._fetchSleeps(this.state.selectedDay)
      this.setTime()
    })
  }

  setModalVisible(visible, name, emoji, score) {
    this.setState({ modalVisible: visible })
    this.setState({ onImproveModal: visible })
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
    this.setState({ videosource: type })
  }

  onVideoEnd(video, type) {
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

      })
      this.onConfirm()
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
