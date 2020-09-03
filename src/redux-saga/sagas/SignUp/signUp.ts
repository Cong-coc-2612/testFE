import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { cookies } from 'utils/cookies';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COOKIES_TYPE } from 'global';
import { SIGNUP, COMMON_SHOW_NOTIFICATION } from 'redux-saga/actions';

const signUp = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'user';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doSignUp(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(signUp, request.data.data, request.data.path, request.data.param);
    const data = response.data;
    if (cookies.get(COOKIES_TYPE.AUTH_TOKEN) == null) {
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
            content: 'Chúng tôi đã gửi cho bạn email, hãy bấm vào đường link chúng tôi gửi để kích hoạt tài khoản',
            time: new Date(),
          },
        });
      }
    } else {
      yield put({
        type: COMMON_SHOW_NOTIFICATION,
        data: {
          type: 'error',
          title: 'Sign Up',
          content: 'Đã xảy ra lỗi, vui lòng tải lại trang',
          time: new Date(),
        },
      });
    }
  } catch (error) {
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'Sign Up',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchSignUp() {
  yield takeLatest(SIGNUP, doSignUp);
}
