import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import 'whatwg-fetch';
import { IParams, IRequest, IBigRequest, IResponse } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, USER_UPDATE_AVATAR } from 'redux-saga/actions';
import { QUERY_USER_INFO_SUCCESS } from 'screens/UserInfo/reducers';
import { LOGIN_SUCCESS } from 'screens/Login/reducers';
import store from 'redux-saga/store';
import config from 'config';

const uploadFile = (data: IParams, path: string | number, param: IParams) => {
  if (param.file != null) {
    const file: File = (param.file as unknown as IParams[])[0] as unknown as File;
    const form = new FormData();
    form.append('file', file);
    // return query(uri, METHOD.POST, undefined, undefined, paths, form);
    return new Promise<IResponse<IParams>>((resolve: Function, reject: Function) => {
      axios.post(`${config.apiUrl.baseURI}user/uploadAvatar`,
        form,
        {
          params: { id: param.id },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        console.log('SUCCESS!!', response);
        resolve(response);
      })
        .catch((error) => {
          console.log('FAILED!!', error);
          reject(error);
        });
    });
  } else {
    return null;
  }
};

function* doUpdateAvatar(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(uploadFile, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.User,
      });
      yield put({
        type: QUERY_USER_INFO_SUCCESS,
        payload: { ...store.getState().userInfo, User: data.User },
      });
      if (store.getState().currentUserInfo != null && store.getState().currentUserInfo!.id === data.User.id) {
        yield put({
          type: LOGIN_SUCCESS,
          payload: data.User,
        });
      }
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'Update Background',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchUpdateAvatar() {
  yield takeLatest(USER_UPDATE_AVATAR, doUpdateAvatar);
}
