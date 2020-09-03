import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { CHECK_EMAIL_EXISTED } from 'redux-saga/actions';


const isEmailExisted = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'user/getByEmail';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doIsEmailExisted(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(isEmailExisted, request.data.data, request.data.path, request.data.param);
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

export default function* watchIsEmailExisted() {
  yield takeLatest(CHECK_EMAIL_EXISTED, doIsEmailExisted);
}
