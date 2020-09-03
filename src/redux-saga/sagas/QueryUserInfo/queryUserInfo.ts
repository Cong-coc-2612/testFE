import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_USER_INFO } from 'redux-saga/actions';


const queryUserInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'user';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQueryUserInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryUserInfo, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: { User: data.User, Config: response.data.config.Global },
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
        title: 'QueryUserInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryUserInfo() {
  yield takeLatest(QUERY_USER_INFO, doQueryUserInfo);
}
