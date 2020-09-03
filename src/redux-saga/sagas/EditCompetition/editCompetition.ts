import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_COMPETITION_INFO_SUCCESS } from 'screens/CompetitionInfo/reducers';
import { COMMON_SHOW_NOTIFICATION, EDIT_COMPETITION } from 'redux-saga/actions';
import store from 'redux-saga/store';


const editCompetition = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'competition';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doEditCompetition(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(editCompetition, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: QUERY_COMPETITION_INFO_SUCCESS,
        payload: { ...store.getState().competitionInfo, Competition: data.Competition },
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
        title: 'EditCompetition',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchEditCompetition() {
  yield takeLatest(EDIT_COMPETITION, doEditCompetition);
}
