import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import 'whatwg-fetch';
import { IParams, IRequest, IBigRequest, IResponse } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, TOURNAMENT_UPDATE_BACKGROUND } from 'redux-saga/actions';
import { QUERY_TOURNAMENT_INFO_SUCCESS } from 'screens/TournamentInfo/reducers';
import store from 'redux-saga/store';
import config from 'config';

const uploadFile = (data: IParams, path: string | number, param: IParams) => {
  if (param.file != null) {
    const file: File = (param.file as unknown as IParams[])[0] as unknown as File;
    const form = new FormData();
    form.append('file', file);
    // return query(uri, METHOD.POST, undefined, undefined, paths, form);
    return new Promise<IResponse<IParams>>((resolve: Function, reject: Function) => {
      axios.post(`${config.apiUrl.baseURI}tournament/uploadAvatar`,
        form,
        {
          params: { id: param.id },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        console.log('SUCCESS!!', response);
        resolve(response);
      })
        .catch((error) => {
          console.log('FAILED!!', error);
          reject(error);
        });
    });
  } else {
    return null;
  }
};

function* doUpdateBackgroundTournament(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(uploadFile, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.Tournament,
      });
      yield put({
        type: QUERY_TOURNAMENT_INFO_SUCCESS,
        payload: { ...store.getState().tournamentInfo, Tournament: data.Tournament },
      });
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'Update Background',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchUpdateBackgroundTournament() {
  yield takeLatest(TOURNAMENT_UPDATE_BACKGROUND, doUpdateBackgroundTournament);
}
