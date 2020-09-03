import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_LIST_USER_SUCCESS } from 'components/AllUsers/reducers';
import { COMMON_SHOW_NOTIFICATION, DEACTIVE_USER } from 'redux-saga/actions';
import store from 'redux-saga/store';


const deActiveUser = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'admin/deactivateAccount';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doDeActiveUser(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(deActiveUser, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
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
        title: 'DeActiveUser',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchDeActiveUser() {
  yield takeLatest(DEACTIVE_USER, doDeActiveUser);
}
