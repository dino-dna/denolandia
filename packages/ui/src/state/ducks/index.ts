import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

export const rootEpic = combineEpics()

export const rootReducer = combineReducers({
  router
})

export const actions = {
  INIT: 'INIT'
}
