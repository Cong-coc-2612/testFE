import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_LIST_USER_SUCCESS } from 'components/AllUsers/reducers';
import { COMMON_SHOW_NOTIFICATION, ACTIVE_USER } from 'redux-saga/actions';
import store from 'redux-saga/store';


const activeUser = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'admin/activateAccount';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doActiveUser(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(activeUser, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.User,
      });
      if (store.getState().listUsers != null && (store.getState().listUsers!.Users as IParams[]).findIndex(element => element.id === data.User.id) !== -1) {
        let tempList = (store.getState().listUsers!.Users as IParams[]).slice(0);
        tempList[(store.getState().listUsers!.Users as IParams[]).findIndex(element => element.id === data.User.id)] = data.User;
        yield put({
          type: QUERY_LIST_USER_SUCCESS,
          payload: { ...store.getState().listUsers, Users: tempList, },
        });
      }
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
        title: 'ActiveUser',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchActiveUser() {
  yield takeLatest(ACTIVE_USER, doActiveUser);
}
