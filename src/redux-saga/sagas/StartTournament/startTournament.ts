import { call, put, takeLatest } from 'redux-saga/effects';
import { IParams, IRequest, IBigRequest } from 'interfaces/common';
import store from 'redux-saga/store';
import { COMMON_SHOW_NOTIFICATION, START_TOURNAMENT } from 'redux-saga/actions';
import { QUERY_TOURNAMENT_INFO_SUCCESS } from 'screens/TournamentInfo/reducers';
import { query, METHOD } from 'utils/socketApi';

const startTournament = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'tournament/start';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doStartTournament(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(startTournament, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: QUERY_TOURNAMENT_INFO_SUCCESS,
        payload: { ...store.getState().tournamentInfo, Tournament: data.Tournament },
      });
      yield put({
        type: COMMON_SHOW_NOTIFICATION,
        data: {
          type: 'success',
          title: 'Sign Up',
          content: 'Bắt đầu giải thành công',
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
        title: 'StartTournament',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchStartTournament() {
  yield takeLatest(START_TOURNAMENT, doStartTournament);
}
