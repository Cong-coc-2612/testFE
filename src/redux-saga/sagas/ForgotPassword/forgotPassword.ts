import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, FORGOT_PASSWORD } from 'redux-saga/actions';

const forgotPassword = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'user/forgotPassword';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doForgotPassword(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(forgotPassword, request.data.data, request.data.path, request.data.param);
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
          content: 'Chúng tôi đã gửi mật khẩu mới vào mail của bạn',
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
        title: 'Forgot Password',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD, doForgotPassword);
}
