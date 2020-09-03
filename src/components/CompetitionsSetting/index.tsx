import React from 'react';
import { connect } from 'react-redux';
import { Styles } from 'react-modal';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import 'react-block-ui/style.css';
import CompetitionSettingCompetitionsItem from 'components/CompetitionSettingCompetitionsItem';
import CompetitionSettingCompetitionsAddItem from 'components/CompetitionSettingCompetitionsAddItem';
import CustomModal from 'components/CustomModal';
import TextInput from 'components/TextInput';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import {
  queryAllFormats,
  queryAllSports
} from 'screens/CompetitionInfo/actions';
import { queryAllCompetitionsByTournamentId, addACompetition, createAFinalStageSetting, createAGroupStageSetting } from './actions';
import './styles.css';

interface ICompetitionSettingProps extends React.ClassAttributes<CompetitionSetting> {
  tournamentId: number;
  tournamentInfo: IParams | null;
  newCompetition: IParams | null;
  allCompetitionByTournamentId: IParams[] | null;
  allSports: IParams[];
  allFormats: IParams[];

  onChangeCompetitionSetting(): void;
  queryAllCompetitionsByTournamentId(param: IBigRequest): void;
  addACompetition(param: IBigRequest): void;
  createAFinalStageSetting(param: IBigRequest): void;
  createAGroupStageSetting(param: IBigRequest): void;
  queryAllSports(): void;
  queryAllFormats(): void;
}

interface ICompetitionSettingState {
  showModal: boolean;
  competitionName: string;
  competitionNameError: boolean;
  competitionNameErrorContent: string;
  competitionFormatError: boolean;
  competitionFormatErrorContent: string;
  selectedSport: ValueType<OptionTypeBase>;
  onePhase: boolean;
  twoPhase: boolean;
  selectedCompetitionFormatPhase1: ValueType<OptionTypeBase>;
  selectedCompetitionFormatPhase2: ValueType<OptionTypeBase>;
  // maxAmountTeamOfGroup: number;
  // maxAmountTeamOfGroupError: boolean;
  // maxAmountTeamOfGroupErrorContent: string;
  // limitAmountOfTeamchecked: boolean;
  // maxAmountOfTeam: number;
  // maxAmountOfTeamError: boolean;
  // maxAmountOfTeamErrorContent: string;
  // maxAmountMemberOfTeam: number;
  // minAmountMemberOfTeam: number;
  // minAmountMemberOfTeamError: boolean;
  // maxAmountMemberOfTeamError: boolean;
  // maxAmountMemberOfTeamErrorContent: string;
  // minAmountMemberOfTeamErrorContent: string;
  homeWayPhase2: boolean;
  homeWayPhase1: boolean;
  amountOfTeamsInAGroup: number;
  amountOfTeamsInAGroupError: boolean;
  amountOfTeamsInAGroupErrorContent: string;
  amountOfTeamsGoOnInAGroup: number;
  amountOfTeamsGoOnInAGroupError: boolean;
  amountOfTeamsGoOnInAGroupErrorContent: string;
}

let competitionFormatOptions: IParams[] = [];

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

let sportOptions: IParams[] = [];

class CompetitionSetting extends React.Component<ICompetitionSettingProps, ICompetitionSettingState> {
  constructor(props: ICompetitionSettingProps) {
    super(props);
    this.state = {
      showModal: false,
      competitionName: '',
      competitionNameError: false,
      competitionNameErrorContent: '',
      competitionFormatError: false,
      competitionFormatErrorContent: '',
      selectedSport: null,
      onePhase: true,
      twoPhase: false,
      selectedCompetitionFormatPhase1: null,
      selectedCompetitionFormatPhase2: null,
      // limitAmountOfTeamchecked: false,
      // maxAmountTeamOfGroup: 0,
      // maxAmountTeamOfGroupError: false,
      // maxAmountTeamOfGroupErrorContent: '',
      // maxAmountOfTeam: 0,
      // maxAmountOfTeamError: false,
      // maxAmountOfTeamErrorContent: '',
      // maxAmountMemberOfTeamError: false,
      // maxAmountMemberOfTeamErrorContent: '',
      // maxAmountMemberOfTeam: 0,
      // minAmountMemberOfTeam: 0,
      // minAmountMemberOfTeamError: false,
      // minAmountMemberOfTeamErrorContent: '',
      homeWayPhase2: false,
      homeWayPhase1: false,
      amountOfTeamsInAGroup: 2,
      amountOfTeamsInAGroupError: false,
      amountOfTeamsInAGroupErrorContent: '',
      amountOfTeamsGoOnInAGroup: 1,
      amountOfTeamsGoOnInAGroupError: false,
      amountOfTeamsGoOnInAGroupErrorContent: '',
    };
  }

  shouldComponentUpdate(nextProps: ICompetitionSettingProps, nextState: ICompetitionSettingState) {
    if (this.props.allSports !== nextProps.allSports) {
      sportOptions = [];
      nextProps.allSports.map((item, index) => sportOptions.push({ value: item.id, label: item.fullName }));
      if (nextProps.allSports.length > 0) {
        this.setState({
          selectedSport: { value: nextProps.allSports[0].id, label: nextProps.allSports[0].fullName },
        });
      }
    }
    if (this.props.newCompetition !== nextProps.newCompetition && nextProps.newCompetition !== null) {
      let params: IBigRequest = {
        path: '',
        param: {},
        data: {
          competitionId: nextProps.newCompetition.id,
          formatId: nextState.twoPhase === true ? (nextState.selectedCompetitionFormatPhase2 as IParams).value : (nextState.selectedCompetitionFormatPhase1 as IParams).value,
          hasHomeMatch: nextState.twoPhase === true ? nextState.homeWayPhase2 : nextState.homeWayPhase1,
        },
      };
      this.props.createAFinalStageSetting(params);
      if (nextState.twoPhase === false) {
        params = {
          path: '',
          param: {},
          data: {
            competitionId: nextProps.newCompetition.id,
          },
        };
        this.props.createAGroupStageSetting(params);
      } else {
        params = {
          path: '',
          param: {},
          data: {
            competitionId: nextProps.newCompetition.id,
            formatId: (this.state.selectedCompetitionFormatPhase1 as IParams).value,
            hasHomeMatch: this.state.homeWayPhase1,
            advanceTeamPerTable: this.state.amountOfTeamsGoOnInAGroup,
            maxTeamPerTable: this.state.amountOfTeamsInAGroup,
          },
        };
        this.props.createAGroupStageSetting(params);
      }
    }
    if (this.props.allFormats !== nextProps.allFormats) {
      competitionFormatOptions = [];
      nextProps.allFormats.map((item, index) => competitionFormatOptions.push({ value: item.id, label: item.description }));
      if (nextProps.allFormats.length > 0) {
        this.setState({
          selectedCompetitionFormatPhase1: { value: nextProps.allFormats[0].id, label: nextProps.allFormats[0].description },
          selectedCompetitionFormatPhase2: { value: nextProps.allFormats[0].id, label: nextProps.allFormats[0].description },
        });
      }
    }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    const params = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
        limit: 99,
      },
      data: {},
    };
    this.props.queryAllCompetitionsByTournamentId(params);
    this.props.queryAllSports();
    this.props.queryAllFormats();
  }

  private handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }

  private handleOpenModal = () => {
    this.setState({
      showModal: true,
    });
  }

  private validate = () => {
    let competitionNameError = false;
    let competitionNameErrorContent = '';
    let competitionFormatError = false;
    let competitionFormatErrorContent = '';
    if (this.state.competitionName.trim() === '') {
      if (this.state.selectedSport == null) {
        competitionNameError = true;
        competitionNameErrorContent = 'Tên cuộc thi không được trống, môn thể thao không được trống';
      } else {
        competitionNameError = true;
        competitionNameErrorContent = 'Tên cuộc thi không được trống';
      }
    } else {
      if (this.state.selectedSport == null) {
        competitionNameError = true;
        competitionNameErrorContent = 'Môn thể thao không được trống';
      }
    }
    if (this.state.selectedCompetitionFormatPhase1 == null || (this.state.twoPhase && this.state.selectedCompetitionFormatPhase2 == null)) {
      competitionFormatError = true;
      competitionFormatErrorContent = 'Thể thức không được trống';
    }
    if (this.props.allCompetitionByTournamentId!.find(element => element.name === this.state.competitionName)) {
      competitionNameError = true;
      competitionNameErrorContent = 'Tên cuộc thi này đã tồn tại';
    }

    return { competitionNameError, competitionNameErrorContent, competitionFormatError, competitionFormatErrorContent };
  }

  // private onChangeMaxAmountMemberOfTeam = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ maxAmountMemberOfTeam: tempValue, });
  // }

  // private onChangeMinAmountMemberOfTeam = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ minAmountMemberOfTeam: tempValue, });
  // }

  private handleConfirmModal = () => {
    const { competitionNameError, competitionNameErrorContent, competitionFormatError, competitionFormatErrorContent } = this.validate();
    const { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent } = this.validateAmountOfTeamsGoOnInAGroup();
    const { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent } = this.validateAmountOfTeamsInAGroup();
    this.setState({
      competitionNameError,
      competitionNameErrorContent,
      competitionFormatError,
      competitionFormatErrorContent,
      amountOfTeamsGoOnInAGroupError,
      amountOfTeamsGoOnInAGroupErrorContent,
      amountOfTeamsInAGroupError,
      amountOfTeamsInAGroupErrorContent
    });
    if (competitionNameError === true || competitionFormatError === true || amountOfTeamsGoOnInAGroupError === true || amountOfTeamsInAGroupError === true) {
      return;
    }

    let params: IBigRequest = {
      path: '',
      param: {},
      data: {
        name: this.state.competitionName,
        tournamentId: this.props.tournamentId,
        sportId: (this.state.selectedSport as IParams).value,
        description: '',
        hasGroupStage: this.state.twoPhase === true,
      },
    };
    this.props.addACompetition(params);
    this.setState({
      showModal: false,
    });
  }

  private onChangeHomeWayPhase1 = () => {
    this.setState({
      homeWayPhase1: !this.state.homeWayPhase1,
    });
  };

  private onChangeHomeWayPhase2 = () => {
    this.setState({
      homeWayPhase2: !this.state.homeWayPhase2,
    });
  };

  private onChangeCompetitionName = (value: string) => {
    this.setState({ competitionName: value, });
  }

  private onChangeSport = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedSport: value,
    });
  }

  // private onChangeLimitAmountOfTeam = () => {
  //   this.setState({
  //     limitAmountOfTeamchecked: !this.state.limitAmountOfTeamchecked,
  //   });
  // };

  // private onChangeMaxAmountOfTeam = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ maxAmountOfTeam: tempValue, });
  // }

  private OnChoose1 = () => {
    this.setState({
      onePhase: true,
      twoPhase: false,
    });
  }

  private OnChoose2 = () => {
    this.setState({
      onePhase: false,
      twoPhase: true,
    });
  }

  private onChangeCompetitionFormatPhase1 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedCompetitionFormatPhase1: value,
    });
  }

  private onChangeCompetitionFormatPhase2 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedCompetitionFormatPhase2: value,
    });
  }

  // private onChangeMaxAmountTeamOfGroup = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ maxAmountTeamOfGroup: tempValue, });
  // }

  private onChangeAmountOfTeamsInAGroup = (value: string) => {
    let tempValue = 0;
    if (!isNaN(value as unknown as number)) {
      tempValue = Number(value);
    } else {
      tempValue = 0;
    }
    this.setState({ amountOfTeamsInAGroup: tempValue, });
  }

  private onChangeAmountOfTeamsGoOnInAGroup = (value: string) => {
    let tempValue = 0;
    if (!isNaN(value as unknown as number)) {
      tempValue = Number(value);
    } else {
      tempValue = 0;
    }
    this.setState({ amountOfTeamsGoOnInAGroup: tempValue, });
  }

  private onBlurAmountOfTeamsInAGroup = () => {
    const { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent } = this.validateAmountOfTeamsInAGroup();
    this.setState({
      amountOfTeamsInAGroupError,
      amountOfTeamsInAGroupErrorContent
    });
    if (amountOfTeamsInAGroupError === true) {
      return;
    }
  }

  private onBlurAmountOfTeamsGoOnInAGroup = () => {
    const { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent } = this.validateAmountOfTeamsGoOnInAGroup();
    this.setState({
      amountOfTeamsGoOnInAGroupError,
      amountOfTeamsGoOnInAGroupErrorContent
    });
    if (amountOfTeamsGoOnInAGroupError === true) {
      return;
    }
  }

  private validateAmountOfTeamsGoOnInAGroup = () => {
    let amountOfTeamsGoOnInAGroupError = false;
    let amountOfTeamsGoOnInAGroupErrorContent = '';
    if (this.state.amountOfTeamsGoOnInAGroup < 1 || this.state.amountOfTeamsGoOnInAGroup >= this.state.amountOfTeamsInAGroup) {
      amountOfTeamsGoOnInAGroupError = true;
      amountOfTeamsGoOnInAGroupErrorContent = 'Số đội đi tiếp trong 1 bảng phải lớn hơn 0 và nhỏ hơn số đội tối đa';
    }

    return { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent };
  }

  private validateAmountOfTeamsInAGroup = () => {
    let amountOfTeamsInAGroupError = false;
    let amountOfTeamsInAGroupErrorContent = '';
    if (this.state.amountOfTeamsInAGroup < 2) {
      amountOfTeamsInAGroupError = true;
      amountOfTeamsInAGroupErrorContent = 'Số đội tối đa trong 1 bảng phải lớn hơn 1';
    }

    return { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent };
  }

  render() {
    if (this.props.allCompetitionByTournamentId != null) {
      return (
        <div className="CompetitionSetting-container">
          {this.props.allCompetitionByTournamentId.map((item, index) => {
            return (<CompetitionSettingCompetitionsItem tournamentInfo={this.props.tournamentInfo} info={item} index={index} key={index} listCompetition={this.props.allCompetitionByTournamentId} tournamentId={this.props.tournamentId} />);
          })}
          <CompetitionSettingCompetitionsAddItem handleAddACompetition={this.handleOpenModal} />
          <CustomModal
            customStyles={customStyles}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showModal}
            handleConfirmModal={this.handleConfirmModal}
          >
            <div className="CompetitionSetting-header-name-container">
              <h2>Tạo một cuộc thi mới trong giải</h2>
            </div>
            <div className="CompetitionSetting-tournament-name-container">
              <TextInput label={'Nhập tên cuộc thi'} value={this.state.competitionName} error={this.state.competitionNameError} errorContent={this.state.competitionNameErrorContent} onChangeText={this.onChangeCompetitionName} />
            </div>
            <div className="TournamentInfo-info-item">
              <p className="TournamentInfo-text">Bộ môn</p>
              <Select
                options={sportOptions}
                className="Select"
                defaultValue={this.state.selectedSport}
                value={this.state.selectedSport}
                onChange={this.onChangeSport}
                maxMenuHeight={140}
              />
            </div>
            <div className="TournamentInfo-info-item">
              <p className="TournamentInfo-text">Cách tổ chức giải:</p>
              <input type="radio" name="competitionType" onClick={this.OnChoose1} checked={this.state.onePhase} readOnly />
              <label onClick={this.OnChoose1}>1 giai đoạn</label>
              <input type="radio" name="competitionType" onClick={this.OnChoose2} checked={this.state.twoPhase} readOnly />
              <label onClick={this.OnChoose2}>2 giai đoạn</label>
            </div>
            <div className="TournamentInfo-info-item">
              <p className="TournamentInfo-text">{`Thể thức${this.state.onePhase === true ? '' : ' vòng bảng'}`}</p>
              <Select
                options={competitionFormatOptions}
                className="Select"
                defaultValue={this.state.selectedCompetitionFormatPhase1}
                value={this.state.selectedCompetitionFormatPhase1}
                onChange={this.onChangeCompetitionFormatPhase1}
                menuPlacement={'top'}
              />
            </div>
            {(this.state.selectedCompetitionFormatPhase1 != null &&
              (this.state.selectedCompetitionFormatPhase1 as IParams).value !== 2 &&
              <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                <div className="CompetitionInfo-info-item">
                  <label className="Checkbox-label">
                    <input
                      type="checkbox"
                      checked={this.state.homeWayPhase1}
                      onChange={this.onChangeHomeWayPhase1}
                    />
                    {`${(this.state.selectedCompetitionFormatPhase1 as IParams).value === 3 ? `${this.state.twoPhase === true ? 'Chơi lượt đi lượt về vòng bảng' : 'Chơi lượt đi lượt về'}` : `${this.state.twoPhase === true ? 'Có trận tranh hạng 3 vòng bảng' : 'Có trận tranh hạng 3'}`}`}
                  </label>
                </div>
              </div>)}
            {(this.state.twoPhase === true &&
              <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                <div className="CompetitionInfo-info-item">
                  <TextInput
                    style={{ width: 250 }}
                    label={'Số đội trong 1 bảng (lớn hơn 1)'}
                    value={this.state.amountOfTeamsInAGroup as unknown as string}
                    onChangeText={this.onChangeAmountOfTeamsInAGroup}
                    error={this.state.amountOfTeamsInAGroupError}
                    errorContent={this.state.amountOfTeamsInAGroupErrorContent}
                    onBlur={this.onBlurAmountOfTeamsInAGroup}
                  />
                </div>
              </div>)}
            {(this.state.twoPhase === true &&
              <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                <div className="CompetitionInfo-info-item">
                  <TextInput
                    style={{ width: 300 }}
                    label={'Số đội đi tiếp trong 1 bảng (lớn hơn 0)'}
                    value={this.state.amountOfTeamsGoOnInAGroup as unknown as string}
                    onChangeText={this.onChangeAmountOfTeamsGoOnInAGroup}
                    error={this.state.amountOfTeamsGoOnInAGroupError}
                    errorContent={this.state.amountOfTeamsGoOnInAGroupErrorContent}
                    onBlur={this.onBlurAmountOfTeamsGoOnInAGroup}
                  />
                </div>
              </div>)}
            {this.state.twoPhase === true && <p className="TournamentInfo-text">Thể thức vòng chung kết</p>}
            {this.state.twoPhase === true && <Select
              options={competitionFormatOptions}
              className="Select"
              defaultValue={this.state.selectedCompetitionFormatPhase2}
              value={this.state.selectedCompetitionFormatPhase2}
              onChange={this.onChangeCompetitionFormatPhase2}
              menuPlacement={'top'}
            />}
            {(this.state.twoPhase === true && (this.state.selectedCompetitionFormatPhase2 as IParams).value !== 2 && ((this.state.selectedCompetitionFormatPhase2 as IParams).value === 3 ?
              <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                <div className="CompetitionInfo-info-item">
                  <label className="Checkbox-label">
                    <input
                      type="checkbox"
                      checked={this.state.homeWayPhase2}
                      onChange={this.onChangeHomeWayPhase2}
                    />
                      Chơi lượt đi lượt về vòng chung kết
                    </label>
                </div>
              </div> : <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                <div className="CompetitionInfo-info-item">
                  <label className="Checkbox-label">
                    <input
                      type="checkbox"
                      checked={this.state.homeWayPhase2}
                      onChange={this.onChangeHomeWayPhase2}
                    />
                      Có trận tranh hạng 3 vòng chung kết
                    </label>
                </div>
              </div>))}
            {this.state.competitionFormatError === true && <div className="TournamentInfo-info-item">
              <p className={'TextInput-error-text'}>{this.state.competitionFormatErrorContent}</p>
            </div>}
            {/* {this.state.selectedCompetitionFormatPhase1 && (this.state.selectedCompetitionFormatPhase1 as IParams).value === 2 && <div className="TournamentInfo-info-item">
              <TextInput value={this.state.maxAmountTeamOfGroup as unknown as string} label={`Giới hạn số lượng đội trong 1 bảng${this.state.twoPhase ? ' của giai đoạn 1' : ''}`} onChangeText={this.onChangeMaxAmountTeamOfGroup} error={this.state.maxAmountTeamOfGroupError} errorContent={this.state.maxAmountTeamOfGroupErrorContent} />
            </div>} */}
            {/* <div className="TournamentInfo-info-item">
              <div className="CompetitionSettingCompetitionsItem-option-container-item">
                <label className="Checkbox-label">
                  <input
                    type="checkbox"
                    checked={this.state.limitAmountOfTeamchecked}
                    onChange={this.onChangeLimitAmountOfTeam}
                  />
            Giới hạn số đội tối đa
          </label>
              </div>
            </div> */}
            {/* {this.state.limitAmountOfTeamchecked === true && <TextInput value={this.state.maxAmountOfTeam as unknown as string} label={'Số lượng đội tối đa'} onChangeText={this.onChangeMaxAmountOfTeam} error={this.state.maxAmountOfTeamError} errorContent={this.state.maxAmountOfTeamErrorContent} />} */}
          </CustomModal>
        </div >
      );
    } else {
      return (
        <div className="CompetitionSetting-container">
        </div>
      );
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
    allCompetitionByTournamentId: state.allCompetitionByTournamentId,
    allFormats: state.allFormats,
    allSports: state.allSports,
    newCompetition: state.newCompetition,
  };
};

export default connect(
  mapStateToProps,
  {
    queryAllCompetitionsByTournamentId,
    addACompetition,
    queryAllFormats,
    queryAllSports,
    createAFinalStageSetting,
    createAGroupStageSetting
  }
)(CompetitionSetting);