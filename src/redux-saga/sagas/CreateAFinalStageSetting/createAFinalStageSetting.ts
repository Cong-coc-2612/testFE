import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, CREATE_A_FINAL_STAGE_SETTING } from 'redux-saga/actions';

const createAFinalStageSetting = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'finalStageSetting';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doCreateAFinalStageSetting(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(createAFinalStageSetting, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'CreateAFinalStageSetting',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchCreateAFinalStageSetting() {
  yield takeLatest(CREATE_A_FINAL_STAGE_SETTING, doCreateAFinalStageSetting);
}
