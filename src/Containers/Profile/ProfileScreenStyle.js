import { StyleSheet } from 'react-native-web'
import Fonts from '../../Theme/Fonts'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.$darkHighlight,
  },
  cancelStyle: {
    backgroundColor: Colors.$lightHighlight,
  },
  circles: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  confirmButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    alignItems: 'stretch',
    flex: 1,
    margin: 40,
  },
  error: {
    ...Fonts.style.normal,
    color: Colors.$errorRed,
    marginBottom: 5,
    textAlign: 'center',
  },
  header: {
    backgroundColor: Colors.$background,
    color: Colors.$background,
  },
  header4: {
    color: Colors.$titleText,
    margin: 10,
    textAlign: 'center',
  },
  height50: {
    height: 50,
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
  link: {
    margin: 10,
  },
  bold: {
    fontWeight: "500",
    marginTop: 15
  },
  logoContainer: {
    height: 300,
    marginBottom: 25,
    width: '100%',
  },
  margin50: {
    marginTop: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
  modalHeader: {
    // backgroundColor: Colors.$lightGrey,
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    marginTop: 0,
  },
  modalImage: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    textAlign: 'center',
  },
  modalText: {
    color: Colors.$black,
    fontSize: 12,
    // textAlign: 'center',
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
})
