import { AnyAction } from "redux";
import * as toast from 'react-toastify';

export type TypeAny =
  | undefined
  | Function
  | null
  | string
  | number
  | FormData
  | boolean
  | string[]
  | number[]
  | FileList
  | Date
  | FormData
  | INotification
  | INotification[]
  | IParams
  | IParams[];

export interface IParams {
  [s: string]: TypeAny;
}

export interface IBigRequest {
  path: string | number;
  param: IParams;
  data: IParams;
}

export interface IRequest<T> extends AnyAction {
  response: IResponseType;
  data: T;
}

export interface IResponseType {
  success: string;
  failed: string;
}

export interface INotification {
  type: toast.TypeOptions;
  title: string;
  content: string | React.ReactNode;
  contentParams?: { [s: string]: TypeAny };
  time: Date;
  option?: toast.ToastOptions;
  ignore?: boolean;
  showNotification?: boolean;
}

export interface IAction<T> {
  type: string;
  payload: T;
  data?: T;
}

export interface IResponse<T> {
  data: T;
  status?: IParams;
}