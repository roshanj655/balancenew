import { StyleSheet } from 'react-native-web'
import Fonts from '../../Theme/Fonts'
import ApplicationStyles from '../../Theme/ApplicationStyles'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  activeText: {
    color: Colors.$white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: Colors.$lightHighlight,
    marginLeft: 125,
    marginRight: 125,
  },
  backgroundVideo: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bannerButton: {
    height: 200,
    width: 200,
  },
  bigActivity: {
    height: 150,
    width: 150,
  },
  bigEmoji: {
    fontSize: 120,
    height: 150,
    textAlign: 'center',
  },
  button30View: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  button50View: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  buttonStyle: {
    backgroundColor: Colors.$darkHighlight,
  },
  calendarStrip: {
    height: 100,
    paddingBottom: 5,
    paddingTop: 5,
  },
  cancelStyle: {
    backgroundColor: Colors.$lightHighlight,
  },
  centerFlex: {
    backgroundColor: Colors.$lightGrey,
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
  centerMargin: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    textAlign: 'center',
  },
  centerText: {
    color: Colors.$background,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerWithin: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  circles: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  circlesActive: {
    alignItems: 'center',
    backgroundColor: Colors.$lightHighlight,
    borderRadius: 50,
    justifyContent: 'center',
    paddingBottom: 42,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 42,
    padding: 30,
    width: 100,
  },
  circlesInactive: {
    alignItems: 'center',
    backgroundColor: Colors.$background,
    borderRadius: 50,
    justifyContent: 'center',
    paddingBottom: 42,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 42,
    padding: 30,
    width: 100,
  },
  confirmButton: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
  },
  container: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'column',
  },
  darkHighlight: {
    backgroundColor: Colors.$darkHighlight,
  },
  datepickerText: {
    shadowColor: Colors.$black,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  descStyle: {
    backgroundColor: Colors.$lightGrey,
    color: Colors.$darkHighlight,
    fontSize: 20,
    marginBottom: 5,
    // marginTop: 15,
    textAlign: 'center',
  },
  descText: {
    backgroundColor: Colors.$lightGrey,
    color: Colors.$darkHighlight,
    fontSize: 12,
    textAlign: 'center',
  },
  durationText: {
    color: Colors.$lightHighlight,
    fontSize: 20,
    textAlign: 'center',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  error: {
    ...Fonts.style.normal,
    color: Colors.$errorRed,
    marginBottom: 5,
    textAlign: 'center',
  },
  findingCalm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headerText: {
    backgroundColor: Colors.$lightGrey,
    color: Colors.$titleText,
    marginBottom: 50,
    marginTop: 30,
    textAlign: 'center',
  },
  height300: {
    height: 300,
  },
  height50: {
    height: 50,
    marginBottom: 15,
  },
  improveColumn: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'space-around',
    padding: 0,
  },
  improveText: {
    backgroundColor: Colors.$lightGrey,
    color: Colors.$darkHighlight,
    fontSize: 20,
    marginTop: 25,
    textAlign: 'center',
  },
  inactiveText: {
    color: Colors.$white,
    fontSize: 12,
  },
  instructions: {
    ...Fonts.style.normal,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  lightHighlight: {
    backgroundColor: Colors.$lightHighlight,
  },
  loading: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
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
  mainContain: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    padding: 0,
  },
  modalText: {
    color: Colors.$darkHighlight,
    textAlign: 'center',
  },
  random: {
    backgroundColor: Colors.$lightHighlight,
    borderColor: Colors.$grey,
    borderRadius: 20,
    borderWidth: 5,
    height: 150,
    marginTop: 30,
    width: 150,
  },
  result: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  selectorBox: {
    backgroundColor: Colors.$lightHighlight,
    borderColor: Colors.$grey,
    borderRadius: 20,
    borderWidth: 5,
    height: 150,
    marginTop: 30,
    width: 150,
  },
  sleepColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 15,
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
    color: Colors.$white,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'flex-start',
  },
  topView: {
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 20,
    textAlign: 'center',
  },
  videoButtons: {
    margin: 20,
  },
  videoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  videoPlayer: {
    height: 0,
    opacity: 0,
  },
})
