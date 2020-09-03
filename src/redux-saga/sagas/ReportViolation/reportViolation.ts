import { call, put, takeLatest } from 'redux-saga/effects';
import { IParams, IRequest, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, REPORT_VIOLATION } from 'redux-saga/actions';
import { query, METHOD } from 'utils/socketApi';

const reportViolation = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'report';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doReportViolation(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(reportViolation, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      yield put({
        type: COMMON_SHOW_NOTIFICATION,
        data: {
          type: 'success',
          title: 'Sign Up',
          content: 'Gửi báo cáo thành công',
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
        title: 'ReportViolation',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchReportViolation() {
  yield takeLatest(REPORT_VIOLATION, doReportViolation);
}
