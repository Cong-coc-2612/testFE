import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_LIST_USER_SUCCESS } from 'components/AllUsers/reducers';
import { COMMON_SHOW_NOTIFICATION, SET_ADMIN } from 'redux-saga/actions';
import store from 'redux-saga/store';


const setAdmin = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'admin/changeAccountRole';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doSetAdmin(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(setAdmin, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.User,
      });
      if (store.getState().listUsers != null && (store.getState().listUsers!.Users as IParams[]).findIndex(element => element.id === data.User.id) !== -1) {
        let tempList = (store.getState().listUsers!.Users as IParams[]).slice(0).filter(element => element.id !== data.User.id);
        yield put({
          type: QUERY_LIST_USER_SUCCESS,
          payload: { ...store.getState().listUsers, Users: tempList, },
        });
      }
      yield put({
        type: COMMON_SHOW_NOTIFICATION,
        data: {
          type: 'success',
          title: 'Sign Up',
          content: 'Đặt làm quản trị viên thành công',
          time: new Date(),
        },
      });
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
        title: 'SetAdmin',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchSetAdmin() {
  yield takeLatest(SET_ADMIN, doSetAdmin);
}
