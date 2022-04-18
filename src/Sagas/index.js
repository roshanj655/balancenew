import { takeLatest, all } from 'redux-saga/effects'
import { ExampleTypes } from '../Stores/Example/Actions'
import { StartupTypes } from '../Stores/Startup/Actions'
import {
  fetchUser,
  fetchNothing,
  fetchMoods,
  fetchSleepScores,
  fetchActivityScores,
  fetchBalanceScores,
  fetchSleeps,
  fetchActivities,
  fetchMindfulnesses,
  createActivity,
  createUser,
  loginUser,
  loginTrialUser,
  createMood,
  createMindfulness,
  createVideo,
  createSleep,
  fetchAll,
  fetchAgenda,
  fetchOverall,
  fetchSleepWeek,
  fetchMain,
  addBirthdate,
  fetchMonth,
  fetchMoodScores,
  updateToken,
} from './ExampleSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    //takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
   // takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    //takeLatest(ExampleTypes.FETCH_NOTHING, fetchNothing),
    // Call `fetchMoods()` when a `FETCH_MOODS` action is triggered
    takeLatest(ExampleTypes.FETCH_MOODS, fetchMoods),
    //takeLatest(ExampleTypes.FETCH_MONTH, fetchMonth),
    // takeLatest(ExampleTypes.FETCH_MOOD_WEEK_GRAPH, fetchMoodWeekGraph),
    takeLatest(ExampleTypes.FETCH_MOOD_SCORES, fetchMoodScores),
    takeLatest(ExampleTypes.FETCH_ACTIVITY_SCORES, fetchActivityScores),
    takeLatest(ExampleTypes.FETCH_SLEEP_SCORES, fetchSleepScores),
    takeLatest(ExampleTypes.FETCH_SLEEP_WEEK, fetchSleepWeek),
    takeLatest(ExampleTypes.FETCH_BALANCE_SCORES, fetchBalanceScores),
    takeLatest(ExampleTypes.FETCH_SLEEPS, fetchSleeps),
    takeLatest(ExampleTypes.FETCH_ALL, fetchAll),
    takeLatest(ExampleTypes.FETCH_AGENDA, fetchAgenda),
    takeLatest(ExampleTypes.FETCH_MAIN, fetchMain),
    takeLatest(ExampleTypes.FETCH_OVERALL, fetchOverall),
    takeLatest(ExampleTypes.FETCH_ACTIVITIES, fetchActivities),
    takeLatest(ExampleTypes.FETCH_MINDFULNESSES, fetchMindfulnesses),
    takeLatest(ExampleTypes.UPDATE_TOKEN, updateToken),
    // Call `createUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.CREATE_USER, createUser),
    takeLatest(ExampleTypes.ADD_BIRTHDATE, addBirthdate),
    // Call `createUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.CREATE_MOOD, createMood),
    takeLatest(ExampleTypes.CREATE_MINDFULNESS, createMindfulness),
    takeLatest(ExampleTypes.CREATE_VIDEO, createVideo),
    takeLatest(ExampleTypes.CREATE_ACTIVITY, createActivity),
    takeLatest(ExampleTypes.CREATE_SLEEP, createSleep),
    // Call `createUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.LOGIN_USER, loginUser),
    takeLatest(ExampleTypes.LOGIN_TRIAL_USER, loginTrialUser),
  ])
}
