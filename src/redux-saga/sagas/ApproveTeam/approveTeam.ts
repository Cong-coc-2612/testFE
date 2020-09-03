import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_LIST_PENDING_TEAM_SUCCESS } from 'components/PendingTeams/reducers';
import { COMMON_SHOW_NOTIFICATION, APPROVE_TEAM } from 'redux-saga/actions';


const approveTeam = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'team/approve';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doApproveTeam(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(approveTeam, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: QUERY_LIST_PENDING_TEAM_SUCCESS,
        payload: data.Teams,
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
        title: 'ApproveTeam',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchApproveTeam() {
  yield takeLatest(APPROVE_TEAM, doApproveTeam);
}
