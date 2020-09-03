import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_LIST_TOURNAMENT_SUCCESS } from 'components/AllTournaments/reducers';
import { COMMON_SHOW_NOTIFICATION, CONTINUE_TOURNAMENT } from 'redux-saga/actions';
import store from 'redux-saga/store';


const continueTournament = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'admin/continueTournament';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doContinueTournament(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(continueTournament, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      if (store.getState().listTournament != null && (store.getState().listTournament!.Tournaments as IParams[]).findIndex(element => (element.Tournament as IParams).id === data.Tournament.id) !== -1) {
        let tempList = (store.getState().listTournament!.Tournaments as IParams[]).slice(0);
        tempList[(store.getState().listTournament!.Tournaments as IParams[]).findIndex(element => (element.Tournament as IParams).id === data.Tournament.id)].Tournament = data.Tournament;
        yield put({
          type: QUERY_LIST_TOURNAMENT_SUCCESS,
          payload: { ...store.getState().listTournament, Tournaments: tempList, },
        });
      }
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
        title: 'ContinueTournament',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchContinueTournament() {
  yield takeLatest(CONTINUE_TOURNAMENT, doContinueTournament);
}
