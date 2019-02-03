import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { actions as searchActions, reducer as search } from './search'

export const rootEpic = combineEpics()

export const rootReducer = combineReducers({
  router,
  search
})

export const actions = {
  ...searchActions,
  INIT: 'INIT'
}
