import { takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IRequest, INotification } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION } from 'redux-saga/actions';

function doShowNotification(request: IRequest<INotification>) {
  try {
    if (request.data.type === 'error') {
      toast.error(`${request.data.content === 'Error: Network Error' ? 'Mất kết nối, hãy kiểm tra lại đường truyền' : request.data.content}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (request.data.type === 'success') {
      toast.success(`${request.data.content}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // toast('Wow so easy!', {
    //   position: "bottom-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  } catch (err) { }
}

export default function* watchShowNotification() {
  yield takeLatest(COMMON_SHOW_NOTIFICATION, doShowNotification);
}
