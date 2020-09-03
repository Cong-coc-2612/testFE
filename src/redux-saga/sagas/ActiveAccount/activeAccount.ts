import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { ACTIVE_ACCOUNT } from 'redux-saga/actions';

const activeAccount = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'login/verify-authentication';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doActiveAccount(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(activeAccount, request.data.data, request.data.path, request.data.param);
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
      });
    }
  } catch (error) {
    yield put({
      type: request.response.failed,
    });
  }
}

export default function* watchActiveAccount() {
  yield takeLatest(ACTIVE_ACCOUNT, doActiveAccount);
}
