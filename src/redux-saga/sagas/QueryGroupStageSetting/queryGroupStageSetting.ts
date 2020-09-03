import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_GROUP_STAGE_SETTING } from 'redux-saga/actions';


const queryGroupStageSetting = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'groupStageSetting/getByCompetitionId';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQueryGroupStageSetting(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryGroupStageSetting, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.GroupStageSetting,
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
        title: 'QueryGroupStageSetting',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryGroupStageSetting() {
  yield takeLatest(QUERY_GROUP_STAGE_SETTING, doQueryGroupStageSetting);
}
