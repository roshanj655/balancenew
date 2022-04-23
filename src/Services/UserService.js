// import { is, curryN, gte } from 'ramda'
import { Alert } from 'react-native'
import AsyncStorage from '@callstack/async-storage';
import io from 'socket.io-client'
import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
// import Moment from 'react-moment'
import moment from 'moment'
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication-client'
import NavigationService from './NavigationService'

const app = feathers()
const options = {
  transports: ['websocket'],
  forceNew: true,
  pingTimeout: 10000,
  pingInterval: 5000,
  strategy: 'jwt',
    authStrategies:'jwt' ,
    extraHeaders: {
      accessToken: localStorage.getItem('feathers-jwt'),
      //Authorization: 'JhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NTA2ODMzOTIsImV4cCI6MTY1MDc2OTc5MiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjIwZTRkMjFhODUwZWQwMDFjOGNkOTJkIiwianRpIjoiNDQzMjZkNzAtMjc3OC00MGVkLTk1YTktMDlhZWUzMDI2OGMwIn0.V64szBzlMVI6jSoPQBNczopjjsxukzSQFe0QhDO8WH8'
    }
}
const socket = io('https://api.findingbalance.io:3030', options);

socket.on('connect', () => {
  socket.emit('create', 'authentication', {
    strategy: 'jwt',
    accessToken: localStorage.getItem('feathers-jwt')
  }, function(error, newAuthResult) {
    console.log("newauthresult",newAuthResult); 
  });

  setTimeout(function() {
       }, 100)
});

socket.on('disconnect', (err) => {
  console.log("DIsCOnnect US"+err);
  setTimeout(function() {
    NavigationService.navigate('NetworkErrorScreen')
  }, 100)
})
app.configure(
  //console.log("cong US")
  socketio(socket, {
    timeout: 60000 * 60,
  })
)

app.configure(hooks())
app.configure(
  
  authentication({
    path: 'authentication',
    service: 'users',
    storage: AsyncStorage,
  })
)

function fetchUser() {
  console.log("Fetch User Hello");
  return app
    .service('users')
    .find()
    .then((response) => {
      console.log("Fetch User 1 "+response.data[0])
      return response.data[0]
    })
}

async function addBirthdate(action) {
  console.log("addBirthdate");
  const data = {
    dob: action.user.dob,
  }
  var existingUser = await app
    .service('users')
    .find()
    .then((response) => {
      return response.data[0]
    })
  if (existingUser) {
    var final = await app
      .service('users')
      .patch(existingUser, data)
      .then((response) => {
        return response
      })
  }
  return final
}

function fetchAverage(overall) {
  console.log("fetchAverage");
  var total = 0
  var commitsData = []
  for (var i = 0; i < overall.length; i++) {
    var entry = { date: overall[i].day, count: overall[i].score / 10 }
    total = total + parseInt(overall[i].score)
    commitsData.push(entry)
  }
  var average = Math.round(total / overall.length)
  const response = { average: average, commitsData: commitsData }
  
  return response
}

function fetchTriangle(moodScores, sleepScores, activityScores) {
  console.log("fetchTriangle");
  const response = {
    labels: ['Activity', 'Mood', 'Sleep'],
    data: [
      activityScores.length === 1 ? activityScores[0].score / 100 : 0,
      moodScores.length === 1 ? moodScores[0].score / 100 : 0,
      sleepScores.length === 1 ? sleepScores[0].score / 100 : 0,
    ],
  }
  console.log("US fetchTRaingle " + response.data);
  return response
}

function fetchMoods(action) {
  console.log("US fetchMoods");
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('moods')
    .find({
      query: {
        day: dayQuery,
        // accessToken: localStorage.getItem('token')
      },
    })
    .then((response) => {
      console.log("Moods Dataaa" + JSON.stringify(response))
      return response.data
    }).catch((error) => {
      console.log(error);
      return Promise.reject(error)
    })
}

function fetchMoodsAgenda(action) {
  console.log("fetchMoodsAgenda");
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 30)
  var nextDay = today.setDate(today.getDate() + 31)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  var startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    0,
    0,
    0
  )

  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('moods')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchActivitiesAgenda(action) {
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 30)
  var nextDay = today.setDate(today.getDate() + 31)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  var startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    0,
    0,
    0
  )

  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('activities')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchSleepsAgenda(action) {
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 30)
  var nextDay = today.setDate(today.getDate() + 31)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  var startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    0,
    0,
    0
  )

  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('sleeps')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchMindfulnessesAgenda(action) {
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 30)
  var nextDay = today.setDate(today.getDate() + 31)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  var startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    0,
    0,
    0
  )

  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('mindfulnesses')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function formatAMPM(date) {
  var day = new Date(date)
  var hours = day.getHours()
  var minutes = day.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

function fetchMoodGraph(moods) {
  var moodData = []
  var moodHours = []
  var moodEntries = []
  var moodIcons = []

  var sortedMoods = moods.sort(function(a, b) {
    return new Date(a.day) - new Date(b.day)
  })

  for (var i in sortedMoods) {
    //  moodData.push(parseInt(moods[i].score))
    moodData.push(moods[i].score)
    moodIcons.push(moods[i].type)
    moodEntries.push(moods[i].entry)
    moodHours.push(formatAMPM(moods[i].day))
  }
  if (moodData.length === 0) {
    //  moodData.push(0, 0, 0, 0),
    //  moodHours.push('10am', '11am', '12pm', '1pm')
    //  moodIcons.push('none', 'none', 'none', 'none')
  }
  const response = {
    moodData: moodData,
    moodHours: moodHours,
    moodIcons: moodIcons,
    moodEntries: moodEntries,
  }
  return response
}

function fetchMindfulnessWeekGraph(action) {
  var mindfulnessWeekData = []
  var mindfulnessWeekHours = []
  var mindfulnessWeekDays = []
  var mindfulnessWeekIcons = []
  var temp = []
  // // Get previous day based on given day
  const date = action.date
  const rangeDate = getCalendarWeek(date)

  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +rangeDate.fromDate,
    $lt: +rangeDate.toDate,
  }
  return app
    .service('mindfulnesses')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      const groups = response.data.reduce((groups, mindfulness) => {
        const date = mindfulness.day.split('T')[0]
        if (!groups[date]) {
          groups[date] = []
        }

        var timenum = new Date(mindfulness.day)
        var hours = timenum.getHours()
        var minutes = timenum.getMinutes()
        minutes = minutes < 10 ? '0' + minutes : minutes
        var strTime = hours + '.' + minutes
        groups[date].push(parseFloat(strTime))
        return groups
      }, {})

      const orderedDates = {}
      Object.keys(groups)
        .sort(function(a, b) {
          return a
            .split('-')
            .reverse()
            .join('')
            .localeCompare(
              b
                .split('-')
                .reverse()
                .join('')
            )
        })
        .forEach(function(key) {
          orderedDates[key] = groups[key]
        })

      const icons = response.data.reduce((icons, mindfulness) => {
        const date = mindfulness.day.split('T')[0]
        if (!icons[date]) {
          icons[date] = []
        }
        icons[date].push(mindfulness.type)
        return icons
      }, {})

      const labels = response.data.reduce((labels, mindfulness) => {
        const date = mindfulness.day.split('T')[0]
        if (!labels[date]) {
          labels[date] = []
        }
        labels[date].push(formatAMPM(mindfulness.day))
        return labels
      }, {})

      // Edit: to add it in the array format instead
      Object.keys(orderedDates).map((date) => {
        mindfulnessWeekHours.push(orderedDates[date])
        mindfulnessWeekIcons.push(icons[date])
        mindfulnessWeekDays.push(labels[date])
        return {
          date,
          mindfulness: orderedDates[date],
        }
      })

      temp.push(Object.keys(orderedDates))
      for (var index = 0; index < response.data.length; index++) {
        mindfulnessWeekData.push(response.data[index])
      }
      const weekMindfulnesses = {
        mindfulnessWeekData: mindfulnessWeekData,
        mindfulnessWeekHours: mindfulnessWeekHours,
        mindfulnessWeekIcons: mindfulnessWeekIcons,
        mindfulnessWeekDays: mindfulnessWeekDays,
      }
      return weekMindfulnesses
    })
}

function getCalendarWeek(date) {
  var today = new Date(date)
  if (today.getDay() === 0) {
    var temp = moment(today)
    today = temp.subtract(1, 'days').toDate()
  }
  const fromDate = moment(today).startOf('week')
  fromDate.add(1, 'days')
  const toDate = moment(today).endOf('week')
  toDate.add(1, 'days')
  return {
    fromDate,
    toDate,
  }
}

function fetchMoodWeekGraph(action) {
  var moodWeekData = []
  var moodWeekHours = []
  var moodWeekDays = []
  var moodWeekIcons = []
  var temp = []
  // // Get previous day based on given day
  const date = action.date
  const rangeDate = getCalendarWeek(date)

  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +rangeDate.fromDate,
    $lt: +rangeDate.toDate,
  }
  return app
    .service('moods')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      const groups = response.data.reduce((groups, mood) => {
        const date = mood.day.split('T')[0]
        if (!groups[date]) {
          groups[date] = []
        }

        var timenum = new Date(mood.day)
        var hours = timenum.getHours()
        var minutes = timenum.getMinutes()
        minutes = minutes < 10 ? '0' + minutes : minutes
        var strTime = hours + '.' + minutes
        groups[date].push(parseFloat(strTime))
        return groups
      }, {})

      const orderedDates = {}
      Object.keys(groups)
        .sort(function(a, b) {
          return a
            .split('-')
            .reverse()
            .join('')
            .localeCompare(
              b
                .split('-')
                .reverse()
                .join('')
            )
        })
        .forEach(function(key) {
          orderedDates[key] = groups[key]
        })

      const icons = response.data.reduce((icons, mood) => {
        const date = mood.day.split('T')[0]
        if (!icons[date]) {
          icons[date] = []
        }
        icons[date].push(mood.type)
        return icons
      }, {})

      const labels = response.data.reduce((labels, mood) => {
        const date = mood.day.split('T')[0]
        if (!labels[date]) {
          labels[date] = []
        }
        labels[date].push(formatAMPM(mood.day))
        return labels
      }, {})

      // Edit: to add it in the array format instead
      Object.keys(orderedDates).map((date) => {
        moodWeekHours.push(orderedDates[date])
        moodWeekIcons.push(icons[date])
        moodWeekDays.push(labels[date])
        return {
          date,
          mood: orderedDates[date],
        }
      })

      temp.push(Object.keys(orderedDates))
      for (var index = 0; index < response.data.length; index++) {
        moodWeekData.push(response.data[index])
      }

      const weekMoods = {
        moodWeekData: moodWeekData,
        moodWeekHours: moodWeekHours,
        moodWeekIcons: moodWeekIcons,
        moodWeekDays: moodWeekDays,
      }

      return weekMoods
    })
}

async function fetchMonth(action) {
  console.log("fetchMonth US");
  try {
    var moodTypes = [
      'Scared',
      'Mad',
      'Annoyed',
      'Bored',
      'Confident',
      'Confused',
      'Disappointed',
      'Excited',
      'Frustrated',
      'Happy',
      'Hurt',
      'Lonely',
      'Loved',
      'Nervous',
      'Anxious',
      'Relaxed',
      'Sad',
      'Sick',
      'Silly',
      'Stressed',
      'Tired',
      'Worried',
      'Goofy',
      'Overwhelmed',
      'Depressed',
      'Grateful',
      'Hopeful',
    ]
    var activityTypes = [
      'Baseball',
      'Basketball',
      'Biking',
      'Cheer',
      'Football',
      'Golf',
      'Gymnastics',
      'Hockey',
      'Lacrosse',
      'Running',
      'Scootering',
      'Skateboarding',
      'Skiing',
      'Soccer',
      'Surfing',
      'Swimming',
      'Tennis',
      'Volleyball',
      'Weightlifting',
      'Yoga',
      'Dancing',
      'Hiking',
      'MartialArts',
      'Walking',
    ]
    var moodMonthStats = []
    var activityMonthStats = []
    var sleepMonthStats = 0
    var monthStats

    // // Get previous day based on given day
    const date = action.date
    const today = new Date(date)
    var previousDay = today.setDate(today.getDate() - 30)
    var nextDay = today.setDate(today.getDate() + 31)
    nextDay = new Date(nextDay)
    previousDay = new Date(previousDay)
    var startOfNextDay = new Date(
      nextDay.getFullYear(),
      nextDay.getMonth(),
      nextDay.getDate(),
      0,
      0,
      0
    )
    var endOfPreviousDay = new Date(
      previousDay.getFullYear(),
      previousDay.getMonth(),
      previousDay.getDate(),
      0,
      0,
      0
    )

    // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
    const dayQuery = {
      $gt: +endOfPreviousDay,
      $lt: +startOfNextDay,
    }

    for (var rowData of moodTypes) {
      await app
        .service('moods')
        .find({
          query: {
            day: dayQuery,
            type: rowData,
            $limit: 1,
            $sort: {
              type: 1,
            },
          },
        })
        .then((response) => {
          if (response.data.length !== 0) {
            var obj = {}
            obj['type'] = response.data[0].type
            obj['count'] = response.total
            moodMonthStats.push(obj)
            moodMonthStats.sort(function(a, b) {
              return b.count - a.count
            })
          }
        })
    }

    for (var rData of activityTypes) {
      await app
        .service('activities')
        .find({
          query: {
            day: dayQuery,
            type: rData,
            $limit: 1,
            $sort: {
              type: 1,
            },
          },
        })
        .then((response) => {
          if (response.data.length !== 0) {
            var obj = {}
            obj['type'] = response.data[0].type
            obj['count'] = response.total
            activityMonthStats.push(obj)
            activityMonthStats.sort(function(a, b) {
              return b.count - a.count
            })
          }
        })
    }

    // for(var rowData of activityTypes) {

    await app
      .service('sleeps')
      .find({
        query: {
          day: dayQuery,
          // type: rowData,
          // $limit: 1,
          // $sort: {
          //   type: 1
          // }
        },
      })
      .then((response) => {
        // Average Score
        // Loop through today's scores and take average. Be sure to add incoming score that wont be in Todays score
        var total = 0
        var counter = 0
        for (const s in response.data) {
          counter = counter + 1
          total = total + parseInt(response.data[s].hours)
        }
        sleepMonthStats = Math.round((total / counter) * 100 + Number.EPSILON) / 100
      })
    // }

    monthStats = {
      activityMonthStats: activityMonthStats,
      moodMonthStats: moodMonthStats,
      sleepMonthStats: sleepMonthStats,
    }
    return monthStats
  } catch (error) {
    monthStats = {
      activityMonthStats: [],
      moodMonthStats: [],
      sleepMonthStats: [],
    }
    return monthStats
  }
}

function fetchActivityWeekGraph(action) {
  console.log("fetchAWG US");
  var activityWeekData = []
  var activityWeekHours = []
  var activityWeekDays = []
  var activityWeekIcons = []
  var temp = []
  // // Get previous day based on given day
  const date = action.date
  const rangeDate = getCalendarWeek(date)

  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +rangeDate.fromDate,
    $lt: +rangeDate.toDate,
  }
  return app
    .service('activities')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      const groups = response.data.reduce((groups, activity) => {
        const date = activity.day.split('T')[0]
        if (!groups[date]) {
          groups[date] = []
        }

        var timenum = new Date(activity.day)
        var hours = timenum.getHours()
        var minutes = timenum.getMinutes()
        minutes = minutes < 10 ? '0' + minutes : minutes
        var strTime = hours + '.' + minutes
        groups[date].push(parseFloat(strTime))
        return groups
      }, {})

      const orderedDates = {}
      Object.keys(groups)
        .sort(function(a, b) {
          return a
            .split('-')
            .reverse()
            .join('')
            .localeCompare(
              b
                .split('-')
                .reverse()
                .join('')
            )
        })
        .forEach(function(key) {
          orderedDates[key] = groups[key]
        })

      const icons = response.data.reduce((icons, activity) => {
        const date = activity.day.split('T')[0]
        if (!icons[date]) {
          icons[date] = []
        }
        icons[date].push(activity.type)
        return icons
      }, {})

      const labels = response.data.reduce((labels, activity) => {
        const date = activity.day.split('T')[0]
        if (!labels[date]) {
          labels[date] = []
        }
        labels[date].push(formatAMPM(activity.day))
        return labels
      }, {})

      // Edit: to add it in the array format instead
      Object.keys(orderedDates).map((date) => {
        activityWeekHours.push(orderedDates[date])
        activityWeekIcons.push(icons[date])
        activityWeekDays.push(labels[date])
        return {
          date,
          activity: orderedDates[date],
        }
      })
      temp.push(Object.keys(orderedDates))
      for (var index = 0; index < response.data.length; index++) {
        // activityWeekData.push(getDayOfWeek(response.data[index].day))
        activityWeekData.push(response.data[index])
      }
      const weekActivities = {
        activityWeekData: activityWeekData,
        activityWeekHours: activityWeekHours,
        activityWeekIcons: activityWeekIcons,
        activityWeekDays: activityWeekDays,
      }
      return weekActivities
    })
}

function getDayOfWeek(date) {
  var dayOfWeek = new Date(date).getDay()
  return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'][dayOfWeek]
}

function getDayOfWeek2(date) {
  var dayOfWeek = new Date(date).getDay()
  return isNaN(dayOfWeek) ? null : ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'][dayOfWeek]
}

function fetchSleepGraph(sleeps) {
  var weekHours = []
  var weekDays = []

  var sortedSleeps = sleeps.sort(function(a, b) {
    return new Date(a.day) - new Date(b.day)
  })

  for (var day in sortedSleeps) {
    weekHours.push(parseInt(sleeps[day].hours))
    weekDays.push(getDayOfWeek(sleeps[day].day))
  }
  if (weekHours.length === 0) {
    // weekHours.push(0, 0, 0, 0, 0, 0, 0),
    // weekDays.push('Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun')
  }
  const response = { sleepData: weekHours, sleepDays: weekDays }
  return response
}

function fetchActivityGraph(activities) {
  var activityData = []
  var activityHours = []
  var activityIcons = []
  for (var i in activities) {
    activityData.push(parseInt(activities[i].duration))
    activityIcons.push(activities[i].type)
    activityHours.push(formatAMPM(activities[i].day))
  }
  if (activityData.length === 0) {
    // activityData.push(0, 0, 0, 0),
    // activityHours.push('10am', '11am', '12pm', '1pm')
    // activityIcons.push('none', 'none', 'none', 'none')
  }
  const response = {
    activityData: activityData,
    activityHours: activityHours,
    activityIcons: activityIcons,
  }
  return response
}

function fetchActivities(action) {
  console.log("fetchAc US");
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('activities')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchMindfulnesses(action) {
  console.log("fetchMinde US");
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('mindfulnesses')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchSleeps(action) {
  console.log("fetchSleep US");
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }
  return app
    .service('sleeps')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchSleepWeek(action) {
  console.log("fetchSleepW US");
  // // Get previous day based on given day
  const date = action.date
  const rangeDate = getCalendarWeek(date)

  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +rangeDate.fromDate,
    $lt: +rangeDate.toDate,
  }
  return app
    .service('sleeps')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function createMood(action) {
  console.log("CM US");
  const m = moment(action.date)
  const offset = m.utcOffset()
  const data = {
    type: action.mood,
    day: action.date,
    score: action.score,
    entry: action.entry,
    offset: offset,
  }
  return app
    .service('moods')
    .create(data)
    .then((response) => {
      return response
    })
}

function createMindfulness(action) {
  console.log("CMF US");
  const m = moment(action.date)
  const offset = m.utcOffset()
  const data = {
    type: action.mindfulness,
    day: action.date,
    offset: offset,
    score: action.score,
  }
  return app
    .service('mindfulnesses')
    .create(data)
    .then((response) => {
      return response
    })
}

function createVideo(action) {
  console.log("CV US");
  const m = moment(action.date)
  const offset = m.utcOffset()
  const data = {
    type: action.video,
    day: action.date,
    offset: offset,
    score: action.score,
  }
  return app
    .service('videos')
    .create(data)
    .then((response) => {
      return response
    })
}

function createActivity(action) {
  console.log("CAc US");
  const m = moment(action.date)
  const offset = m.utcOffset()
  const data = {
    type: action.activity.replace(/ /g, ''),
    day: action.date,
    offset: offset,
    duration: action.duration,
  }
  return app
    .service('activities')
    .create(data)
    .then((response) => {
      return response
    })
}

async function createSleep(action) {
  console.log("CSleep US");
  const m = moment(action.date)
  const offset = m.utcOffset()
  const data = {
    hours: action.sleep,
    day: action.date,
    offset: offset,
  }
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }
  var existingSleep = await app
    .service('sleeps')
    .find({
      query: {
        day: dayQuery,
      },
    })
    .then((response) => {
      if (response.data.length === 0) {
        return null
      } else {
        return response.data[0]._id
      }
    })

  if (existingSleep) {
    await app
      .service('sleeps')
      .patch(existingSleep, data)
      .then((response) => {
        return response
      })
  } else {
    await app
      .service('sleeps')
      .create(data)
      .then((response) => {
        return response
      })
  }
}

async function createUser(action) {
  console.log("CUser US");
  const user = {
    trueEmail: action.email,
    email: action.password,
    password: action.password,
    dob: '',
    firstName: action.email,
  }
  return app
    .service('users')
    .create(user)
    .then((response) => {
      const payload = {
        email: action.password,
        password: action.password,
        strategy: 'local',
      }
      return authenticate(payload)
    })
}

async function createTrialUser(action) {
  console.log("uuuu US");
  var create = new Date()
  const user = {
    trueEmail: action.email,
    email: action.password,
    password: action.password,
    freeTrial: true,
    startTrial: create,
    dob: '',
    firstName: action.email,
  }
  return app
    .service('users')
    .create(user)
    .then((response) => {
      const payload = {
        email: action.password,
        password: action.password,
        strategy: 'local',
      }
      return authenticate(payload)
    })
}

async function updateToken(token) {
  console.log("updateToken US");
  const sendToken = {
    deviceToken: token.token,
  }

  var userId = await app
    .service('users')
    .find()
    .then((response) => {
      return response.data[0]._id
    })

  await app
    .service('users')
    .patch(userId, sendToken)
    .then((response) => {
      return response
    })
}

async function saveItem(item, selectedValue) {
  try {

    await AsyncStorage.setItem(item, selectedValue)
  } catch (error) {
    console.error('AsyncStorage error: ' + error.message)
  }
}

function loginUser(action) {
  console.log("login 1 US",action);
  const payload = {
    email: action.user.email,
    password: action.user.password,
    firstName:action.user.firstName,
    strategy: 'local',
    // email: "test@test.com",//action.user.email,
    // password: "TEST123!",//action.user.password,
    // firstName:"MARK TEST",//action.user.firstName,
    // strategy: 'local',
  }

  return authenticate(payload)
}

function loginTrialUser(action) {
  console.log("logintrail US");
  const payload = {
    email: action.user.email,
    password: action.user.password,
    firstName: action.user.firstName,
    strategy: 'local',
  }

  return trialAuthenticate(payload)
}

function trialAuthenticate(options) {
  console.log("trail auth 2 US");
  return _trialAuthenticate(options)
    .then((user) => {
      saveItem('id_token', options.password)
      return Promise.resolve(user)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

function _trialAuthenticate(payload) {
  console.log("trail auth US");
  return app
    .authenticate(payload)
    .then((response) => {
      return app.passport.verifyJWT(response.accessToken)
    })
    .then((payload) => {
      return app.service('users').get(payload.sub)
    })
    .then((user) => {
      app.set('user', user)
      return app.service('users').get(app.get('user'))
    })
    .catch((e) => {
      if (e.message === 'Invalid login') {
        return createTrialUser(payload)
      }
    })
}

function authenticate(options) {
  console.log("auth 2 US");
  return _authenticate(options)
    .then((user) => {
      saveItem('id_token', options.password)
      return Promise.resolve(user)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

function _authenticate(payload) {
  console.log("_auth US 1");
  return app
    .authenticate(payload)
    .then((response) => {
      const temp = app.passport.verifyJWT(response.accessToken)
      saveItem('id_token', response.accessToken)
      saveItem('token', response.accessToken)
      console.log("User Authenticated Success"+response.accessToken)
      return temp
    })
    .then((payload) => {
      console.log("Auth 2 Ashu")  
      return app.service('users').get(payload.sub)
    })
    .then((user) => {
      console.log("Auth 3 Ashu"+app.get('user'))
      app.set('user', user)
      return app.service('users').get(app.get('user'))
    })
    .catch((e) => {
      console.log("ERRRRR " + e.message)
      if (e.message === 'Invalid login') {
        console.log(e.message)
        return createUser(payload)
      }
    })
}

function fetchMoodScores(action) {
  console.log("fetchMoodsScore US");
  // // Get previous day based on given day
  const today = new Date()
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )

  console.log("fetchMoodsScore startOfNextDay" + startOfNextDay);
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )

  console.log("fetchMoodsScore endOfPreviousDay" + endOfPreviousDay);
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  console.log("fetchMoodsScore en dayQuerydOfPreviousDay" + dayQuery.$gt);
  return app
    .service('scores')
    .find({
      query: {
        type: 'Mood',
        $sort: {
          createdAt: -1,
        },
        $limit: 1,
        day: dayQuery,
      },
    })
    .then((response) => {
      console.log(response)
      console.log(response.data)
      console.log("Ashuuuuuuuuuu")
      return response.data
    })

    console.log("Returned :(")
}

function fetchActivityScores(action) {
  console.log("fetchActivityScore US");
  // // Get previous day based on given day
  const today = new Date()
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('scores')
    .find({
      query: {
        type: 'Activity',
        $sort: {
          createdAt: -1,
        },
        $limit: 1,
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchSleepScores(action) {
  console.log("fetchSleepScores US");
  // // Get previous day based on given day
  const today = new Date()
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('scores')
    .find({
      query: {
        type: 'Sleep',
        $sort: {
          createdAt: -1,
        },
        $limit: 1,
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchBalanceScores(action) {
  console.log("fetchBalanceScore US");
  // // Get previous day based on given day
  const date = action.date
  const today = new Date(date)
  var previousDay = today.setDate(today.getDate() - 1)
  var nextDay = today.setDate(today.getDate() + 2)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('balances')
    .find({
      query: {
        type: 'Balance',
        $sort: {
          createdAt: -1,
        },
        $limit: 1,
        day: dayQuery,
      },
    })
    .then((response) => {
      return response.data
    })
}

function fetchOverall() {
  console.log("fetcOverall US")
  // // Get previous day based on given day
  // const date = action.date
  const today = new Date()
  var previousDay = today.setDate(today.getDate() - 60)
  var nextDay = today.setDate(today.getDate() + 61)
  nextDay = new Date(nextDay)
  previousDay = new Date(previousDay)
  const startOfNextDay = new Date(
    nextDay.getFullYear(),
    nextDay.getMonth(),
    nextDay.getDate(),
    0,
    0,
    0
  )
  var endOfPreviousDay = new Date(
    previousDay.getFullYear(),
    previousDay.getMonth(),
    previousDay.getDate(),
    23,
    59,
    59
  )
  // get data where day is greater than `endOfPreviousDay` and less than `startOfNextDay`
  const dayQuery = {
    $gt: +endOfPreviousDay,
    $lt: +startOfNextDay,
  }

  return app
    .service('dailies')
    .find({
      query: {
        type: 'Balance',
        $sort: {
          createdAt: -1,
        },
        // $limit: 1,
        day: dayQuery,
      },
    })
    .then((response) => {
      console.log(response)
      return response.data
    })
}

export const userService = {
  _authenticate,
  authenticate,
  createActivity,
  createMindfulness,
  createMood,
  createSleep,
  createUser,
  createVideo,
  fetchActivities,
  fetchMindfulnesses,
  fetchActivityGraph,
  fetchActivityScores,
  fetchActivityWeekGraph,
  fetchAverage,
  socket,
  fetchBalanceScores,
  fetchMonth,
  addBirthdate,
  fetchMoodGraph,
  fetchMoods,
  fetchMoodScores,
  fetchMoodWeekGraph,
  fetchMindfulnessWeekGraph,
  fetchOverall,
  fetchSleepGraph,
  fetchSleeps,
  fetchSleepScores,
  fetchSleepWeek,
  fetchTriangle,
  fetchUser,
  loginUser,
  loginTrialUser,
  updateToken,
  fetchMindfulnessesAgenda,
  fetchMoodsAgenda,
  fetchSleepsAgenda,
  fetchActivitiesAgenda,
}
