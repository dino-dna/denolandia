import { actions } from 'src/state'
import { Dispatch } from 'redux'
import { Epic } from 'redux-observable'
import { FluxStandardAction as FSA, FluxStandardAction } from 'flux-standard-action'
import { rootReducer } from 'src/state/ducks'
import { RouterState } from 'react-router-redux'
import { TableProps } from 'react-table'
import * as React from "react"

export namespace Store {
  export type denolandiaEpicMiddleware = Epic<FluxStandardAction<any, any>, FluxStandardAction<any, any>, All, any>

  export type denolandiaFSA<T> = FSA<T, any>
  export type IFSA = FSA<any, any>

  export interface IDispatcher {
    dispatch: (action: IFSA|any) => void // todo: fixme properly
    actions: typeof actions
  }

  export interface IAuth {
    accessToken: string
    expiresAt: number
    idToken: string
    isPremium: boolean,
    roles: [],
    isAuthenticated: boolean
  }

  export interface INotifications {
    notifications: Notification[]
  }


  export type StateType<ReducerOrMap> = ReducerOrMap extends (
    ...args: any[]
    ) => any
    ? ReturnType<ReducerOrMap>
    : ReducerOrMap extends object
      ? { [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]> }
      : never;

  export interface All extends StateType<typeof rootReducer> {
    appName: string
    isDev: boolean
  }

  export interface AllDispatcher extends All, IDispatcher {}

  export interface IdenolandiaLogout {
    username: string
    onLogoutClick?: () => void
  }
}
