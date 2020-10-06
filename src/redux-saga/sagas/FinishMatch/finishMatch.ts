import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { GET_BRACKET_BOARD_INFO_SUCCESS } from 'components/BracketBoard/reducers';
import { COMMON_SHOW_NOTIFICATION, FINISH_MATCH, GET_BRACKET_BOARD_INFO } from 'redux-saga/actions';


const finishMatch = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'match/finish';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doFinishMatch(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(finishMatch, request.data.data, request.data.path, request.data.param);
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
          failed: GET_BRACKET_BOARD_INFO_SUCCESS,
        },
        data: {
          path: '',
          param: {
            tournamentId: request.data.data.tournamentId,
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
        title: 'FinishMatch',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchFinishMatch() {
  yield takeLatest(FINISH_MATCH, doFinishMatch);
}
