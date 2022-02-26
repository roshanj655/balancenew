/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ExampleTypes } from './Actions'

export const createMoodRequest = (state) => ({
  ...state,
  isFetching: true,
  error: undefined,
})

export const createMoodSuccess = (state, { mood }) => ({
  ...state,
  mood: mood,
  isFetching: false,
  error: undefined,
})

export const createMoodError = (state, { errorMessage }) => ({
  ...state,
  isFetching: false,
  error: errorMessage,
})

export const createMindfulnessRequest = (state) => ({
  ...state,
  isFetching: true,
  error: undefined,
})

export const createMindfulnessSuccess = (state, { mindfulness }) => ({
  ...state,
  mindfulness: mindfulness,
  isFetching: false,
  error: undefined,
})

export const createMindfulnessError = (state, { errorMessage }) => ({
  ...state,
  isFetching: false,
  error: errorMessage,
})

export const createVideoRequest = (state) => ({
  ...state,
  isFetching: true,
  error: undefined,
})

export const createVideoSuccess = (state, { video }) => ({
  ...state,
  video: video,
  isFetching: false,
  error: undefined,
})

export const createVideoError = (state, { errorMessage }) => ({
  ...state,
  isFetching: false,
  error: errorMessage,
})

export const createActivityRequest = (state) => ({
  ...state,
  isFetching: true,
  error: undefined,
})

export const createActivitySuccess = (state, { activity }) => ({
  ...state,
  activity: activity,
  isFetching: false,
  error: undefined,
})

export const createActivityError = (state, { errorMessage }) => ({
  ...state,
  isFetching: false,
  error: errorMessage,
})

export const createSleepRequest = (state) => ({
  ...state,
  isFetching: true,
  error: undefined,
})

export const createSleepSuccess = (state, { sleep }) => ({
  ...state,
  sleep: sleep,
  isFetching: false,
  error: undefined,
})

export const createSleepError = (state, { errorMessage }) => ({
  ...state,
  isFetching: false,
  error: errorMessage,
})

export const createUserRequest = (state) => ({
  ...state,
  isFetching: true,
  error: undefined,
})

export const createUserSuccess = (state, { user }) => ({
  ...state,
  user: user,
  isFetching: false,
  error: undefined,
})

export const createUserError = (state, { errorMessage }) => ({
  ...state,
  isFetching: false,
  error: errorMessage,
})

export const updateTokenLoading = (state) => ({
  ...state,
  isFetching: true,
  error: undefined,
})

export const updateTokenSuccess = (state, { user }) => ({
  ...state,
  user: user,
  isFetching: false,
  error: undefined,
})

export const updateTokenFailure = (state, { errorMessage }) => ({
  ...state,
  isFetching: false,
  error: errorMessage,
})

export const loginUserRequest = (state) => ({
  ...state,
  isFetching: true,
  error: undefined,
})

export const loginUserSuccess = (state, { user }) => ({
  ...state,
  user: user,
  isFetching: false,
  error: null,
})

export const loginUserError = (state, { errorMessage }) => ({
  ...state,
  isFetching: false,
  error: errorMessage,
})

export const fetchUserLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchUserSuccess = (state, { user }) => ({
  ...state,
  user: user,
  isFetching: false,
  error: null,
})

export const fetchUserFailure = (state, { errorMessage }) => ({
  ...state,
  user: {},
  mood: {},
  mindfulness: {},
  video: {},
  sleep: {},
  overall: {},
  sleeps: {},
  sleepWeek: {},
  activity: {},
  activities: {},
  mindfulnesses: {},
  moods: {},
  videos: {},
  moodScores: {},
  activityScores: {},
  moodData: [],
  moodIcons: [],
  moodEntries: [],
  moodHours: [],
  sleepScores: {},
  balanceScores: {},
  dataIsLoading: false,
  userErrorMessage: null,
  userIsLoading: false,
  isFetching: false,
  // error: null,
  error: errorMessage,
  sleepDays: [],
  sleepData: [],
  mindfulnessData: [],
  activityHours: [],
  activityData: [],
  activityIcons: [],
  triangle: { labels: ['Activity', 'Mood', 'Sleep'], data: [0.0, 0.0, 0.0] },
  average: 0,
  commitsData: [],
})

export const fetchMoodsLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchMoodsSuccess = (state, { moods }) => ({
  ...state,
  moods: moods,
  isFetching: false,
  error: null,
})

export const fetchMoodsFailure = (state, { errorMessage }) => ({
  ...state,
  moods: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchMonthLoading = (state) => ({
  ...state,
  isMonthFetching: true,
  error: null,
})

export const fetchMonthSuccess = (state, { monthStats }) => ({
  ...state,
  moodMonthStats: monthStats.moodMonthStats,
  sleepMonthStats: monthStats.sleepMonthStats,
  activityMonthStats: monthStats.activityMonthStats,
  isMonthFetching: false,
  error: null,
})

export const fetchMonthFailure = (state, { errorMessage }) => ({
  ...state,
  moodMonthStats: {},
  sleepMonthStats: {},
  activityMonthStats: {},
  isMonthFetching: false,
  error: errorMessage,
})

export const fetchActivitiesLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchActivitiesSuccess = (state, { activities }) => ({
  ...state,
  activities: activities,
  isFetching: false,
  error: null,
})

export const fetchActivitiesFailure = (state, { errorMessage }) => ({
  ...state,
  activities: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchMindfulnessesLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchMindfulnessesSuccess = (state, { mindfulnesses }) => ({
  ...state,
  mindfulnesses: mindfulnesses,
  isFetching: false,
  error: null,
})

export const fetchMindfulnessesFailure = (state, { errorMessage }) => ({
  ...state,
  mindfulnesses: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchSleepsLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchSleepsSuccess = (state, { sleeps }) => ({
  ...state,
  sleeps: sleeps,
  isFetching: false,
  error: null,
})

export const fetchSleepsFailure = (state, { errorMessage }) => ({
  ...state,
  sleeps: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchMoodScoresLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchMoodScoresSuccess = (state, { moodScores }) => ({
  ...state,
  moodScores: moodScores,
  isFetching: false,
  error: null,
})

export const fetchMoodScoresFailure = (state, { errorMessage }) => ({
  ...state,
  moodScores: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchActivityScoresLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchActivityScoresSuccess = (state, { activityScores }) => ({
  ...state,
  activityScores: activityScores,
  isFetching: false,
  error: null,
})

export const fetchActivityScoresFailure = (state, { errorMessage }) => ({
  ...state,
  activityScores: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchSleepScoresLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchSleepScoresSuccess = (state, { sleepScores }) => ({
  ...state,
  sleepScores: sleepScores,
  isFetching: false,
  error: null,
})

export const fetchSleepScoresFailure = (state, { errorMessage }) => ({
  ...state,
  sleepScores: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchBalanceScoresLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchBalanceScoresSuccess = (state, { balanceScores }) => ({
  ...state,
  balanceScores: balanceScores,
  isFetching: false,
  error: null,
})

export const fetchBalanceScoresFailure = (state, { errorMessage }) => ({
  ...state,
  balanceScores: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchSleepWeekLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchSleepWeekSuccess = (state, { sleepWeek }) => ({
  ...state,
  sleepWeek: sleepWeek,
  isFetching: false,
  error: null,
})

export const fetchSleepWeekFailure = (state, { errorMessage }) => ({
  ...state,
  sleepWeek: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchAgendaLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchAgendaSuccess = (state, { moods, sleeps, activities, mindfulnesses }) => ({
  ...state,
  moods: moods,
  sleeps: sleeps,
  activities: activities,
  mindfulnesses: mindfulnesses,
  isFetching: false,
  error: null,
})

export const fetchAgendaFailure = (state, { errorMessage }) => ({
  ...state,
  moods: {},
  moodWeekHours: {},
  moodWeekIcons: {},
  moodWeekData: {},
  moodWeekDays: {},
  activityWeekHours: {},
  activityWeekIcons: {},
  activityWeekData: {},
  activityWeekDays: {},
  sleeps: {},
  activities: {},
  mindfulnesses: {},
  mindfulnessWeekHours: {},
  mindfulnessWeekIcons: {},
  mindfulnessWeekData: {},
  mindfulnessWeekDays: {},
  sleepWeek: {},
  balanceScores: {},
  moodHours: {},
  moodIcons: {},
  moodEntries: {},
  moodData: {},
  activityHours: {},
  activityIcons: {},
  activityData: {},
  sleepData: {},
  mindfulnessData: {},
  sleepDays: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchAllLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchAllSuccess = (
  state,
  {
    moods,
    sleeps,
    activities,
    mindfulnesses,
    sleepWeek,
    balanceScores,
    activityWeek,
    moodWeek,
    mindfulnessWeek,
    // monthStats,
    moodGraph,
    sleepGraph,
    activityGraph,
  }
) => ({
  ...state,
  moods: moods,
  sleeps: sleeps,
  activities: activities,
  mindfulnesses: mindfulnesses,
  sleepWeek: sleepWeek,
  balanceScores: balanceScores,
  moodHours: moodGraph.moodHours,
  moodIcons: moodGraph.moodIcons,
  moodEntries: moodGraph.moodEntries,
  moodData: moodGraph.moodData,
  moodWeekHours: moodWeek.moodWeekHours,
  moodWeekIcons: moodWeek.moodWeekIcons,
  moodWeekData: moodWeek.moodWeekData,
  moodWeekDays: moodWeek.moodWeekDays,

  mindfulnessWeekHours: mindfulnessWeek.mindfulnessWeekHours,
  mindfulnessWeekIcons: mindfulnessWeek.mindfulnessWeekIcons,
  mindfulnessWeekData: mindfulnessWeek.mindfulnessWeekData,
  mindfulnessWeekDays: mindfulnessWeek.mindfulnessWeekDays,
  // moodMonthStats: monthStats.moodMonthStats,
  // sleepMonthStats: monthStats.sleepMonthStats,
  // activityMonthStats: monthStats.activityMonthStats,
  activityWeekHours: activityWeek.activityWeekHours,
  activityWeekIcons: activityWeek.activityWeekIcons,
  activityWeekData: activityWeek.activityWeekData,
  activityWeekDays: activityWeek.activityWeekDays,
  activityHours: activityGraph.activityHours,
  activityIcons: activityGraph.activityIcons,
  activityData: activityGraph.activityData,
  sleepData: sleepGraph.sleepData,
  sleepDays: sleepGraph.sleepDays,
  isFetching: false,
  error: null,
})

export const fetchAllFailure = (state, { errorMessage }) => ({
  ...state,
  moods: {},
  moodWeekHours: {},
  moodWeekIcons: {},
  moodWeekData: {},
  moodWeekDays: {},
  activityWeekHours: {},
  activityWeekIcons: {},
  activityWeekData: {},
  activityWeekDays: {},
  sleeps: {},
  activities: {},
  mindfulnesses: {},
  mindfulnessWeekHours: {},
  mindfulnessWeekIcons: {},
  mindfulnessWeekData: {},
  mindfulnessWeekDays: {},
  sleepWeek: {},
  balanceScores: {},
  moodHours: {},
  moodIcons: {},
  moodEntries: {},
  moodData: {},
  activityHours: {},
  activityIcons: {},
  activityData: {},
  sleepData: {},
  mindfulnessData: {},
  sleepDays: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchMainLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchMainSuccess = (
  state,
  { moodScores, sleepScores, activityScores, balanceScores, overall, triangle, averageResult }
) => ({
  ...state,
  moodScores: moodScores,
  sleepScores: sleepScores,
  activityScores: activityScores,
  balanceScores: balanceScores,
  overall: overall,
  triangle: triangle,
  average: averageResult.average,
  commitsData: averageResult.commitsData,
  isFetching: false,
  error: null,
})

export const fetchMainFailure = (state, { errorMessage }) => ({
  ...state,
  moodScores: {},
  sleepScores: {},
  activityScores: {},
  balanceScores: {},
  overall: {},
  commitsData: {},
  isFetching: false,
  error: errorMessage,
})

export const fetchOverallLoading = (state) => ({
  ...state,
  isFetching: true,
  error: null,
})

export const fetchOverallSuccess = (state, { overall }) => ({
  ...state,
  overall: overall,
  isFetching: false,
  error: null,
})

export const fetchOverallFailure = (state, { errorMessage }) => ({
  ...state,
  overall: {},
  isFetching: false,
  error: errorMessage,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [ExampleTypes.FETCH_USER_LOADING]: fetchUserLoading,
  [ExampleTypes.FETCH_USER_SUCCESS]: fetchUserSuccess,
  [ExampleTypes.FETCH_USER_FAILURE]: fetchUserFailure,
  [ExampleTypes.FETCH_MOODS_LOADING]: fetchMoodsLoading,
  [ExampleTypes.FETCH_MOODS_SUCCESS]: fetchMoodsSuccess,
  [ExampleTypes.FETCH_MOODS_FAILURE]: fetchMoodsFailure,
  [ExampleTypes.FETCH_MONTH_LOADING]: fetchMonthLoading,
  [ExampleTypes.FETCH_MONTH_SUCCESS]: fetchMonthSuccess,
  [ExampleTypes.FETCH_MONTH_FAILURE]: fetchMonthFailure,
  [ExampleTypes.FETCH_ACTIVITIES_LOADING]: fetchActivitiesLoading,
  [ExampleTypes.FETCH_ACTIVITIES_SUCCESS]: fetchActivitiesSuccess,
  [ExampleTypes.FETCH_ACTIVITIES_FAILURE]: fetchActivitiesFailure,

  [ExampleTypes.FETCH_MINDFULNESSES_LOADING]: fetchMindfulnessesLoading,
  [ExampleTypes.FETCH_MINDFULNESSES_SUCCESS]: fetchMindfulnessesSuccess,
  [ExampleTypes.FETCH_MINDFULNESSES_FAILURE]: fetchMindfulnessesFailure,

  [ExampleTypes.UPDATE_TOKEN_LOADING]: updateTokenLoading,
  [ExampleTypes.UPDATE_TOKEN_SUCCESS]: updateTokenSuccess,
  [ExampleTypes.UPDATE_TOKEN_FAILURE]: updateTokenFailure,

  [ExampleTypes.FETCH_SLEEPS_LOADING]: fetchSleepsLoading,
  [ExampleTypes.FETCH_SLEEPS_SUCCESS]: fetchSleepsSuccess,
  [ExampleTypes.FETCH_SLEEPS_FAILURE]: fetchSleepsFailure,
  [ExampleTypes.LOGIN_USER_REQUEST]: loginUserRequest,
  [ExampleTypes.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [ExampleTypes.LOGIN_USER_ERROR]: loginUserError,
  [ExampleTypes.CREATE_USER_REQUEST]: createUserRequest,
  [ExampleTypes.CREATE_USER_SUCCESS]: createUserSuccess,
  [ExampleTypes.CREATE_USER_ERROR]: createUserError,
  [ExampleTypes.CREATE_MOOD_REQUEST]: createMoodRequest,
  [ExampleTypes.CREATE_MOOD_SUCCESS]: createMoodSuccess,
  [ExampleTypes.CREATE_MOOD_ERROR]: createMoodError,
  [ExampleTypes.CREATE_MINDFULNESS_REQUEST]: createMindfulnessRequest,
  [ExampleTypes.CREATE_MINDFULNESS_SUCCESS]: createMindfulnessSuccess,
  [ExampleTypes.CREATE_MINDFULNESS_ERROR]: createMindfulnessError,
  [ExampleTypes.CREATE_VIDEO_REQUEST]: createVideoRequest,
  [ExampleTypes.CREATE_VIDEO_SUCCESS]: createVideoSuccess,
  [ExampleTypes.CREATE_VIDEO_ERROR]: createVideoError,
  [ExampleTypes.CREATE_ACTIVITY_REQUEST]: createActivityRequest,
  [ExampleTypes.CREATE_ACTIVITY_SUCCESS]: createActivitySuccess,
  [ExampleTypes.CREATE_ACTIVITY_ERROR]: createActivityError,
  [ExampleTypes.CREATE_SLEEP_REQUEST]: createSleepRequest,
  [ExampleTypes.CREATE_SLEEP_SUCCESS]: createSleepSuccess,
  [ExampleTypes.CREATE_SLEEP_ERROR]: createSleepError,

  [ExampleTypes.FETCH_MOOD_SCORES_LOADING]: fetchMoodScoresLoading,
  [ExampleTypes.FETCH_MOOD_SCORES_SUCCESS]: fetchMoodScoresSuccess,
  [ExampleTypes.FETCH_MOOD_SCORES_FAILURE]: fetchMoodScoresFailure,

  [ExampleTypes.FETCH_ACTIVITY_SCORES_LOADING]: fetchActivityScoresLoading,
  [ExampleTypes.FETCH_ACTIVITY_SCORES_SUCCESS]: fetchActivityScoresSuccess,
  [ExampleTypes.FETCH_ACTIVITY_SCORES_FAILURE]: fetchActivityScoresFailure,

  [ExampleTypes.FETCH_SLEEP_SCORES_LOADING]: fetchSleepScoresLoading,
  [ExampleTypes.FETCH_SLEEP_SCORES_SUCCESS]: fetchSleepScoresSuccess,
  [ExampleTypes.FETCH_SLEEP_SCORES_FAILURE]: fetchSleepScoresFailure,

  [ExampleTypes.FETCH_SLEEP_WEEK_LOADING]: fetchSleepWeekLoading,
  [ExampleTypes.FETCH_SLEEP_WEEK_SUCCESS]: fetchSleepWeekSuccess,
  [ExampleTypes.FETCH_SLEEP_WEEK_FAILURE]: fetchSleepWeekFailure,

  [ExampleTypes.FETCH_BALANCE_SCORES_LOADING]: fetchBalanceScoresLoading,
  [ExampleTypes.FETCH_BALANCE_SCORES_SUCCESS]: fetchBalanceScoresSuccess,
  [ExampleTypes.FETCH_BALANCE_SCORES_FAILURE]: fetchBalanceScoresFailure,

  [ExampleTypes.FETCH_ALL_LOADING]: fetchAllLoading,
  [ExampleTypes.FETCH_ALL_SUCCESS]: fetchAllSuccess,
  [ExampleTypes.FETCH_ALL_FAILURE]: fetchAllFailure,

  [ExampleTypes.FETCH_AGENDA_LOADING]: fetchAgendaLoading,
  [ExampleTypes.FETCH_AGENDA_SUCCESS]: fetchAgendaSuccess,
  [ExampleTypes.FETCH_AGENDA_FAILURE]: fetchAgendaFailure,

  [ExampleTypes.FETCH_MAIN_LOADING]: fetchMainLoading,
  [ExampleTypes.FETCH_MAIN_SUCCESS]: fetchMainSuccess,
  [ExampleTypes.FETCH_MAIN_FAILURE]: fetchMainFailure,

  [ExampleTypes.FETCH_OVERALL_LOADING]: fetchOverallLoading,
  [ExampleTypes.FETCH_OVERALL_SUCCESS]: fetchOverallSuccess,
  [ExampleTypes.FETCH_OVERALL_FAILURE]: fetchOverallFailure,
})
