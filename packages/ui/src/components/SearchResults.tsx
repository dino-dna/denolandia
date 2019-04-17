import './SearchResults.css'
import 'react-table/react-table.css'
const debounce = require('lodash/debounce')
import { Card, Icon, Label, Portal, PortalProps } from 'semantic-ui-react'
import { requestData } from 'src/util/table'
import * as common from 'common'
import * as React from 'react'
import cx from 'classnames'
import Table, { FinalState } from 'react-table'
import { memoize } from 'lodash'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  moduleQueryString: string
}
export type SearchResultsState = {
  data: any[]
  error: string | null
  loading: boolean
  pages: number
  showInputPanel: boolean
}
// https://raw.githubusercontent.com/denoland/registry/master/src/database.json

const getFiltered = memoize(queryString => [{ id: 'name', value: queryString }])
export class SearchResults extends React.PureComponent<Props, SearchResultsState> {
  public offsiteHeaders: React.RefObject<HTMLDivElement>

  constructor (props: Props) {
    super(props as any)
    this.offsiteHeaders = React.createRef()
    this.state = {
      data: [],
      error: null,
      loading: true,
      pages: 0,
      showInputPanel: true
    }
  }

  fetchData = debounce(async (state: any, instance: any) => {
    this.setState({ loading: true })
    try {
      const { rows, pages } = await requestData({
        pageSize: state.pageSize,
        page: state.page,
        sorted: state.sorted,
        filtered: state.filtered,
        columnTypeMappingByColumnName: common.columns.modules.columnsByName
      })
      this.setState({
        data: rows,
        pages: pages!,
        loading: false
      })
    } catch (err) {
      this.setState({
        data: [],
        pages: 0,
        loading: false,
        error: err.message
      })
    }
  }, 500)

  render () {
    const { className, moduleQueryString, ...rest } = this.props
    const { state: { data, loading, pages } } = this
    let tableState: FinalState<denolandiaQL.IModule>
    return (
      <Table
        defaultSorted={[
          {
            id: 'name',
            asc: true
          }
        ]}
        columns={[
          {
            accessor: 'name',
            Header: (props: any) => {
              const mountProps: Partial<PortalProps> = {}
              if (this.offsiteHeaders.current) {
                mountProps.mountNode = this.offsiteHeaders.current
              }
              const nameSorter = tableState.sorted && tableState.sorted.find(sorter => sorter.id === 'name')
              const sortIcon = !nameSorter ? 'sort' : nameSorter.desc ? 'sort down' : 'sort up'
              return (
                <Portal open trigger={<span>Module trigger</span>} {...mountProps}>
                  <Label icon={sortIcon} content={'Modules'} style={{ float: 'right', cursor: 'pointer' }} />
                </Portal>
              )
            },
            Cell: ({ original }) => {
              const field: denolandiaQL.IModule = original || {}
              return (
                <Card key={field.name} fluid style={{ padding: '0 20px' }}>
                  <Card.Content style={{ overflowX: 'hidden', padding: '1em 0' }}>
                    <Card.Header content={field.name} style={{ display: 'inline-block' }} />
                    <Card.Meta
                      as='a'
                      href={field.repositoryUrl}
                      target='_blank'
                      rel='noreferrer noopener'
                      content={field.repositoryUrl}
                      style={{ display: 'inline-block', marginLeft: '10px' }}
                    />
                    <span className='search_result-tags'>
                      <Label basic color='blue' size='small'>
                        <Icon aria-label='license' name='balance' />
                        {field.licenseSpdxId}
                      </Label>
                      <Label
                        basic
                        color='yellow'
                        size='small'
                        as='a'
                        target='_blank'
                        href={field.repositoryUrl + '/stargazers'}
                      >
                        <Icon aria-label='stars' name='star' />
                        {field.stargazerCount}
                      </Label>
                      <Label
                        basic
                        color={field.issueCount === 0 ? 'grey' : 'orange'}
                        size='small'
                        as='a'
                        target='_blank'
                        href={field.repositoryUrl + '/issues'}
                      >
                        <Icon aria-label='open issues' name='bug' />
                        {field.issueCount}
                      </Label>
                    </span>
                    {field.descriptionHtml && (
                      <Card.Description>
                        <div dangerouslySetInnerHTML={{ __html: field.descriptionHtml }} />
                      </Card.Description>
                    )}
                    <React.Fragment>
                      <Icon name='home' size='small' />
                      {field.homepageUrl ? (
                        <Card.Meta
                          className='search-results-homepage'
                          as='a'
                          href={field.homepageUrl}
                          target='_blank'
                          rel='noreferrer noopener'
                          content={field.homepageUrl}
                        />
                      ) : (
                        <Card.Meta
                          className='search-results-homepage --missing'
                          as='span'
                          content={<small>No homepage URL</small>}
                        />
                      )}
                    </React.Fragment>
                  </Card.Content>
                </Card>
              )
            }
          }
        ]}
        data={data}
        defaultPageSize={10}
        filterable
        loading={loading}
        manual
        multiSort
        onFetchData={this.fetchData}
        pages={pages!}
        filtered={getFiltered(moduleQueryString)}
      >
        {(state, makeTable, instance) => {
          tableState = state
          return (
            <div className={cx(className, 'search_results_table')} {...rest}>
              <div ref={this.offsiteHeaders} style={{ padding: 2 }} />
              {makeTable()}
            </div>
          )
        }}
      </Table>
    )
  }
}
