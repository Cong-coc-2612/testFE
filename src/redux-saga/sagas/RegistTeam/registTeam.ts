import { call, put, takeLatest } from 'redux-saga/effects';
import { IParams, IRequest, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, REGIST_TEAM } from 'redux-saga/actions';
import { query, METHOD } from 'utils/socketApi';

const registTeam = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'team/registerTeam';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doRegistTeam(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(registTeam, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: COMMON_SHOW_NOTIFICATION,
        data: {
          type: 'success',
          title: 'Sign Up',
          content: 'Đăng ký tham gia thành công',
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
        title: 'RegistTeam',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchRegistTeam() {
  yield takeLatest(REGIST_TEAM, doRegistTeam);
}
