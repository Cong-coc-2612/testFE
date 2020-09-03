import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_GROUP_STAGE_SETTING_SUCCESS } from 'screens/CompetitionInfo/reducers';
import { COMMON_SHOW_NOTIFICATION, EDIT_GROUP_STAGE_SETTING } from 'redux-saga/actions';


const editGroupStageSetting = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'groupStageSetting';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doEditGroupStageSetting(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(editGroupStageSetting, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: QUERY_GROUP_STAGE_SETTING_SUCCESS,
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
        title: 'EditGroupStageSetting',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchEditGroupStageSetting() {
  yield takeLatest(EDIT_GROUP_STAGE_SETTING, doEditGroupStageSetting);
}
