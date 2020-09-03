import { call, put, takeLatest } from 'redux-saga/effects';
import { IParams, IRequest, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, CLOSE_REGISTER_FORM } from 'redux-saga/actions';
import { QUERY_TOURNAMENT_INFO_SUCCESS } from 'screens/TournamentInfo/reducers';
import store from 'redux-saga/store';
import { query, METHOD } from 'utils/socketApi';

const closeRegisterForm = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'tournament/closeRegistration';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doCloseRegisterForm(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(closeRegisterForm, request.data.data, request.data.path, request.data.param);
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
          content: 'Đóng form đăng ký thành công',
          time: new Date(),
        },
      });
      yield put({
        type: QUERY_TOURNAMENT_INFO_SUCCESS,
        payload: { ...store.getState().tournamentInfo, Tournament: data.Tournament },
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
        title: 'CloseRegisterForm',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchCloseRegisterForm() {
  yield takeLatest(CLOSE_REGISTER_FORM, doCloseRegisterForm);
}
