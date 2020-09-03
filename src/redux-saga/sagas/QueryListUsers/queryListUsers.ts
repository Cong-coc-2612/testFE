import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_LIST_USER } from 'redux-saga/actions';


const queryListUsers = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'users';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQueryListUsers(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryListUsers, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: { Users: data.Users, TotalPage: data.TotalPage },
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
        title: 'QueryListUsers',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryListUsers() {
  yield takeLatest(QUERY_LIST_USER, doQueryListUsers);
}
