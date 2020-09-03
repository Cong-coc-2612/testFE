import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_COMPETITIONS_BY_SPORT_AND_TOURNAMENT } from 'redux-saga/actions';


const queryCompetitionsBySportAndTournament = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'competitions/getByTournamentIdAndSportId';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQueryCompetitionsBySportAndTournament(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryCompetitionsBySportAndTournament, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.Competitions,
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
        title: 'QueryCompetitionsBySportAndTournament',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryCompetitionsBySportAndTournament() {
  yield takeLatest(QUERY_COMPETITIONS_BY_SPORT_AND_TOURNAMENT, doQueryCompetitionsBySportAndTournament);
}
