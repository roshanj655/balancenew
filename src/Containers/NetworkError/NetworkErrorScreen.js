import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import { ActivityIndicator } from 'react-native'
import Style from '../Login/LoginScreenStyle'
import { Colors } from '../../Theme'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
//import { SafeAreaView } from 'react-navigation'
import { userService } from '../../Services/UserService'
import NavigationService from '../../Services/NavigationService'


const theme = {
  infoText: {
    textAlign: 'center',
    alignContent: 'center',
    color: Colors.$grey,
  }
}

class NetworkErrorScreen extends React.Component {
  constructor(props) {
    super(props);

    userService.socket.on("reconnect", function(attempt) {
      NavigationService.navigate('SubscriptionScreen');
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={Style.container}>
          <ActivityIndicator size="large" style={Style.lightHighlight} />
        </View>
      </ThemeProvider>
    )
  }
}

NetworkErrorScreen.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(NetworkErrorScreen)
