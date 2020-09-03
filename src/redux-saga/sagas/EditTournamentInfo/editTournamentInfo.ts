import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, EDIT_TOURNAMENT_INFO } from 'redux-saga/actions';
import store from 'redux-saga/store';
import { QUERY_TOURNAMENT_INFO_SUCCESS } from 'screens/TournamentInfo/reducers';


const editTournamentInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'tournament';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doEditTournamentInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(editTournamentInfo, request.data.data, request.data.path, request.data.param);
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
        title: 'EditTournamentInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchEditTournamentInfo() {
  yield takeLatest(EDIT_TOURNAMENT_INFO, doEditTournamentInfo);
}
