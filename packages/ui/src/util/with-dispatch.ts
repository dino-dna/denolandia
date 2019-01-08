import { Store } from 'interfaces'

export function withDispatch (props: Store.IDispatcher) {
  return {
    actions: props.actions,
    dispatch: props.dispatch
  }
}
