import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_COMPETITION_INFO } from 'redux-saga/actions';


const queryCompetitionInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'competition';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQueryCompetitionInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryCompetitionInfo, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: { Competition: data.competition, Config: response.data.config.Global},
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
        title: 'QueryCompetitionInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryCompetitionInfo() {
  yield takeLatest(QUERY_COMPETITION_INFO, doQueryCompetitionInfo);
}
