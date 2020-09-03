import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { CHECK_USERNAME_EXISTED } from 'redux-saga/actions';


const isUsernameExisted = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'user/getByUsername';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doIsUsernameExisted(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(isUsernameExisted, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (data.User) {
      yield put({
        type: request.response.success,
        payload: true,
      });
    } else {
      yield put({
        type: request.response.success,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: request.response.failed,
    });
  }
}

export default function* watchIsUsernameExisted() {
  yield takeLatest(CHECK_USERNAME_EXISTED, doIsUsernameExisted);
}
