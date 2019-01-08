import { actions, history, store } from './state'
import { App } from './components/App'
import { ConnectedRouter } from 'react-router-redux'
import { Provider, connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
require('./index.css')
require('semantic-ui-css/semantic.css')

const ConnectedApp: React.ComponentClass<any> = connect(state => ({
  actions,
  ...state
}))(App as any)

const RoutedConnectedApp = withRouter(ConnectedApp as any)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RoutedConnectedApp />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
