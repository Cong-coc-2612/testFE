import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_COMPETITION_INFO_SUCCESS } from 'screens/CompetitionInfo/reducers';
import { GET_BRACKET_BOARD_INFO_SUCCESS, GET_BRACKET_BOARD_INFO_FAILED } from 'components/BracketBoard/reducers';
import { COMMON_SHOW_NOTIFICATION, EDIT_COMPETITION, GET_BRACKET_BOARD_INFO } from 'redux-saga/actions';
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
      yield put({
        type: GET_BRACKET_BOARD_INFO,
        response: {
          success: GET_BRACKET_BOARD_INFO_SUCCESS,
          failed: GET_BRACKET_BOARD_INFO_FAILED,
        },
        data: {
          path: '',
          param: {
            competitionId: request.data.param.id,
          },
          data: {},
        },
      });
      yield put({
        type: COMMON_SHOW_NOTIFICATION,
        data: {
          type: 'success',
          title: 'Sign Up',
          content: 'Thay đổi cài đặt cuộc thi thành công',
          time: new Date(),
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
