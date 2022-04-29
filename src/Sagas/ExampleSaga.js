import { put, call, all } from 'redux-saga/effects'
import ExampleActions from '../Stores/Example/Actions'
import { userService } from '../Services/UserService'
//import NavigationService from '../Services/NavigationService'
import "@babel/polyfill";
// TEMP to AVOID STARTUP ERROR. Point is to fail...
export function* fetchNothing() {
  yield put(ExampleActions.fetchUserLoading())
  // Fetch user informations from an API
  const user = null
  if (user) {
    yield put(ExampleActions.fetchUserSuccess(user))
  } else {
    yield put(
      ExampleActions.fetchUserFailure('There was an error while fetching user informations.')
    )
  }
}

export function* fetchUser() {
  yield put(ExampleActions.fetchUserLoading())
  // Fetch user informations from an API
  const user = yield call(userService.fetchUser)
  
  
  if (user) {
    yield put(ExampleActions.fetchUserSuccess(user))
  } else {
    yield put(
      ExampleActions.fetchUserFailure('There was an error while fetching user informations.')
    )
  }
}

export function* fetchMoods(action) {
  yield put(ExampleActions.fetchMoodsLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchMoods, action)
  if (response) {
    yield put(ExampleActions.fetchMoodsSuccess(response))
  } else {
    yield put(ExampleActions.fetchMoodsFailure('There was an error while fetching user moods.'))
  }
}

export function* fetchMoodsAgenda(action) {
  yield put(ExampleActions.fetchMoodsLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchMoods, action)
  if (response) {
    yield put(ExampleActions.fetchMoodsSuccess(response))
  } else {
    yield put(ExampleActions.fetchMoodsFailure('There was an error while fetching user moods.'))
  }
}


export function* fetchMoodWeekGraph(action) {
  yield put(ExampleActions.fetchMoodsLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchMoodWeekGraph, action)
  if (response) {
    yield put(ExampleActions.fetchMoodsSuccess(response))
  } else {
    yield put(ExampleActions.fetchMoodsFailure('There was an error while fetching user moods.'))
  }
}

export function* fetchMindfulnessWeekGraph(action) {
  yield put(ExampleActions.fetchMindfulnessesLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchMindfulnessWeekGraph, action)
  if (response) {
    yield put(ExampleActions.fetchMindfulnessesSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchMindfulnessesFailure('There was an error while fetching user moods.')
    )
  }
}

export function* fetchActivityWeekGraph(action) {
  yield put(ExampleActions.fetchActivitiesLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchActivityWeekGraph, action)
  if (response) {
    yield put(ExampleActions.fetchActivitiesSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchActivitiesFailure('There was an error while fetching user activities.')
    )
  }
}

export function* fetchMain(action) {
  yield put(ExampleActions.fetchMainLoading())
  // Fetch user informations from an API

  const [moodScores, sleepScores, activityScores, balanceScores, overall] = yield all([
    call(userService.fetchMoodScores, action),
    call(userService.fetchSleepScores, action),
    call(userService.fetchActivityScores, action),
    call(userService.fetchBalanceScores, action),
    call(userService.fetchOverall, action),
  ])
  const [triangle, averageResult] = yield all([
    call(userService.fetchTriangle, moodScores, sleepScores, activityScores),
    call(userService.fetchAverage, overall),
  ])
  if (
    moodScores &&
    sleepScores &&
    activityScores &&
    balanceScores &&
    overall &&
    triangle &&
    averageResult
  ) {
    yield put(
      ExampleActions.fetchMainSuccess(
        moodScores,
        sleepScores,
        activityScores,
        balanceScores,
        overall,
        triangle,
        averageResult
      )
    )
  } else {
    yield put(ExampleActions.fetchMainFailure('There was an error while fetching main.'))
  }
}

export function* fetchMonth(action) {
  yield put(ExampleActions.fetchMonthLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchMonth, action)
  if (response) {
    yield put(ExampleActions.fetchMonthSuccess(response))
  } else {
    yield put(ExampleActions.fetchMonthFailure('There was an error while fetching mothly stats.'))
  }
}

export function* fetchMoodScores(action) {
  yield put(ExampleActions.fetchMoodScoresLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchMoodScores, action)
  if (response) {
    yield put(ExampleActions.fetchMoodScoresSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchMoodScoresFailure('There was an error while fetching user mood scores.')
    )
  }
}

export function* fetchAgenda(action) {
  yield put(ExampleActions.fetchAgendaLoading())
  // Fetch user informations from an API
  const [
    moods,
    sleeps,
    activities,
    mindfulnesses,
    // monthStats,
  ] = yield all([
    call(userService.fetchMoodsAgenda, action),
    call(userService.fetchSleepsAgenda, action),
    call(userService.fetchActivitiesAgenda, action),
    call(userService.fetchMindfulnessesAgenda, action),
  ])
  if (moods && sleeps && activities && mindfulnesses) {
    yield put(ExampleActions.fetchAgendaSuccess(moods, sleeps, activities, mindfulnesses))
  } else {
    yield put(ExampleActions.fetchAgendaFailure('There was an error while fetching agenda.'))
  }
}

export function* fetchAll(action) {
  yield put(ExampleActions.fetchAllLoading())
  // Fetch user informations from an API
  const [
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
  ] = yield all([
    call(userService.fetchMoods, action),
    call(userService.fetchSleeps, action),
    call(userService.fetchActivities, action),
    call(userService.fetchMindfulnesses, action),
    call(userService.fetchSleepWeek, action),
    call(userService.fetchBalanceScores, action),
    call(userService.fetchActivityWeekGraph, action),
    call(userService.fetchMoodWeekGraph, action),
    call(userService.fetchMindfulnessWeekGraph, action),
    // call(userService.fetchMonth, action),
  ])
  const [moodGraph, sleepGraph, activityGraph] = yield all([
    call(userService.fetchMoodGraph, moods),
    call(userService.fetchSleepGraph, sleepWeek),
    call(userService.fetchActivityGraph, activities),
  ])
  if (
    moods &&
    sleeps &&
    activities &&
    mindfulnesses &&
    sleepWeek &&
    balanceScores &&
    activityWeek &&
    moodWeek &&
    mindfulnessWeek &&
    // monthStats &&
    moodGraph &&
    sleepGraph &&
    activityGraph
  ) {

    yield put(
      ExampleActions.fetchAllSuccess(
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
        activityGraph
      )
    )
  } else {
    yield put(ExampleActions.fetchAllFailure('There was an error while fetching user all.'))
  }
}

export function* fetchActivityScores(action) {
  yield put(ExampleActions.fetchActivityScoresLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchActivityScores, action)
  if (response) {
    yield put(ExampleActions.fetchActivityScoresSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchActivityScoresFailure(
        'There was an error while fetching user activity scores.'
      )
    )
  }
}

export function* fetchSleepScores(action) {
  yield put(ExampleActions.fetchSleepScoresLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchSleepScores, action)
  if (response) {
    yield put(ExampleActions.fetchSleepScoresSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchSleepScoresFailure('There was an error while fetching user sleep scores.')
    )
  }
}

export function* fetchBalanceScores(action) {
  yield put(ExampleActions.fetchBalanceScoresLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchBalanceScores, action)
  if (response) {
    yield put(ExampleActions.fetchBalanceScoresSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchBalanceScoresFailure(
        'There was an error while fetching user balance scores.'
      )
    )
  }
}

export function* fetchActivities(action) {
  yield put(ExampleActions.fetchActivitiesLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchActivities, action)
  if (response) {
    yield put(ExampleActions.fetchActivitiesSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchActivitiesFailure('There was an error while fetching user activities.')
    )
  }
}

export function* fetchActivitiesAgenda(action) {
  yield put(ExampleActions.fetchActivitiesLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchActivities, action)
  if (response) {
    yield put(ExampleActions.fetchActivitiesSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchActivitiesFailure('There was an error while fetching user activities.')
    )
  }
}

export function* fetchMindfulnesses(action) {
  yield put(ExampleActions.fetchMindfulnessesLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchMindfulnesses, action)
  if (response) {
    yield put(ExampleActions.fetchMindfulnessesSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchMindfulnessesFailure(
        'There was an error while fetching user mindfulnesses.'
      )
    )
  }
}

export function* fetchMindfulnessesAgenda(action) {
  yield put(ExampleActions.fetchMindfulnessesLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchMindfulnesses, action)
  if (response) {
    yield put(ExampleActions.fetchMindfulnessesSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchMindfulnessesFailure(
        'There was an error while fetching user mindfulnesses.'
      )
    )
  }
}

export function* updateToken(action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.updateTokenLoading())
  // Fetch user informations from an API
  const response = yield call(userService.updateToken, action)
  if (response) {
    yield put(ExampleActions.updateTokenSuccess(response))
  } else {
    yield put(
      ExampleActions.updateTokenFailure('There was an error while updating user device token.')
    )
  }
}

export function* fetchSleeps(action) {
  yield put(ExampleActions.fetchSleepsLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchSleeps, action)
  if (response) {
    yield put(ExampleActions.fetchSleepsSuccess(response))
  } else {
    yield put(ExampleActions.fetchSleepsFailure('There was an error while fetching user sleep.'))
  }
}

export function* fetchSleepsAgenda(action) {
  yield put(ExampleActions.fetchSleepsLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchSleeps, action)
  if (response) {
    yield put(ExampleActions.fetchSleepsSuccess(response))
  } else {
    yield put(ExampleActions.fetchSleepsFailure('There was an error while fetching user sleep.'))
  }
}

export function* fetchSleepWeek(action) {
  yield put(ExampleActions.fetchSleepWeekLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchSleepWeek, action)
  if (response) {
    yield put(ExampleActions.fetchSleepWeekSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchSleepWeekFailure('There was an error while fetching user sleep week.')
    )
  }
}

export function* createMood(action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.createMoodRequest())
  // Fetch user informations from an API
  const response = yield call(userService.createMood, action)
  if (response) {
    yield put(ExampleActions.createMoodSuccess(response))
  } else {
    yield put(ExampleActions.createMoodError('There was an error while creating mood.'))
  }
}

export function* createMindfulness(action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.createMindfulnessRequest())
  // Fetch user informations from an API
  const response = yield call(userService.createMindfulness, action)
  if (response) {
    yield put(ExampleActions.createMindfulnessSuccess(response))
  } else {
    yield put(
      ExampleActions.createMindfulnessError(
        'There was an error while creating mindfulness activity.'
      )
    )
  }
}

export function* createVideo(action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.createVideoRequest())
  // Fetch user informations from an API
  const response = yield call(userService.createVideo, action)
  if (response) {
    yield put(ExampleActions.createVideoSuccess(response))
  } else {
    yield put(ExampleActions.createVideoError('There was an error while creating video activity.'))
  }
}

export function* createActivity(action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.createActivityRequest())
  // Fetch user informations from an API
  const response = yield call(userService.createActivity, action)
  if (response) {
    yield put(ExampleActions.createActivitySuccess(response))
  } else {
    yield put(ExampleActions.createActivityError('There was an error while creating activity.'))
  }
}

export function* createSleep(action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.createSleepRequest())
  // Fetch user informations from an API
  const response = yield call(userService.createSleep, action)
  if (response) {
    yield put(ExampleActions.createSleepSuccess(response))
  } else {
    yield put(ExampleActions.createSleepError('There was an error while creating sleep.'))
  }
}

export function* createUser(action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html


  yield put(ExampleActions.createUserRequest())
  // Fetch user informations from an API
  const response = yield call(userService.createUser, action)
  if (response) {
    yield put(ExampleActions.createUserSuccess(response))
    //NavigationService.navigate('MainScreen')
  } else {
    yield put(ExampleActions.createUserError('There was an error while creating user.'))
  }
}

export function* addBirthdate(action) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.createUserRequest())
  // Fetch user informations from an API
  const response = yield call(userService.addBirthdate, action)
  if (response) {
    yield put(ExampleActions.createUserSuccess(response))
  } else {
    yield put(ExampleActions.createUserError('There was an error while creating user.'))
  }
}

export function* loginUser(action) {


  yield put(ExampleActions.loginUserRequest())
  const response = yield call(userService.loginUser, action)
  // const response2 = yield call(userService.processBalance, action);
  if (response) {
    yield put(ExampleActions.loginUserSuccess(response))
  // NavigationService.navigate('MainScreen')
  } else {
    yield put(ExampleActions.loginUserError('There was an error while loging in the user.'))
  }
}

export function* loginTrialUser(action) {
  yield put(ExampleActions.loginUserRequest())
  const response = yield call(userService.loginTrialUser, action)
  // const response2 = yield call(userService.processBalance, action);
  if (response) {
    yield put(ExampleActions.loginUserSuccess(response))
  //  NavigationService.navigate('MainScreen')
  } else {
    yield put(ExampleActions.loginUserError('There was an error while loging in the user.'))
  }
}

export function* fetchOverall() {
  yield put(ExampleActions.fetchOverallLoading())
  // Fetch user informations from an API
  const response = yield call(userService.fetchOverall)
  if (response) {
    yield put(ExampleActions.fetchOverallSuccess(response))
  } else {
    yield put(
      ExampleActions.fetchOverallFailure('There was an error while fetching user sleep scores.')
    )
  }
}

// export function* loginUser(action) {
//   // Dispatch a redux action using `put()`
//   // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
//   yield put(ExampleActions.fetchUserLoading())

//   // Fetch user informations from an API
//   const user = yield call(userService.loginUser, action)
//   if (user) {
//     yield put(ExampleActions.authUserSuccess(user))
//   } else {
//     yield put(
//       ExampleActions.fetchUserFailure('There was an error while fetching user informations.')
//     )
//   }
// }
