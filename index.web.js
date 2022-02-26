//import Bugsnag from '@bugsnag/react-native'

import {AppRegistry} from 'react-native-web';
//import {name as appName} from './app.json';

import App from './src/App';
let appName = "Balance"
if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});