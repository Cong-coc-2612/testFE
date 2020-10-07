import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { SWAP_TEAM_IN_BRACKET_RANK, COMMON_SHOW_NOTIFICATION, GET_BRACKET_RANK_INFO } from 'redux-saga/actions';
import { GET_BRACKET_RANK_INFO_FAILED, GET_BRACKET_RANK_INFO_SUCCESS } from 'components/BracketRank/reducers';
import store from 'redux-saga/store';


const swapTeamInBracketRank = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'schedule/swapTwoTeamInRankingTable';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doSwapTeamInBracketRank(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(swapTeamInBracketRank, request.data.data, request.data.path, request.data.param);
    if (response.data.error.MessageCode === 0) {
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
      yield put({
        type: request.response.success,
        payload: !store.getState().swappedTeamInBracketRank,
      });
      yield put({
        type: COMMON_SHOW_NOTIFICATION,
        data: {
          type: 'success',
          title: 'Sign Up',
          content: 'Đổi chỗ bảng xếp hạng thành công',
          time: new Date(),
        },
      });
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: request.response.failed,
      payload: !store.getState().swappedTeamInBracketRank,
    });
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'SwapTeamInBracketRank',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchSwapTeamInBracketRank() {
  yield takeLatest(SWAP_TEAM_IN_BRACKET_RANK, doSwapTeamInBracketRank);
}
