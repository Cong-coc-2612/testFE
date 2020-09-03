import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { SEARCH_USER, COMMON_SHOW_NOTIFICATION } from 'redux-saga/actions';


const searchUsers = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'users/getBySearchString';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doSearchUsers(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(searchUsers, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: { Users: data.Users, TotalPage: data.TotalPage },
      });
    }
  } catch (error) {
    yield put({
      type: request.response.failed,
    });
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'SearchUsers',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchSearchUsers() {
  yield takeLatest(SEARCH_USER, doSearchUsers);
}
