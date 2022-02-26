import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Action names are turned to SNAKE_CASE into the `Types` variable. This can be used
 * to listen to actions:
 *
 * - to trigger reducers to update the state, for example in App/Stores/Example/Reducers.js
 * - to trigger sagas, for example in App/Sagas/index.js
 *
 * Actions can be dispatched:
 *
 * - in React components using `dispatch(...)`, for example in App/App.js
 * - in sagas using `yield put(...)`, for example in App/Sagas/ExampleSaga.js
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
const { Types, Creators } = createActions({
  fetchNothing: null,

  // Fetch user informations
  fetchUser: null,
  addBirthdate: ['user'],
  // The operation has started and is loading
  fetchUserLoading: null,
  // User informations were successfully fetched
  fetchUserSuccess: ['user'],
  // An error occurred
  fetchUserFailure: ['errorMessage'],

  // Fetch user mood score
  fetchMoodScores: ['date'],
  fetchMoodScoresLoading: null,
  fetchMoodScoresSuccess: ['moodScores'],
  fetchMoodScoresFailure: ['errorMessage'],

  // Fetch user mood score
  fetchOverall: ['date'],
  fetchOverallLoading: null,
  fetchOverallSuccess: ['overall'],
  fetchOverallFailure: ['errorMessage'],

  // Fetch user activity score
  fetchActivityScores: ['date'],
  fetchActivityScoresLoading: null,
  fetchActivityScoresSuccess: ['activityScores'],
  fetchActivityScoresFailure: ['errorMessage'],

  // Fetch user sleep score
  fetchSleepScores: ['date'],
  fetchSleepScoresLoading: null,
  fetchSleepScoresSuccess: ['sleepScores'],
  fetchSleepScoresFailure: ['errorMessage'],

  // Fetch user balance score
  fetchBalanceScores: ['date'],
  fetchBalanceScoresLoading: null,
  fetchBalanceScoresSuccess: ['balanceScores'],
  fetchBalanceScoresFailure: ['errorMessage'],

  // Fetch user mood
  fetchMoods: ['date'],
  fetchMoodsLoading: null,
  fetchMoodsSuccess: ['moods'],
  fetchMoodsFailure: ['errorMessage'],

  fetchMonth: ['date'],
  fetchMonthLoading: null,
  fetchMonthSuccess: ['monthStats'],
  fetchMonthFailure: ['errorMessage'],

  // Fetch user all
  fetchAll: ['date'],
  fetchAllLoading: null,
  fetchAllSuccess: [
    'moods',
    'sleeps',
    'activities',
    'mindfulnesses',
    'sleepWeek',
    'balanceScores',
    'activityWeek',
    'moodWeek',
    'mindfulnessWeek',
    // 'monthStats',
    'moodGraph',
    'sleepGraph',
    'activityGraph',
  ],
  fetchAllFailure: ['errorMessage'],

  // Fetch Agenda
  fetchAgenda: ['date'],
  fetchAgendaLoading: null,
  fetchAgendaSuccess: ['moods', 'sleeps', 'activities', 'mindfulnesses'],
  fetchAgendaFailure: ['errorMessage'],

  // Fetch main all
  fetchMain: ['date'],
  fetchMainLoading: null,
  fetchMainSuccess: [
    'moodScores',
    'sleepScores',
    'activityScores',
    'balanceScores',
    'overall',
    'triangle',
    'averageResult',
  ],
  fetchMainFailure: ['errorMessage'],

  // Fetch user Activity
  fetchActivities: ['date'],
  fetchActivitiesLoading: null,
  fetchActivitiesSuccess: ['activities'],
  fetchActivitiesFailure: ['errorMessage'],

  // Fetch user Mindfulness
  fetchMindfulnesses: ['date'],
  fetchMindfulnessesLoading: null,
  fetchMindfulnessesSuccess: ['mindfulnesses'],
  fetchMindfulnessesFailure: ['errorMessage'],

  // Fetch user Sleep
  fetchSleeps: ['date'],
  fetchSleepsLoading: null,
  fetchSleepsSuccess: ['sleeps'],
  fetchSleepsFailure: ['errorMessage'],

  // Fetch user Sleep
  fetchSleepWeek: ['date'],
  fetchSleepWeekLoading: null,
  fetchSleepWeekSuccess: ['sleepWeek'],
  fetchSleepWeekFailure: ['errorMessage'],

  // Start Create
  createUser: ['user'],
  createUserRequest: null,
  createUserSuccess: ['user'],
  createUserError: ['errorMessage'],

  // Start Create
  updateToken: ['token'],
  updateTokenLoading: null,
  updateTokenSuccess: ['token'],
  updateTokenFailure: ['errorMessage'],

  // Start Login
  loginUser: ['user'],
  loginTrialUser: ['user'],
  loginUserRequest: null,
  loginUserSuccess: ['user'],
  loginUserError: ['errorMessage'],

  // Create Mood
  createMood: ['mood', 'date', 'score', 'entry'],
  createMoodRequest: null,
  createMoodSuccess: ['mood', 'date', 'score', 'entry'],
  createMoodError: ['errorMessage'],

  // Create Activity
  createActivity: ['activity', 'date', 'duration'],
  createActivityRequest: null,
  createActivitySuccess: ['activity', 'date', 'duration'],
  createActivityError: ['errorMessage'],

  // Create Mindfulness
  createMindfulness: ['mindfulness', 'date'],
  createMindfulnessRequest: null,
  createMindfulnessSuccess: ['mindfulness', 'date'],
  createMindfulnessError: ['errorMessage'],

  // Create Video
  createVideo: ['video', 'date', 'score'],
  createVideoRequest: null,
  createVideoSuccess: ['video', 'date', 'score'],
  createVideoError: ['errorMessage'],

  // Create Sleep
  createSleep: ['sleep', 'date'],
  createSleepRequest: null,
  createSleepSuccess: ['sleep', 'date'],
  createSleepError: ['errorMessage'],
})

export const ExampleTypes = Types
export default Creators
