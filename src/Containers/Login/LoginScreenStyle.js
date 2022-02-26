import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  appleButton: {
    height: 45,
    marginVertical: 15,
    shadowColor: '#555',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    width: '100%',
  },
  legalSection: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    left: 0,
    right: 0,
  },
  link: {
    margin: 10,
  },
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
