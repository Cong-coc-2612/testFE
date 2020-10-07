import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { CHANGE_NOTE_BRACKET_RANK, GET_BRACKET_RANK_INFO } from 'redux-saga/actions';
import { GET_BRACKET_RANK_INFO_FAILED, GET_BRACKET_RANK_INFO_SUCCESS } from 'components/BracketRank/reducers';

const changeNoteBracketRank = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'schedule/updateNote';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doChangeNoteBracketRank(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(changeNoteBracketRank, request.data.data, request.data.path, request.data.param);
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
      });
      yield put({
        type: GET_BRACKET_RANK_INFO,
        response: {
          success: GET_BRACKET_RANK_INFO_SUCCESS,
          failed: GET_BRACKET_RANK_INFO_FAILED,
        },
        data: {
          path: '',
          param: {
            tournamentId: request.data.param.tournamentId,
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
  }
}

export default function* watchChangeNoteBracketRank() {
  yield takeLatest(CHANGE_NOTE_BRACKET_RANK, doChangeNoteBracketRank);
}
