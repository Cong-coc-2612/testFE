import React from 'react';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { IParams, IBigRequest } from 'interfaces/common';
import './styles.css';
import { deleteCompetition } from './actions';
import { Link } from 'react-router-dom';

interface ICompetitionSettingCompetitionsItemProps extends React.ClassAttributes<CompetitionSettingCompetitionsItem> {
  info: IParams;
  index: number;
  listCompetition: IParams[] | null;
  tournamentId: number;
  tournamentInfo: IParams | null;

  deleteCompetition(params: IBigRequest): void;
}

interface ICompetitionSettingCompetitionsItemState {
  // seeMoreInfo: boolean;
  // maxAmountOfTeam: number;
  // maxAmountOfTeamError: boolean;
  // maxAmountOfTeamErrorContent: string;
  // competitionName: string;
  // competitionNameError: boolean;
  // competitionNameErrorContent: string;
  // maxAmountMemberOfTeam: number;
  // minAmountMemberOfTeam: number;
  // minAmountMemberOfTeamError: boolean;
  // maxAmountMemberOfTeamError: boolean;
  // maxAmountMemberOfTeamErrorContent: string;
  // minAmountMemberOfTeamErrorContent: string;
  // maxAmountTeamOfGroup: number;
  // maxAmountTeamOfGroupError: boolean;
  // maxAmountTeamOfGroupErrorContent: string;
  // limitAmountOfTeamchecked: boolean;
  // onePhase: boolean;
  // twoPhase: boolean;
  // competitionFormatError: boolean;
  // competitionFormatErrorContent: string;
  // competitionSportError: boolean;
  // competitionSportErrorContent: string;
}

class CompetitionSettingCompetitionsItem extends React.Component<ICompetitionSettingCompetitionsItemProps, ICompetitionSettingCompetitionsItemState> {
  constructor(props: ICompetitionSettingCompetitionsItemProps) {
    super(props);
    this.state = {
      // competitionFormatError: false,
      // competitionFormatErrorContent: '',
      // competitionSportError: false,
      // competitionSportErrorContent: '',
      // competitionName: this.props.info.name as string,
      // competitionNameError: false,
      // competitionNameErrorContent: '',
      // maxAmountTeamOfGroup: 0,
      // maxAmountTeamOfGroupError: false,
      // maxAmountTeamOfGroupErrorContent: '',
      // seeMoreInfo: false,
      // maxAmountOfTeamError: false,
      // maxAmountOfTeamErrorContent: '',
      // maxAmountMemberOfTeamError: false,
      // maxAmountMemberOfTeamErrorContent: '',
      // minAmountMemberOfTeamError: false,
      // minAmountMemberOfTeamErrorContent: '',
      // maxAmountOfTeam: 0,
      // maxAmountMemberOfTeam: 0,
      // minAmountMemberOfTeam: 0,
      // limitAmountOfTeamchecked: false,
      // onePhase: this.props.info.groupStage === false,
      // twoPhase: this.props.info.groupStage === true,
    };
  }

  shouldComponentUpdate(nextProps: ICompetitionSettingCompetitionsItemProps, nextState: ICompetitionSettingCompetitionsItemState) {
    // if (this.props.info !== nextProps.info) {
    //   this.setState({
    //     onEditMode: false,
    //   });
    // }
    return true;
  }

  // private handleSeeMore = () => {
  //   if (this.state.onEditMode === true) {
  //     return;
  //   }
  //   this.setState({
  //     seeMoreInfo: !this.state.seeMoreInfo,
  //   });
  // }

  // private onChangeLimitAmountOfTeam = () => {
  //   this.setState({
  //     limitAmountOfTeamchecked: !this.state.limitAmountOfTeamchecked,
  //   });
  // };

  // private onChangeSport = (value: ValueType<OptionTypeBase>) => {
  //   this.setState({
  //     selectedSport: value,
  //   });
  // }

  // private onChangeCompetitionName = (value: string) => {
  //   this.setState({
  //     competitionName: value,
  //   });
  // }

  // private startEditMode = () => {
  //   this.setState({
  //     onEditMode: true,
  //   });
  // }

  // private handleConfirmModal = () => {
  // }

  // private validate = () => {
  //   let competitionNameError = false;
  //   let competitionNameErrorContent = '';
  //   let competitionFormatError = false;
  //   let competitionFormatErrorContent = '';
  //   let competitionSportError = false;
  //   let competitionSportErrorContent = '';
  //   if (this.state.competitionName.trim() === '') {
  //     competitionNameError = true;
  //     competitionNameErrorContent = 'Tên cuộc thi không được trống';
  //   }
  //   if (this.props.listCompetition!.filter((item) => item !== this.props.info).find(element => element.name === this.state.competitionName)) {
  //     competitionNameError = true;
  //     competitionNameErrorContent = 'Tên cuộc thi này đã tồn tại';
  //   }
  //   if (this.state.selectedCompetitionFormatPhase1 == null || (this.state.twoPhase && this.state.selectedCompetitionFormatPhase2 == null)) {
  //     competitionFormatError = true;
  //     competitionFormatErrorContent = 'Thể thức không được trống';
  //   }
  //   if (this.state.selectedSport == null) {
  //     competitionSportError = true;
  //     competitionSportErrorContent = 'Thể thức không được trống';
  //   }

  //   return { competitionNameError, competitionNameErrorContent, competitionFormatError, competitionFormatErrorContent, competitionSportError, competitionSportErrorContent };
  // }

  // private handleCloseModal = () => {
  //   this.setState({
  //     showModal: false,
  //   });
  // }

  private onDeleteCompetition = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa cuộc thi này?');
    if (confirm === true) {
      const params = {
        path: '',
        param: {
          id: this.props.info.id,
        },
        data: {
          tournamentId: this.props.tournamentId,
        },
      }
      this.props.deleteCompetition(params);
    }
  }

  render() {
    return (
      <div className="CompetitionSettingCompetitionsItem-info-container">
        <div className="CompetitionSettingCompetitionsItem-info-container-container">
          <div className="CompetitionSettingCompetitionsItem-container">
            <Link to={`/competition/${this.props.info.id}`} style={{ textDecoration: 'none', color: 'white' }} target={'_blank'} >
              <div className="CompetitionSettingCompetitionsItem-container-container">
                <div className="CompetitionSettingCompetitionsItem-order-number-container">
                  <div className="CompetitionSettingCompetitionsItem-order-number-box">
                    <p>{this.props.index + 1}</p>
                  </div>
                </div>
                <div className={`CompetitionSettingCompetitionsItem-team-name-container`}>
                  <p>{this.props.info.name}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="CompetitionSettingCompetitionsItem-team-setting-container">
            <div className="CompetitionSettingCompetitionsItem-team-setting-container-container" onClick={this.onDeleteCompetition}>
              <MdDelete className="CompetitionSettingCompetitionsItem-team-setting-icon" />
            </div>
          </div>
        </div>
        {/* <CustomModal
          customStyles={customStyles}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
          handleConfirmModal={this.handleConfirmModal}
          confirmButtonVisible={false}
        >
          <Teams competitionInfo={this.props.info} tournamentInfo={this.props.tournamentInfo} id={this.props.info.id as number} type={'competition'} />
        </CustomModal> */}
      </div>
    );
  }
}

export default connect(
  null,
  { deleteCompetition, }
)(CompetitionSettingCompetitionsItem);