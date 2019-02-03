import { Reducer } from 'redux'

export interface SearchState {
  queryString: string
}

const INTIAL_STATE: SearchState = {
  queryString: ''
}

export const actions = {
  CHANGE_PRIMARY_SEARCH_QUERY: 'CHANGE_PRIMARY_SEARCH_QUERY'
}
export const reducer: Reducer<SearchState, { type: keyof (typeof actions); payload: any }> = (
  state = INTIAL_STATE,
  action
) => {
  switch (action.type) {
    case 'CHANGE_PRIMARY_SEARCH_QUERY':
      return { ...state, queryString: action.payload }
  }
  return state
}
