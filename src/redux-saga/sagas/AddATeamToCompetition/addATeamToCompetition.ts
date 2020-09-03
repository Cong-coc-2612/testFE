import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_LIST_TEAM_SUCCESS, QUERY_LIST_TEAM_FAILED } from 'components/Teams/reducers';
import { COMMON_SHOW_NOTIFICATION, ADD_A_TEAM_TO_COMPETITION, QUERY_LIST_TEAM } from 'redux-saga/actions';

const addATeamToCompetition = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'team';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doAddATeamToCompetition(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(addATeamToCompetition, request.data.data, request.data.path, request.data.param);
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
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'AddATeamToCompetition',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchAddATeamToCompetition() {
  yield takeLatest(ADD_A_TEAM_TO_COMPETITION, doAddATeamToCompetition);
}
