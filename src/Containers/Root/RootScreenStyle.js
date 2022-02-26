import { StyleSheet } from 'react-native-web'
import ApplicationStyles from '../../Theme/ApplicationStyles'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: Colors.$lightGrey,
    // backgroundColor: "#343649",
  },
})
