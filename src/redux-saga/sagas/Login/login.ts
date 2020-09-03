import { call, takeLatest, put } from 'redux-saga/effects';
import { cookies } from 'utils/cookies';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { LOGIN, COMMON_SHOW_NOTIFICATION } from 'redux-saga/actions';
import { LOGIN_FAILED } from 'screens/Login/reducers';
import { COOKIES_TYPE } from 'global';
import history from "utils/history";


const login = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'login';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doLogin(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(login, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (cookies.get(COOKIES_TYPE.AUTH_TOKEN) == null) {
      if (response.data.error.MessageCode === 0) {
        yield put({
          type: request.response.success,
          payload: data.User,
        });
        yield cookies.set(COOKIES_TYPE.AUTH_TOKEN, data, { path: '/' });
        yield history.push("/");
      } else if (response.data.error.Message === 'User is not active') {
        throw new Error('Tài khoản này chưa được kích hoạt, xin hãy vào email của bạn để kích hoạt tài khoản. Nếu không thể kích hoạt, bấm VÀO ĐÂY để gửi lại mã');
      } else {
        yield cookies.remove(COOKIES_TYPE.AUTH_TOKEN);
        yield put({
          type: LOGIN_FAILED,
        });
        throw new Error(response.data.error.Message);
      }
    } else {
      yield put({
        type: COMMON_SHOW_NOTIFICATION,
        data: {
          type: 'error',
          title: 'Login',
          content: 'Đã xảy ra lỗi, vui lòng tải lại trang',
          time: new Date(),
        },
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
        title: 'Login',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN, doLogin);
}
