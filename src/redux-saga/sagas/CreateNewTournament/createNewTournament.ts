import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { CREATE_NEW_TOURNAMENT, COMMON_SHOW_NOTIFICATION } from 'redux-saga/actions';
import history from "utils/history";


const createNewTournament = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'tournament';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doCreateNewTournament(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(createNewTournament, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield history.push(`/tournament/${data.Tournament.id}`);
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'CreateNewTournament',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchCreateNewTournament() {
  yield takeLatest(CREATE_NEW_TOURNAMENT, doCreateNewTournament);
}
