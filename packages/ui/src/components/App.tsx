import './App.css'
import { Header, Image, Input } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import { SearchResults } from './SearchResults'
import { Store } from 'interfaces'
import * as React from 'react'

export class App extends React.PureComponent<Store.All & Store.IDispatcher, any> {
  render () {
    return (
      <div className='app app--dashboard'>
        <Header.Content className='titlebar' as='h1'>
          denolandia
        </Header.Content>
        <div className='search'>
          <Image className='search__image' src='img/deno_logo.png' width='100%' />
          <Input className='search__input' type='text' placeholder='Seach for packages' fluid size='massive' />
        </div>
        <Switch>
          <Route exact path='/' render={routeProps => <SearchResults className='page__primary' />} />
        </Switch>
      </div>
    )
  }
}
