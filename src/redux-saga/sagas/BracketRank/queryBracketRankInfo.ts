import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { GET_BRACKET_RANK_INFO } from 'redux-saga/actions';

const queryBracketRankInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'schedule';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQueryBracketRankInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryBracketRankInfo, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: {
          finalStageScheduleRanking: data.Schedule.finalStageSchedule.rankingTable,
        },
      });
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: request.response.failed,
    });
  }
}

export default function* watchQueryBracketRankInfo() {
  yield takeLatest(GET_BRACKET_RANK_INFO, doQueryBracketRankInfo);
}
