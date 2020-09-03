import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_FINAL_STAGE_SETTING_SUCCESS } from 'screens/CompetitionInfo/reducers';
import { COMMON_SHOW_NOTIFICATION, EDIT_FINAL_STAGE_SETTING } from 'redux-saga/actions';


const editFinalStageSetting = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'finalStageSetting';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doEditFinalStageSetting(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(editFinalStageSetting, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: QUERY_FINAL_STAGE_SETTING_SUCCESS,
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
        title: 'EditFinalStageSetting',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchEditFinalStageSetting() {
  yield takeLatest(EDIT_FINAL_STAGE_SETTING, doEditFinalStageSetting);
}
