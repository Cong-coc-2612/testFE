import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { GET_BRACKET_BOARD_INFO_SUCCESS, GET_BRACKET_BOARD_INFO_FAILED } from 'components/BracketBoard/reducers';
import { COMMON_SHOW_NOTIFICATION, UPDATE_MATCH_INFO_BEFORE_START, GET_BRACKET_BOARD_INFO } from 'redux-saga/actions';


const updateMatchInfoBeforeStart = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'schedule/changeMatchInfo';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doUpdateMatchInfoBeforeStart(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(updateMatchInfoBeforeStart, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: GET_BRACKET_BOARD_INFO,
        response: {
          success: GET_BRACKET_BOARD_INFO_SUCCESS,
          failed: GET_BRACKET_BOARD_INFO_FAILED,
        },
        data: {
          path: '',
          param: {
            competitionId: request.data.param.competitionId,
          },
          data: {},
        },
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
        title: 'UpdateMatchInfoBeforeStart',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchUpdateMatchInfoBeforeStart() {
  yield takeLatest(UPDATE_MATCH_INFO_BEFORE_START, doUpdateMatchInfoBeforeStart);
}
