import { actions, rootEpic, rootReducer } from './ducks'
import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { HACKS } from '../util/hacks'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const epicMiddleware = createEpicMiddleware()
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(createLogger({ collapsed: true }), epicMiddleware, routerMiddleware(history)))
)

epicMiddleware.run(rootEpic as any)
HACKS.store = store

export { actions }
