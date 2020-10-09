import React from 'react';
import { connect } from 'react-redux';
import { Styles } from 'react-modal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IBigRequest, IParams } from 'interfaces/common';
import NoteInput from 'components/NoteInput';
import CustomModal from 'components/CustomModal';
import { IState } from 'redux-saga/reducers';
import { queryAllMatches } from 'components/BracketBoard/actions';
import { queryBracketRankInfo, changeNoteBracketRank } from './actions';
import './styles.css';
import BracketRankSwapTeam from 'components/BracketRankSwapTeam';
import { TOURNAMENT_STATUS } from 'global';

interface IBracketRankProps extends React.ClassAttributes<BracketRank> {
  tournamentId: number;
  finalStage: boolean;
  bracketRankInfo: IParams | null;
  allMatches: IParams | null;
  canEdit?: boolean;
  tournamentStatus: string;

  queryBracketRankInfo(params: IBigRequest): void;
  queryAllMatches(params: IBigRequest): void;
  changeNoteBracketRank(params: IBigRequest): void;
}

interface IBracketRankState {
  showModal: boolean;
}

const customStyles: Styles = {
  content: {
    top: '15%',
    left: '15%',
    right: '15%',
    bottom: '15%',
    backgroundColor: '#2b303d',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    zIndex: 100001,
  },
};

class BracketRank extends React.Component<IBracketRankProps, IBracketRankState> {
  private finished: boolean = true;

  constructor(props: IBracketRankProps) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  shouldComponentUpdate(nextProps: IBracketRankProps, nextState: IBracketRankState) {
    if (this.props.allMatches !== nextProps.allMatches && nextProps.allMatches != null) {
      if (nextProps.finalStage !== true) {
        this.finished = true;
        for (let i = 0; i < (nextProps.allMatches.Matchs as IParams[]).length; i++) {
          if (((nextProps.allMatches.Matchs as IParams[])[i].name as string).includes('M') || ((nextProps.allMatches.Matchs as IParams[])[i].name as string).includes('W') || ((nextProps.allMatches.Matchs as IParams[])[i].name as string).includes('L') || ((nextProps.allMatches.Matchs as IParams[])[i].name as string).includes('Final')) {
          } else {
            if ((nextProps.allMatches.Matchs as IParams[])[i].status !== 'finished') {
              this.finished = false;
            }
          }
        }
        if (this.finished === true) {
          for (let i = 0; i < (nextProps.allMatches.Matchs as IParams[]).length; i++) {
            if (((nextProps.allMatches.Matchs as IParams[])[i].name as string).includes('M') || ((nextProps.allMatches.Matchs as IParams[])[i].name as string).includes('W') || ((nextProps.allMatches.Matchs as IParams[])[i].name as string).includes('L') || ((nextProps.allMatches.Matchs as IParams[])[i].name as string).includes('Final')) {
              if ((nextProps.allMatches.Matchs as IParams[])[i].status === 'finished') {
                this.finished = false;
              }
            }
          }
        }
      } else {
        this.finished = true;
        for (let i = 0; i < (nextProps.allMatches.Matchs as IParams[]).length; i++) {
          if ((nextProps.allMatches.Matchs as IParams[])[i].status !== 'finished') {
            this.finished = false;
          }
        }
      }
    }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    let params: IBigRequest = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
      },
      data: {},
    };
    this.props.queryBracketRankInfo(params);
    params = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
      },
      data: {},
    };
    this.props.queryAllMatches(params);
  }

  private onOpenRankRule = () => {
    this.setState({
      showModal: true,
    });
  }

  private handleConfirmModal = () => {
  }

  private handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }

  private handleSaveChangeNote = (tournamentId: number, tableId: number, teamId: number, note: string) => {
    const params = {
      path: '',
      param: {
        tournamentId,
        tableId,
        teamId,
        note,
      },
      data: {
      },
    };
    this.props.changeNoteBracketRank(params);
  }

  render() {
    if (this.props.bracketRankInfo != null) {
      if (this.props.finalStage === true) {
        return (
          <div className="BracketRank-container">
            {this.props.tournamentStatus !== TOURNAMENT_STATUS.FINISHED && this.props.canEdit === true && this.finished === true && this.props.bracketRankInfo.finalStageScheduleRanking != null && (this.props.bracketRankInfo.finalStageScheduleRanking as IParams[]).length > 1 && <BracketRankSwapTeam tableId={-1} tournamentId={this.props.tournamentId} tableName={''} listTeam={this.props.bracketRankInfo.finalStageScheduleRanking as IParams[]} />}
            <div className="BracketRank-item-container BracketRank-menuItem-container">
              <div className="BracketRank-item-orderNumber-container">
                <p style={{ color: 'white' }}>Hạng</p>
              </div>
              <div className="BracketRank-item-managerName-container">
                <p style={{ color: 'white' }}>Tên viết tắt của đội</p>
              </div>
              <div className="BracketRank-item-score-container">
                <p style={{ color: 'white' }}>Thắng</p>
              </div>
              <div className="BracketRank-item-score-container">
                <p style={{ color: 'white' }}>Thua</p>
              </div>
              {/* <div className="BracketRank-item-score-container">
                <p style={{ color: 'white' }}>Hiệu số</p>
              </div>
              <div className="BracketRank-item-matchHistory-container">
                <p style={{ color: 'white' }}>Số set thắng</p>
              </div> */}
              <div className="BracketRank-item-managerName2-container">
                <p style={{ color: 'white' }}>Ghi chú</p>
              </div>
            </div>
            {this.props.bracketRankInfo.finalStageScheduleRanking != null && (this.props.bracketRankInfo.finalStageScheduleRanking as IParams[]).length > 0 &&
              (this.props.bracketRankInfo.finalStageScheduleRanking as IParams[]).map((item, index) =>
                <div className={`BracketRank-item-container ${index % 2 === 0 ? 'BracketRank-item-container1' : 'BracketRank-item-container2'}`} key={index}>
                  <div className="BracketRank-item-orderNumber-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1} BracketRank-item-orderNumberr`}>{index + 1}</p>
                  </div>
                  <div className="BracketRank-item-managerName-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1} BracketRank-item-orderNumberr`}>{item.team != null ? (item.team as IParams).shortName : ''}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1} BracketRank-item-orderNumberr`}>{item.totalWin}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1} BracketRank-item-orderNumberr`}>{item.totalLose}</p>
                  </div>
                  {/* <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1} BracketRank-item-orderNumberr`}>{item.difference}</p>
                  </div>
                  <div className="BracketRank-item-matchHistory-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1} BracketRank-item-orderNumberr`}>{item.score}</p>
                  </div> */}
                  <div className="BracketRank-item-managerName2-container">
                    {item.team != null && <NoteInput tournamentStatus={this.props.tournamentStatus} canEdit={this.props.canEdit === true ? true : false} tournamentId={this.props.tournamentId} teamId={(item.team as IParams).id as number} tableId={-1} info={item} index={index} handleSaveChangeNote={this.handleSaveChangeNote} />}
                    {/* <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.note}</p> */}
                  </div>
                </div>
              )
            }
            <CustomModal
              customStyles={customStyles}
              handleCloseModal={this.handleCloseModal}
              showModal={this.state.showModal}
              handleConfirmModal={this.handleConfirmModal}
              confirmButtonVisible={false}
              handleCancelModal={this.handleCloseModal}
              cancelButtonText={'Thoát'}
            >
              <p style={{ color: 'white' }}>Quy tắc xếp hạng dựa vào nhánh thi đấu.</p>
            </CustomModal>
          </div>
        );
      } else {
        return (
          this.props.bracketRankInfo.groupStageScheduleRanking != null && (this.props.bracketRankInfo.groupStageScheduleRanking as IParams[]).map((item, index) =>
            <div key={index} className="BracketRank-container">
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }} onClick={this.onOpenRankRule}><p>Cách thức xếp hạng</p><AiOutlineQuestionCircle color={'red'} /></div>
              <h2>Bảng {item.tableName}</h2>
              {this.props.tournamentStatus !== TOURNAMENT_STATUS.FINISHED && this.props.canEdit === true && this.finished === true && item.rankingTable != null && (item.rankingTable as IParams[]).length > 1 && <BracketRankSwapTeam tableId={item.tableId as number} tournamentId={this.props.tournamentId} tableName={item.tableName as string} listTeam={item.rankingTable as IParams[]} />}
              <div className="BracketRank-item-container BracketRank-menuItem-container">
                <div className="BracketRank-item-orderNumber-container">
                  <p style={{ color: 'white' }}>Hạng</p>
                </div>
                <div className="BracketRank-item-managerName-container">
                  <p style={{ color: 'white' }}>Tên viết tắt của đội</p>
                </div>
                <div className="BracketRank-item-score-container">
                  <p style={{ color: 'white' }}>Thắng</p>
                </div>
                <div className="BracketRank-item-score-container">
                  <p style={{ color: 'white' }}>Thua</p>
                </div>
                <div className="BracketRank-item-score-container">
                  <p style={{ color: 'white' }}>Hiệu số</p>
                </div>
                <div className="BracketRank-item-managerName2-container">
                  <p style={{ color: 'white' }}>Ghi chú</p>
                </div>
                {/* <div className="BracketRank-item-matchHistory-container">
                  <p>Số set thắng</p>
                </div> */}
              </div>
              {(item.rankingTable as IParams[]).map((item2, index2) =>
                {
                  return <div className={`BracketRank-item-container ${index2 % 2 === 0 ? 'BracketRank-item-container1' : 'BracketRank-item-container2'}`} key={index2}>
                  <div className="BracketRank-item-orderNumber-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1} BracketRank-item-orderNumberr`}>{index2 + 1}</p>
                  </div>
                  <div className="BracketRank-item-managerName-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1} BracketRank-item-orderNumberr`}>{item2.team != null ? (item2.team as IParams).shortName : ''}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1} BracketRank-item-orderNumberr`}>{item2.totalWin}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1} BracketRank-item-orderNumberr`}>{item2.totalLose}</p>
                  </div>
                  {/* <div className="BracketRank-item-teamName-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.team != null ? (item2.team as IParams).shortName : ''}</p>
                  </div> */}
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1} BracketRank-item-orderNumberr`}>{item2.difference}</p>
                  </div>
                  {/* <div className="BracketRank-item-matchHistory-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.score}</p>
                  </div> */}
                  <div className="BracketRank-item-managerName2-container">
                    {item2.team != null && <NoteInput tournamentStatus={this.props.tournamentStatus} canEdit={this.props.canEdit === true ? true : false} tournamentId={this.props.tournamentId} teamId={(item2.team as IParams).id as number} tableId={item.tableId as number} info={item2} index={index2} handleSaveChangeNote={this.handleSaveChangeNote} />}
                    {/* <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.note}</p> */}
                  </div>
                </div>}
              )}
              <CustomModal
                customStyles={customStyles}
                handleCloseModal={this.handleCloseModal}
                showModal={this.state.showModal}
                handleConfirmModal={this.handleConfirmModal}
                confirmButtonVisible={false}
                handleCancelModal={this.handleCloseModal}
                cancelButtonText={'Thoát'}
              >
                <p style={{ color: 'white' }}>Quy tắc xếp hạng (được tính theo thứ tư ưu tiên từ trên xuống dưới):<br /><br />1. Đội có số trận thắng nhiều hơn<br /><br />2. Đội có số trận thua ít hơn.<br /><br />3. hiệu số (số set thắng - số set thua).<br /><br />4. Đội có số set thắng nhiều hơn<br /><br />5. Nếu những quy tắc trên vẫn không phân định được thứ hạng, giải sẽ thực hiện phân hạng theo cách thủ công, bạn có thể thay đổi thứ tự bảng tùy chọn theo ý muốn (sau khi giai đoạn đó đã kết thúc).</p>
              </CustomModal>
            </div>
          )
        );

      }
    } else {
      return (
        <div className="BracketRank-container">
          <p>Chưa có thông tin!</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
    bracketRankInfo: state.bracketRankInfo,
    allMatches: state.allMatches,
  };
};

export default connect(
  mapStateToProps,
  { queryBracketRankInfo, queryAllMatches, changeNoteBracketRank }
)(BracketRank);