import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_LIST_TEAM_SUCCESS, QUERY_LIST_TEAM_FAILED } from 'components/Teams/reducers';
import { SWAP_TWO_TEAM_IN_BRACKET, COMMON_SHOW_NOTIFICATION, DELETE_LIST_SELECTING_TEAM, QUERY_LIST_TEAM } from 'redux-saga/actions';


const swapTwoTeamInBracket = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'teams/swap';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doSwapTwoTeamInBracket(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(swapTwoTeamInBracket, request.data.data, request.data.path, request.data.param);
    yield put({
      type: DELETE_LIST_SELECTING_TEAM,
    });
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: QUERY_LIST_TEAM,
        response: {
          success: QUERY_LIST_TEAM_SUCCESS,
          failed: QUERY_LIST_TEAM_FAILED,
        },
        data: {
          path: '',
          param: {
            competitionId: request.data.data.competitionId,
            limit: 999,
          },
          data: {},
        },
      });
      yield put({
        type: request.response.success,
      });
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: request.response.success,
    });
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'SwapTwoTeamInBracket',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchSwapTwoTeamInBracket() {
  yield takeLatest(SWAP_TWO_TEAM_IN_BRACKET, doSwapTwoTeamInBracket);
}
