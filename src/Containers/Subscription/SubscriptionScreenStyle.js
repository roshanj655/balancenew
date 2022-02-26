import { StyleSheet } from 'react-native-web'
import Fonts from '../../Theme/Fonts'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  darkHighlight: {
    color: Colors.$darkHighlight,
  },
  error: {
    ...Fonts.style.normal,
    color: Colors.$errorRed,
    marginBottom: 5,
    textAlign: 'center',
  },
  inputBorder: {
    borderColor: Colors.$darkHighlight,
  },
  legalSection: {
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  lightHighlight: {
    color: Colors.$lightHighlight,
  },
  link: {
    margin: 10,
  },
  loading: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  loginButton: {
    borderColor: Colors.$errorRed,
    color: Colors.$errorRed,
    marginTop: 10,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    height: 300,
    marginBottom: 25,
    marginTop: 50,
    width: '100%',
  },
  margin30: {
    margin: 30,
  },
  orText: {
    alignContent: 'center',
    color: Colors.$darkHighlight,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  privacySection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  result: {
    ...Fonts.style.normal,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    alignContent: 'center',
    color: Colors.$grey,
    fontSize: 12,
    marginBottom: 20,
    marginTop: 10,
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
