import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_ALL_MATCHES_FAILED } from 'components/BracketBoard/reducers';
import { CREATE_NEW_TOURNAMENT, COMMON_SHOW_NOTIFICATION, CREATE_A_FINAL_STAGE_SETTING, CREATE_A_GROUP_STAGE_SETTING } from 'redux-saga/actions';
import { CREATE_A_FINAL_STAGE_SETTING_SUCCESS, CREATE_A_FINAL_STAGE_SETTING_FAILED, CREATE_A_GROUP_STAGE_SETTING_SUCCESS, CREATE_A_GROUP_STAGE_SETTING_FAILED } from 'components/CompetitionsSetting/reducers';


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
      yield put({
        type: QUERY_ALL_MATCHES_FAILED,
      });
      yield put({
        type: CREATE_A_FINAL_STAGE_SETTING,
        response: {
          success: CREATE_A_FINAL_STAGE_SETTING_SUCCESS,
          failed: CREATE_A_FINAL_STAGE_SETTING_FAILED,
        },
        data: {
          path: '',
          param: {},
          data: {
            tournamentId: data.Tournament.id,
            formatId: request.data.data.hasGroupStage === true ? request.data.data.format2 : request.data.data.format1,
            hasHomeMatch: request.data.data.hasGroupStage === true ? request.data.data.homeWay2 : request.data.data.homeWay1,
            bo: request.data.data.hasGroupStage === true ? request.data.data.boPhase2 : request.data.data.boPhase1,
          },
        },
      });
      if (request.data.data.hasGroupStage === false) {
        yield put({
          type: CREATE_A_GROUP_STAGE_SETTING,
          response: {
            success: CREATE_A_GROUP_STAGE_SETTING_SUCCESS,
            failed: CREATE_A_GROUP_STAGE_SETTING_FAILED,
          },
          data: {
            path: '',
            param: {},
            data: {
              tournamentId: data.Tournament.id,
            },
          },
        });
      } else {
        yield put({
          type: CREATE_A_GROUP_STAGE_SETTING,
          response: {
            success: CREATE_A_GROUP_STAGE_SETTING_SUCCESS,
            failed: CREATE_A_GROUP_STAGE_SETTING_FAILED,
          },
          data: {
            path: '',
            param: {},
            data: {
              tournamentId: data.Tournament.id,
              formatId: request.data.data.format1,
              bo: request.data.data.boPhase1,
              hasHomeMatch: request.data.data.homeWay1,
              advanceTeamPerTable: request.data.data.teamGoOn1Group,
              maxTeamPerTable: request.data.data.team1Group,
            },
          },
        });
      }
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
