import { StyleSheet } from 'react-native-web'
import { Colors } from '../../Theme'
import { ApplicationStyles } from '../../Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F0F2F3",
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    backgroundColor: '#9086A6',
  },
})
