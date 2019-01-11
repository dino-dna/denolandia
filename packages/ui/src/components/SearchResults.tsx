import './SearchResults.css'
import 'react-table/react-table.css'
import { Card, Icon, Label, Portal, PortalProps } from 'semantic-ui-react'
import * as React from 'react'
import Table from 'react-table'
import { Store } from 'interfaces'
import { requestData } from 'src/util/table'
import * as common from 'common'
import cx from 'classnames'
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
  public offsiteHeaders: React.RefObject<HTMLDivElement>
  constructor (props: Store.All) {
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
    const { className, ...rest } = this.props
    const { data, loading, pages } = this.state
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
              return (
                <Portal open trigger={<span>Package trigger</span>} {...mountProps}>
                  <Label icon='sort' content={'Package'} style={{ float: 'right' }} />
                </Portal>
              )
            },
            Cell: ({ original }) => {
              const field: denolandiaQL.IPackage = original || {}
              return (
                <Card key={field.name} fluid style={{ padding: '0 20px' }}>
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
                      <Label
                        basic
                        color={field.licenseSpdxId === 'MIT' ? null : 'blue'}
                        size='small'
                        horizontal
                      >
                        <Icon aria-label='license' name='balance' />
                        {field.licenseSpdxId}
                      </Label>
                      <Label
                        basic
                        color='yellow'
                        size='small'
                        horizontal
                        as='a'
                        href={field.repositoryURL + '/stargazers'}
                      >
                        <Icon aria-label='stars' name='star' />
                        {field.stargazerCount}
                      </Label>
                      <Label
                        basic
                        color={field.issueCount === 0 ? null : 'orange'}
                        size='small'
                        horizontal
                        as='a'
                        href={field.repositoryURL + '/issues'}
                      >
                        <Icon aria-label='open issues' name='bug'>
                        {field.issueCount}
                      </Label>
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
      >
        {(state, makeTable, instance) => {
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
