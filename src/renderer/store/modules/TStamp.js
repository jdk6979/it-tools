import * as moment from 'moment'

const state = {
  tabs: [
    { title: 'Home', isActive: true },
    { title: 'Help', isActive: false }
  ],
  currentTab: 'Home',
  timestampField: '',
  datetimeField: '',
  unit: 1,
  datetimeResult: '',
  timestampResult: ''
}

const mutations = {
  SET_NAV (state, payload) {
    state.tabs.forEach((tabs, i) => {
      if (i === payload.index) {
        state.tabs[payload.index]['isActive'] = true
        state.currentTab = payload.title
      } else {
        state.tabs[i]['isActive'] = false
      }
    })
  },

  RESET_INPUT (state) {
    state.timestampField = ''
    state.datetimeField = ''
    state.datetimeResult = ''
    state.timestampResult = ''
  },

  SET_UNIT (state, value) {
    state.unit = value
  },

  TIMESTAMP_CONVERT (state, value) {
    if (value === '') {
      state.datetimeResult = ''
    } else {
      state.timestampField = value
      try {
        let timeStamp = state.timestampField
        if (typeof state.timestampField !== 'number') {
          timeStamp = Number(state.timestampField)
        }
        let result = moment.unix(timeStamp / state.unit).format('YYYY-MM-DD HH:mm:ss')
        state.datetimeResult = result
      } catch (err) {
        console.log(err.message)
        let result = 'Convert Error'
        state.datetimeResult = result
      }
    }
  },

  DATETIME_CONVERT (state, value) {
    if (value === '') {
      state.timestampResult = ''
    } else {
      state.datetimeField = value
      try {
        state.unit.toString() === '1000' ? state.timestampResult = moment(state.datetimeField).valueOf().toString() : state.timestampResult = moment(state.datetimeField).format('X')
      } catch (err) {
        console.log(err.message)
        let result = 'Convert Error'
        state.timestampResult = result
      }
    }
  }
}

const actions = {
  setNav ({ commit }, payload) {
    commit('SET_NAV', payload)
  },

  resetInput ({ commit }) {
    commit('RESET_INPUT')
  },

  setUnit ({ commit }, payload) {
    commit('SET_UNIT', payload.target.value)
  },

  timestampConvert ({ commit }, payload) {
    commit('TIMESTAMP_CONVERT', payload.target.value)
  },
  datetimeConvert ({ commit }, payload) {
    commit('DATETIME_CONVERT', payload.target.value)
  }
}

export default {
  state,
  mutations,
  actions
}
