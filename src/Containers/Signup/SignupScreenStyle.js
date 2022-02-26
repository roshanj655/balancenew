import { StyleSheet } from 'react-native-web'
import Fonts from '../../Theme/Fonts'
import ApplicationStyles from '../../Theme/ApplicationStyles'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.$lightGrey,
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  datepickerColor: {
    // shadowColor: Colors.$black,
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 0,
  },
  error: {
    ...Fonts.style.normal,
    color: Colors.$errorRed,
    marginBottom: 5,
    textAlign: 'center',
  },
  headerText: {
    color: Colors.$lightHighlight,
  },
  inputBorder: {
    borderColor: Colors.$darkHighlight,
  },
  instructions: {
    ...Fonts.style.normal,
    fontStyle: 'italic',
    marginBottom: 5,
    textAlign: 'center',
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
  orText: {
    alignContent: 'center',
    color: Colors.$darkHighlight,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
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
  title: {
    ...Fonts.style.h2,
    marginBottom: 10,
    textAlign: 'center',
  },
})
