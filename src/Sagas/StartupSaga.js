import { put } from 'redux-saga/effects'
import ExampleActions from '../Stores/Example/Actions'
import LoginScreen from '../Containers/Login/LoginScreen'
/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  //here yield put(ExampleActions.fetchNothing())

  // Add more operations you need to do at startup here
  // ...

  // When those operations are finished we redirect to the main screen
  // NavigationService.navigateAndReset('LoginScreen')
}
