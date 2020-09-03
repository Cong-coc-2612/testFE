import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, EDIT_TEAM, QUERY_LIST_TEAM } from 'redux-saga/actions';
import { QUERY_LIST_TEAM_SUCCESS, QUERY_LIST_TEAM_FAILED } from 'components/Teams/reducers';


const editTeam = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'team';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doEditTeam(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(editTeam, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
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
      type: request.response.failed,
    });
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'EditTeam',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchEditTeam() {
  yield takeLatest(EDIT_TEAM, doEditTeam);
}
