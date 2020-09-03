import { takeLatest, put } from 'redux-saga/effects';
import { cookies } from 'utils/cookies';
import { LOGOUT } from 'redux-saga/actions';
import { COOKIES_TYPE } from 'global';
import history from "utils/history";
import { LOGIN_FAILED } from 'screens/Login/reducers';

function* doLogOut() {
  try {
    yield cookies.remove(COOKIES_TYPE.AUTH_TOKEN, { path: '/' });
    yield put({
      type: LOGIN_FAILED,
    });
    yield history.push("/login");
  } catch (error) {
  }
}

export default function* watchLogOut() {
  yield takeLatest(LOGOUT, doLogOut);
}
