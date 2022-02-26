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
  bigActivity: {
    height: 150,
    width: 150,
  },
  bigEmoji: {
    fontSize: 120,
    height: 150,
    textAlign: 'center',
  },
  borderLine: {
    backgroundColor: Colors.$lightHighlight,
    borderColor: Colors.$grey,
    borderRadius: 20,
    borderWidth: 5,
    height: 150,
    marginTop: 30,
    width: 150,
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
  centerText: {
    color: Colors.$background,
    fontSize: 7,
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
    marginBottom: 30,
    justifyContent: 'space-around',
  },
  container: {
    ...ApplicationStyles.screen.container,
    flexDirection: 'column',
  },
  datepickerText: {
    // shadowColor: Colors.$black,
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 0,
  },
  durationText: {
    color: Colors.$lightHighlight,
    fontSize: 20,
    textAlign: 'center',
  },
  emojiColumn: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'space-around',
    padding: 0,
  },
  emojiRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  emotionText: {
    backgroundColor: Colors.$lightGrey,
    color: Colors.$darkHighlight,
    fontSize: 20,
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  },
  error: {
    ...Fonts.style.normal,
    color: Colors.$errorRed,
    marginBottom: 5,
    textAlign: 'center',
  },
  headerText: {
    backgroundColor: Colors.$lightGrey,
    color: Colors.$titleText,
    textAlign: 'center',
  },
  height50: {
    height: 50,
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
  journalHeader: {
    backgroundColor: Colors.$lightGrey,
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 100,
  },
  lightBackground: {
    backgroundColor: Colors.$lightHighlight,
  },
  lightGrey: {
    backgroundColor: Colors.$lightGrey,
  },
  lightHighlight: {
    color: Colors.$lightHighlight,
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
  modalHeader: {
    backgroundColor: Colors.$lightGrey,
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
  modalImage: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    textAlign: 'center',
  },
  modalText: {
    color: Colors.$darkHighlight,
    textAlign: 'center',
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
  sleepImage: {
    height: 150,
    width: 150,
  },
  sleepImgHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sleptText: {
    backgroundColor: Colors.$lightGrey,
    color: Colors.$darkHighlight,
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
    textAlign: 'center',
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
  titleText: {
    color: Colors.titleText,
  },
  todayButton: {
    height: 50,
    marginBottom: 10,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 10,
  },
})
