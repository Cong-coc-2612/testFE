import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, CREATE_A_GROUP_STAGE_SETTING } from 'redux-saga/actions';

const createAGroupStageSetting = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'groupStageSetting';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doCreateAGroupStageSetting(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(createAGroupStageSetting, request.data.data, request.data.path, request.data.param);
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
        title: 'CreateAGroupStageSetting',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchCreateAGroupStageSetting() {
  yield takeLatest(CREATE_A_GROUP_STAGE_SETTING, doCreateAGroupStageSetting);
}
