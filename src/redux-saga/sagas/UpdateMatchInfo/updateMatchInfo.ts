import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_MATCH_INFO_SUCCESS } from 'components/BracketMatch/reducers';
import { QUERY_ALL_MATCHES_SUCCESS, QUERY_ALL_MATCHES_FAILED } from 'components/BracketBoard/reducers';
import { COMMON_SHOW_NOTIFICATION, UPDATE_MATCH_INFO, QUERY_ALL_MATCHES } from 'redux-saga/actions';


const updateMatchInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'match';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doUpdateMatchInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(updateMatchInfo, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: QUERY_MATCH_INFO_SUCCESS,
        payload: data.Match,
      });
      yield put({
        type: QUERY_ALL_MATCHES,
        response: {
          success: QUERY_ALL_MATCHES_SUCCESS,
          failed: QUERY_ALL_MATCHES_FAILED,
        },
        data: {
          path: '',
          param: {
            competitionId: request.data.data.competitionId,
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
        title: 'UpdateMatchInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchUpdateMatchInfo() {
  yield takeLatest(UPDATE_MATCH_INFO, doUpdateMatchInfo);
}
