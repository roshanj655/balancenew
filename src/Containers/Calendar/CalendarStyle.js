import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import ApplicationStyles from '../../Theme/ApplicationStyles'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  activityColumn: {
    alignItems: 'center',
    marginBottom: 30,
    marginRight: 30,
    marginTop: 20,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  activityDayContainer: {
    // marginRight: 50,
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // justifyContent: 'center',
  },
  activityIndicator: {
    color: Colors.$lightHighlight,
    marginTop: 100,
  },
  activityText: {
    alignItems: 'center',
    color: Colors.$black,
    fontSize: 14,
    fontWeight: '200',
    justifyContent: 'center',
  },
  addMargin: {
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  bigActivity: {
    height: 20,
    // marginLeft: 10,
    // textAlign: 'right',
    alignItems: 'center',
    width: 20,
  },
  bottomPadding: {
    paddingTop: 500,
  },
  calendar: {
    borderBottomColor: Colors.$background,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  calendarStrip: {
    height: 100,
    paddingBottom: 5,
    paddingTop: 5,
  },
  circles: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    // justifyContent: 'center',
    // fontFamily: 'San Francisco',
  },
  darkHighlight: {
    backgroundColor: Colors.$darkHighlight,
  },
  dayActivity: {
    height: 40,
    // marginLeft: 10,
    width: 40,
  },
  error: {
    ...Fonts.style.normal,
    color: Colors.$errorRed,
    marginBottom: 5,
    textAlign: 'center',
  },
  flashMessage: {
    bottom: 50,
    position: 'relative',
    width: '100%',
    // top: '10%',
    // left: '10%',
    // fontSize: 50,
  },
  graph: {
    // marginRight: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: Colors.$background,
    color: Colors.$background,
  },
  headerText: {
    backgroundColor: Colors.$lightGrey,
    color: Colors.$titleText,
    marginTop: 20,
    textAlign: 'center',
  },
  height100: {
    height: 100,
  },
  height200: {
    height: 200,
  },
  height30: {
    height: 30,
  },
  instructions: {
    ...Fonts.style.normal,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  lightHighlight: {
    color: Colors.$lightHighlight,
  },
  loading: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  loginButton: {
    borderColor: Colors.$errorRed,
    color: Colors.$errorRed,
    marginTop: 20,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    height: 300,
    marginBottom: 25,
    width: '100%',
  },
  marginTop100: {
    marginTop: 100,
  },
  modalImage: {
    alignItems: 'center',
    minWidth: 100,
    // flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  monthTitleText: {
    color: Colors.$lightHighlight,
    fontSize: 22,
    marginBottom: 3,
    marginTop: 30,
  },
  monthlyText: {
    alignItems: 'center',
    color: Colors.$background,
    fontSize: 17,
    fontWeight: '400',
    justifyContent: 'center',
  },
  moodChart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  noData: {
    color: Colors.$titleText,
    fontSize: 22,
    marginTop: 65,
    textAlign: 'center',
    // marginBottom: 3,
  },
  orText: {
    alignContent: 'center',
    color: Colors.$grey,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  result: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  scrollStyle: {
    flex: 1,
    marginBottom: 300,
    padding: 10,
  },
  sleepImage: {
    height: 40,
    marginRight: 40,
    width: 40,
  },
  sleepNumber: {
    color: Colors.$lightHighlight,
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  sleepPad: {
    alignItems: 'center',
    color: Colors.$lightHighlight,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  sleptText: {
    color: Colors.$titleText,
    fontSize: 22,
    marginBottom: 3,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 15,
  },
  text: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    ...Fonts.style.h2,
    marginBottom: 10,
    textAlign: 'center',
  },
  titleStyle: {
    color: Colors.$lightHighlight,
    fontSize: 18,
    marginTop: 100,
    textAlign: 'center',
    zIndex: 999,
  },
  titleText: {
    color: Colors.$titleText,
    fontSize: 22,
    marginBottom: 3,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 15,
  },
  titleTextCal: {
    color: Colors.titleText,
  },
  topPad: {
    // alignItems: 'center',
    color: Colors.$lightHighlight,
    // justifyContent: 'center',
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
})
