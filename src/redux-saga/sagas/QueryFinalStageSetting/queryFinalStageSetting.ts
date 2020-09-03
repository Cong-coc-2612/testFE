import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_FINAL_STAGE_SETTING } from 'redux-saga/actions';


const queryFinalStageSetting = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'finalStageSetting/getByCompetitionId';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQueryFinalStageSetting(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryFinalStageSetting, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.FinalStageSetting,
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
        title: 'QueryFinalStageSetting',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryFinalStageSetting() {
  yield takeLatest(QUERY_FINAL_STAGE_SETTING, doQueryFinalStageSetting);
}
