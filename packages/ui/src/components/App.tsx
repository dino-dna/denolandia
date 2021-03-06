import './App.css'
import { Header, Image, Input } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import { SearchResults } from './SearchResults'
import { Store } from 'interfaces'
import * as React from 'react'

export class App extends React.PureComponent<Store.All & Store.IDispatcher, any> {
  render () {
    const { dispatch, actions } = this.props
    return (
      <div className='app app--dashboard'>
        <Header.Content className='titlebar' as='h1'>
          denolandia
        </Header.Content>
        <div className='search'>
          <div id='search__group'>
            <Image className='search__image' src='img/deno_logo.png' width='100%' />
            <Input
              className='search__input'
              onChange={evt =>
                dispatch({ type: actions.CHANGE_PRIMARY_SEARCH_QUERY, payload: evt.currentTarget.value })
              }
              type='text'
              placeholder='Seach for modules'
              fluid
              size='massive'
            />
          </div>
        </div>
        <Switch>
          <Route
            exact
            path='/'
            render={routeProps => (
              <SearchResults className='page__primary' moduleQueryString={this.props.search.queryString} />
            )}
          />
        </Switch>
      </div>
    )
  }
}
