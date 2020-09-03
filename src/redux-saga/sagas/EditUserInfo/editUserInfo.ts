import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, EDIT_USER_INFO } from 'redux-saga/actions';
import { QUERY_USER_INFO_SUCCESS } from 'screens/UserInfo/reducers';
import { LOGIN_SUCCESS } from 'screens/Login/reducers';
import store from 'redux-saga/store';


const editUserInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'user';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doEditUserInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(editUserInfo, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
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
      type: request.response.failed,
    });
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'EditUserInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchEditUserInfo() {
  yield takeLatest(EDIT_USER_INFO, doEditUserInfo);
}
