import { StyleSheet } from 'react-native-web'
import Fonts from '../../Theme/Fonts'
import ApplicationStyles from '../../Theme/ApplicationStyles'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  activityIndicator: {
    color: Colors.$lightHighlight,
    marginTop: 30,
  },
  additionalContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  birthdayText: {
    color: Colors.$darkHighlight,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.$lightHighlight,
  },
  iconPos:{
    textAlign: 'center',
  },
  circles: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  confirmButton: {
    color: Colors.$lightHighlight,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    textAlign: 'center',
  },
  container: {
    ...ApplicationStyles.screen.container,
    color: Colors.$lightHighlight,
    flex: 1,
    justifyContent: 'center',
    margin: 30,
  },
  darkHighlight: {
    backgroundColor: Colors.$darkHighlight,
  },
  datepickerText: {
    marginTop: 10,
  },
  emptyDate: {
    flex: 1,
    height: 15,
    paddingTop: 30,
  },
  error: {
    ...Fonts.style.normal,
    color: Colors.$errorRed,
    marginBottom: 5,
    textAlign: 'center',
  },
  flashMessage: {
    // height: 1000,
    bottom: 50,
    position: 'relative',
    width: '100%',
    // top: '10%',
    // left: '10%',
    // fontSize: 50,
  },
  header: {
    backgroundColor: Colors.$background,
    color: Colors.$lightHighlight,
  },
  header2: {
    color: Colors.$titleText,
    fontWeight: '700',
    marginTop: 0,
    textAlign: 'center',
  },
  header3: {
    color: Colors.$titleText,
    fontWeight: '500',
    textAlign: 'center',
  },
  height30: {
    height: 30,
    marginTop: 15,
  },
  height50: {
    height: 50,
  },
  imageSize: {
    height: 40,
    // marginLeft: 10,
    marginBottom: 10,
    width: 40,
  },
  instructions: {
    ...Fonts.style.normal,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    marginTop: 17,
    padding: 10,
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
  margin50: {
    marginTop: 50,
  },
  messageTitleStyle: {
    color: Colors.$darkHighlight,
    fontSize: 24,
    marginTop: 5,
    textAlign: 'center',
    zIndex: 999,
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
    color: Colors.$lightHighlight,
    textAlign: 'center',
  },
  orText: {
    alignContent: 'center',
    color: Colors.$grey,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  overallHeader: {
    color: Colors.$titleText,
    fontWeight: '500',
    marginTop: 50,
    textAlign: 'center',
  },
  progressTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  result: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  text: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  textContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  title: {
    ...Fonts.style.h2,
    marginBottom: 10,
    textAlign: 'center',
  },
  titleStyle: {
    color: Colors.$white,
  },
  totalBalance: {
    marginBottom: 30,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
  },
})
