import './SearchResults.css'
import 'react-table/react-table.css'
import { Card, Icon } from 'semantic-ui-react'
import * as React from 'react'
import Table from 'react-table'
import { Store } from 'interfaces'
import { requestData } from 'src/util/table'
import * as common from 'common'
const debounce = require('lodash/debounce')

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export type SearchResultsState = {
  data: any[]
  error: string | null
  loading: boolean
  pages: number
  showInputPanel: boolean
}
// https://raw.githubusercontent.com/denoland/registry/master/src/database.json

export class SearchResults extends React.PureComponent<Props, SearchResultsState> {
  constructor (props: Store.All) {
    super(props as any)
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
        columnTypeMappingByColumnName: common.columns.packages.columnsByName
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
    const { data, loading, pages } = this.state
    return (
      <Table
        {...this.props as any}
        defaultSorted={[
          {
            id: 'name',
            asc: true
          }
        ]}
        columns={[
          {
            accessor: 'name',
            Header: 'Package',
            Cell: ({ original }) => {
              const field: denolandiaQL.IPackage = original || {}
              return (
                <Card key={field.name} fluid>
                  <Card.Content>
                    <Card.Header content={field.name} style={{ display: 'inline-block' }} />
                    <Card.Meta
                      as='a'
                      href={field.repositoryUrl}
                      target='_blank'
                      rel='noreferrer noopener'
                      content={field.repositoryUrl}
                      style={{ display: 'inline-block', marginLeft: '10px' }}
                    />
                    <span style={{ float: 'right' }}>
                      {field.stargazerCount}
                      {' ⭐️'}
                      {field.issueCount}
                      {' 💣'}
                    </span>
                    {field.descriptionHtml && (
                      <Card.Description>
                        <div dangerouslySetInnerHTML={{ __html: field.descriptionHtml }} />
                      </Card.Description>
                    )}
                    {field.homepageUrl && (
                      <React.Fragment>
                        <Icon name='home' size='small' />
                        <Card.Meta
                          as='a'
                          href={field.homepageUrl}
                          target='_blank'
                          rel='noreferrer noopener'
                          content={field.homepageUrl}
                        />
                      </React.Fragment>
                    )}
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
      />
    )
  }
}
