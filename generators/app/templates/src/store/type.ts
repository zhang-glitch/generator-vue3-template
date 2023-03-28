import { IAppStateType } from './modules/app/type'
import { IMainStateType } from './modules/main/type'

export interface IRootState {
  global: any
}

export interface IModuleState {
  app: IAppStateType
  main: IMainStateType
}

export type IStoreType = IRootState & IModuleState
