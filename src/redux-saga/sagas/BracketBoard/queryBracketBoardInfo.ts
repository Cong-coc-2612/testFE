import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest, TypeAny } from 'interfaces/common';
import { GET_BRACKET_BOARD_INFO, COMMON_SHOW_NOTIFICATION } from 'redux-saga/actions';

const queryBracketBoardInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'schedule';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

let listMatchesFull: IParams[] = [];
let listWinMatchesFull: IParams[] = [];
let listLoseMatchesFull: IParams[] = [];
let listRound: IParams[] = [];
let listRRRound: IParams[] = [];
let listTableRR: IParams[] = [];
let listTableSE: IParams[] = [];
let listTableDE: IParams[] = [];
let listWinRound: IParams[] = [];
let listLoseRound: IParams[] = [];

const DFS = (node: IParams, number: number, maxRound: number, fakeId?: number) => {
  if (node.left != null) {
    if (number === 3) {
      if ((node.degree as number) % 2 === 0) {
        DFS(node.left as unknown as IParams, number, maxRound, fakeId);
      } else {
        DFS(node.left as unknown as IParams, number, maxRound, fakeId! * 2);
      }
    } else {
      DFS(node.left as unknown as IParams, number, maxRound);
    }
  } else if (node.left == null && (((node.data as unknown as IParams).roundNo as number) >= 2 && ((node.data as unknown as IParams).roundNo as number) <= maxRound) && number !== 3) {
    node.left = {
      id: -1,
      data: {
        loser: null,
        matchNo: -1,
        name: '',
        roundNo: ((node.data as unknown as IParams).roundNo as number) - 1,
        status: null,
        team1: null,
        team1Description: null,
        team2: null,
        team2Description: null,
        winner: null,
      },
      degree: null,
      left: null,
      right: null,
    } as unknown as TypeAny;
    DFS(node.left as unknown as IParams, number, maxRound);
  }
  if (node.right != null) {
    if (number === 3) {
      if ((node.degree as number) % 2 === 0) {
        DFS(node.right as unknown as IParams, number, maxRound, fakeId);
      } else {
        DFS(node.right as unknown as IParams, number, maxRound, (fakeId! * 2) + 1);
      }
    } else {
      DFS(node.right as unknown as IParams, number, maxRound);
    }
  } else if (node.right == null && (((node.data as unknown as IParams).roundNo as number) >= 2 && ((node.data as unknown as IParams).roundNo as number) <= maxRound) && number !== 3) {
    node.right = {
      id: -1,
      data: {
        loser: null,
        matchNo: -1,
        name: '',
        roundNo: ((node.data as unknown as IParams).roundNo as number) - 1,
        status: null,
        team1: null,
        team1Description: null,
        team2: null,
        team2Description: null,
        winner: null,
      },
      degree: null,
      left: null,
      right: null,
    } as unknown as TypeAny;
    DFS(node.right as unknown as IParams, number, maxRound);
  }
  if (number === 1) {
    listMatchesFull.push(node);
  } else if (number === 2) {
    listWinMatchesFull.push(node);
  } else if (number === 3) {
    if (((node.data as unknown as IParams).name as string).includes('L')) {
      listLoseMatchesFull.push({ ...node, fakeId });
    }
  }
}

function* doQueryBracketBoardInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryBracketBoardInfo, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    let tempVar: IParams = {};
    let tempVar2: IParams = {};
    if (response.data.error.MessageCode === 0) {
      if (data.Schedule != null && data.Schedule.finalStageSchedule != null) {
        if (data.Schedule.finalStageSchedule.formatName === 'Round Robin') {
          let listMatches: IParams[] = [];
          for (let i = 1; i <= data.Schedule.finalStageSchedule.totalRound; i++) {
            for (let j = 0; j < data.Schedule.finalStageSchedule.matches.length; j++) {
              if (data.Schedule.finalStageSchedule.matches[j].roundNo === i) {
                listMatches.push(data.Schedule.finalStageSchedule.matches[j] as IParams);
              }
            }
            listRRRound.push({ listMatches, roundName: data.Schedule.finalStageSchedule.roundsNaming[i - 1] } as unknown as IParams);
            listMatches = [];
          }
          tempVar = { finalStage: { listRRRound } };
          listRRRound = [];
        } else {
          if (data.Schedule.finalStageSchedule.winBranch == null) {
            yield call(DFS, data.Schedule.finalStageSchedule.bracket.root, 1, data.Schedule.finalStageSchedule.bracket.root.data.roundNo);
            let listMatches: IParams[] = [];
            for (let i = 1; i <= data.Schedule.finalStageSchedule.bracket.root.data.roundNo; i++) {
              for (let j = 0; j < listMatchesFull.length; j++) {
                if ((listMatchesFull[j].data as unknown as IParams).roundNo === i) {
                  listMatches.push(listMatchesFull[j] as IParams);
                }
              }
              listRound.push({ listMatches, roundName: data.Schedule.finalStageSchedule.roundsNaming[i - 1] } as unknown as IParams);
              listMatches = [];
            }
            tempVar = { finalStage: { listRound } };
            listRound = [];
            listMatchesFull = [];
          } else {
            yield call(DFS, data.Schedule.finalStageSchedule.winBranch.root, 2, data.Schedule.finalStageSchedule.winBranch.root.data.roundNo);
            let listWinMatches = [];
            for (let i = 1; i <= data.Schedule.finalStageSchedule.winBranch.root.data.roundNo; i++) {
              for (let j = 0; j < listWinMatchesFull.length; j++) {
                if ((listWinMatchesFull[j].data as unknown as IParams).roundNo === i) {
                  listWinMatches.push(listWinMatchesFull[j]);
                }
              }
              listWinRound.push({ listWinMatches, roundName: data.Schedule.finalStageSchedule.winRoundsNaming[i - 1] } as unknown as IParams);
              listWinMatches = [];
            }
            if (data.Schedule.finalStageSchedule.loseBranch.root != null) {
              yield call(DFS, data.Schedule.finalStageSchedule.loseBranch.root, 3, data.Schedule.finalStageSchedule.loseBranch.root.data.roundNo, 1);
              let listLoseMatches = [];
              for (let i = 1; i <= data.Schedule.finalStageSchedule.loseBranch.root.data.roundNo; i++) {
                for (let j = 0; j < listLoseMatchesFull.length; j++) {
                  if ((listLoseMatchesFull[j].data as unknown as IParams).roundNo === i) {
                    listLoseMatches.push(listLoseMatchesFull[j]);
                  }
                }
                listLoseRound.push({ listLoseMatches, roundName: data.Schedule.finalStageSchedule.loseRoundsNaming[i - 1] } as unknown as IParams);
                listLoseMatches = [];
              }
            }
            tempVar = { finalStage: { listWinRound, listLoseRound } };
            listWinRound = [];
            listWinMatchesFull = [];
            listLoseRound = [];
            listLoseMatchesFull = [];
          }
        }

      }
      if (data.Schedule != null && data.Schedule.hasGroupStage === true) {
        if (data.Schedule.groupStageSchedule != null && Object.keys(data.Schedule.groupStageSchedule).length > 0) {
          if (data.Schedule.groupStageSchedule.formatName === 'Round Robin') {
            for (let i = 0; i < data.Schedule.groupStageSchedule.tables.length; i++) {
              let listMatches: IParams[] = [];
              if (data.Schedule.groupStageSchedule.tables[i].totalRound != null) {
                for (let j = 1; j <= data.Schedule.groupStageSchedule.tables[i].totalRound; j++) {
                  if (data.Schedule.groupStageSchedule.tables[i].matches != null) {
                    for (let k = 0; k < data.Schedule.groupStageSchedule.tables[i].matches.length; k++) {
                      if (data.Schedule.groupStageSchedule.tables[i].matches[k].roundNo === j) {
                        listMatches.push(data.Schedule.groupStageSchedule.tables[i].matches[k] as IParams);
                      }
                    }
                    listRRRound.push({ listMatches, roundName: data.Schedule.groupStageSchedule.tables[i].roundsNaming[j - 1] } as IParams);
                    listMatches = [];
                  }
                }
              }
              listTableRR.push({ listRRRound, tableName: data.Schedule.groupStageSchedule.tables[i].tableName } as IParams);
              listRRRound = [];
            }
            tempVar2 = { groupStage: { listTableRR } };
            listTableRR = [];
          } else {
            if (data.Schedule.groupStageSchedule.formatName !== 'Double Elimination') {
              for (let k = 0; k < data.Schedule.groupStageSchedule.tables.length; k++) {
                if (data.Schedule.groupStageSchedule.tables[k].bracket != null) {
                  yield call(DFS, data.Schedule.groupStageSchedule.tables[k].bracket.root, 1, data.Schedule.groupStageSchedule.tables[k].bracket.root.data.roundNo);
                  let listMatches: IParams[] = [];
                  for (let i = 1; i <= data.Schedule.groupStageSchedule.tables[k].bracket.root.data.roundNo; i++) {
                    for (let j = 0; j < listMatchesFull.length; j++) {
                      if ((listMatchesFull[j].data as IParams).roundNo === i) {
                        listMatches.push(listMatchesFull[j] as IParams);
                      }
                    }
                    listRound.push({ listMatches, roundName: data.Schedule.groupStageSchedule.tables[k].roundsNaming[i - 1] } as IParams);
                    listMatches = [];
                  }
                }
                listTableSE.push({ listRound, tableName: data.Schedule.groupStageSchedule.tables[k].tableName } as IParams);
                listRound = [];
                listMatchesFull = [];
              }
              tempVar2 = { groupStage: { listTableSE } };
              listTableSE = [];
            } else {
              for (let k = 0; k < data.Schedule.groupStageSchedule.tables.length; k++) {
                yield call(DFS, data.Schedule.groupStageSchedule.tables[k].winBranch.root, 2, data.Schedule.groupStageSchedule.tables[k].winBranch.root.data.roundNo);
                let listWinMatches = [];
                for (let i = 1; i <= data.Schedule.groupStageSchedule.tables[k].winBranch.root.data.roundNo; i++) {
                  for (let j = 0; j < listWinMatchesFull.length; j++) {
                    if ((listWinMatchesFull[j].data as unknown as IParams).roundNo === i) {
                      listWinMatches.push(listWinMatchesFull[j]);
                    }
                  }
                  listWinRound.push({ listWinMatches, roundName: data.Schedule.groupStageSchedule.tables[k].winRoundsNaming[i - 1] } as IParams);
                  listWinMatches = [];
                }
                if (data.Schedule.groupStageSchedule.tables[k].loseBranch != null && data.Schedule.groupStageSchedule.tables[k].loseBranch.root != null) {
                  yield call(DFS, data.Schedule.groupStageSchedule.tables[k].loseBranch.root, 3, data.Schedule.groupStageSchedule.tables[k].loseBranch.root.data.roundNo, 1);
                  let listLoseMatches = [];
                  for (let i = 1; i <= data.Schedule.groupStageSchedule.tables[k].loseBranch.root.data.roundNo; i++) {
                    for (let j = 0; j < listLoseMatchesFull.length; j++) {
                      if ((listLoseMatchesFull[j].data as unknown as IParams).roundNo === i) {
                        listLoseMatches.push(listLoseMatchesFull[j]);
                      }
                    }
                    listLoseRound.push({ listLoseMatches, roundName: data.Schedule.groupStageSchedule.tables[k].loseRoundsNaming[i - 1] } as IParams);
                    listLoseMatches = [];
                  }
                }
                listTableDE.push({ listWinRound, listLoseRound, tableName: data.Schedule.groupStageSchedule.tables[k].tableName });
                listWinRound = [];
                listWinMatchesFull = [];
                listLoseRound = [];
                listLoseMatchesFull = [];
              }
              tempVar2 = { groupStage: { listTableDE } };
              listTableDE = [];
            }
          }
        }
      }
      yield put({
        type: request.response.success,
        payload: {
          ...tempVar,
          ...tempVar2
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
        title: 'QueryBracketBoardInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryBracketBoardInfo() {
  yield takeLatest(GET_BRACKET_BOARD_INFO, doQueryBracketBoardInfo);
}
