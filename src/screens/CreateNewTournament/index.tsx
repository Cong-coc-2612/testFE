import React from 'react';
import { connect } from 'react-redux';
import { isAfter, isBefore } from 'date-fns';
import 'react-block-ui/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from 'components/TextInput';
import { IState } from 'redux-saga/reducers';
import { IBigRequest } from 'interfaces/common';
import { COOKIES_TYPE } from 'global';
import { cookies } from 'utils/cookies';
import { createNewTournament } from './actions';
import './styles.css';

interface ICreateNewTournamentProps extends React.ClassAttributes<CreateNewTournament> {
  createNewTournament(param: IBigRequest): void;
}

interface ICreateNewTournamentState {
  tournamentName: string;
  tournamentNameError: boolean;
  tournamentNameErrorContent: string;
  tournamentShortName: string;
  tournamentShortNameError: boolean;
  tournamentShortNameErrorContent: string;
  tournamentDescription: string;
  tournamentDescriptionError: boolean;
  tournamentDescriptionErrorContent: string;
  tournamentStartLocation: string;
  tournamentStartLocationError: boolean;
  tournamentStartLocationErrorContent: string;
  tournamentEndLocation: string;
  tournamentEndLocationError: boolean;
  tournamentEndLocationErrorContent: string;
  donor: string;
  donorError: boolean;
  donorErrorContent: string;
  startDate: Date;
  endDate: Date;
}

class CreateNewTournament extends React.Component<ICreateNewTournamentProps, ICreateNewTournamentState> {
  constructor(props: ICreateNewTournamentProps) {
    super(props);
    this.state = {
      tournamentName: '',
      tournamentNameError: false,
      tournamentNameErrorContent: '',
      tournamentShortName: '',
      tournamentShortNameError: false,
      tournamentShortNameErrorContent: '',
      tournamentDescription: '',
      tournamentDescriptionError: false,
      tournamentDescriptionErrorContent: '',
      tournamentStartLocation: '',
      tournamentStartLocationError: false,
      tournamentStartLocationErrorContent: '',
      tournamentEndLocation: '',
      tournamentEndLocationError: false,
      tournamentEndLocationErrorContent: '',
      donor: '',
      donorError: false,
      donorErrorContent: '',
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  private onChangeTournamentname = (value: string) => {
    this.setState({ tournamentName: value, });
  }

  private onChangeTournamentShortName = (value: string) => {
    this.setState({ tournamentShortName: value, });
  }

  private onChangeTournamentDescription = (value: string) => {
    this.setState({ tournamentDescription: value, });
  }

  private onChangeTournamentDonor = (value: string) => {
    this.setState({ donor: value, });
  }

  private onChangeTournamentStartLocation = (value: string) => {
    this.setState({ tournamentStartLocation: value, });
  }

  private onChangeTournamentEndLocation = (value: string) => {
    this.setState({ tournamentEndLocation: value, });
  }

  private handleChangeStartDate = (value: Date) => {
    if (isAfter(value, this.state.endDate)) {
      this.setState({
        startDate: value,
        endDate: value,
      });
    } else {
      this.setState({
        startDate: value,
      });
    }
  };

  private handleChangeEndDate = (value: Date) => {
    if (isBefore(value, this.state.startDate)) {
      this.setState({
        startDate: value,
        endDate: value,
      });
    } else {
      this.setState({
        endDate: value,
      });
    }
  };

  private validate = () => {
    let tournamentNameError = false;
    let tournamentNameErrorContent = '';
    let tournamentShortNameErrorContent = '';
    let tournamentShortNameError = false;
    if (this.state.tournamentName.trim() === '') {
      tournamentNameError = true;
      tournamentNameErrorContent = 'Tên giải không được trống';
    }
    if (this.state.tournamentShortName.trim() === '') {
      tournamentShortNameError = true;
      tournamentShortNameErrorContent = 'Tên ngắn của giải không được trống';
    }

    return { tournamentNameError, tournamentNameErrorContent, tournamentShortNameErrorContent, tournamentShortNameError };
  }

  private handleCreateNewTournament = () => {
    const { tournamentNameError, tournamentNameErrorContent, tournamentShortNameErrorContent, tournamentShortNameError } = this.validate();
    this.setState({
      tournamentNameError,
      tournamentNameErrorContent,
      tournamentShortNameErrorContent,
      tournamentShortNameError
    });
    if (tournamentNameError === true || tournamentShortNameError === true) {
      return;
    }
    const params = {
      path: '',
      param: {},
      data: {
        fullName: this.state.tournamentName,
        shortName: this.state.tournamentShortName,
        description: this.state.tournamentDescription,
        creatorId: cookies.get(COOKIES_TYPE.AUTH_TOKEN).User.id,
        openingLocation: this.state.tournamentStartLocation,
        openingTime: this.state.startDate,
        closingLocation: this.state.tournamentEndLocation,
        closingTime: this.state.endDate,
        donor: this.state.donor,
      },
    };

    this.props.createNewTournament(params);
  }

  render() {
    return (
      <div className="CreateNewTournament-container">
        <div className="CreateNewTournament-tournament-container">
          <p className="CreateNewTournament-header-text">Tạo mới giải đấu</p>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Tên giải:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='Nhập tên của giải' error={this.state.tournamentNameError} errorContent={this.state.tournamentNameErrorContent} onChangeText={this.onChangeTournamentname} />
              {/*defaultValue */}
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Tên ngắn:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='Nhập tên ngắn của giải' error={this.state.tournamentShortNameError} errorContent={this.state.tournamentShortNameErrorContent} onChangeText={this.onChangeTournamentShortName} />
              {/*defaultValue */}
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Mô tả:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='Nhập mô tả' error={this.state.tournamentDescriptionError} errorContent={this.state.tournamentDescriptionErrorContent} onChangeText={this.onChangeTournamentDescription} />
              {/*defaultValue */}
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Địa điểm khai mạc:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='' error={this.state.tournamentStartLocationError} errorContent={this.state.tournamentStartLocationErrorContent} onChangeText={this.onChangeTournamentStartLocation} />
              {/*defaultValue */}
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Thời gian khai mạc:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <DatePicker
                selected={this.state.startDate}
                dateFormat="dd/MM/yyyy"
                onChange={this.handleChangeStartDate}
              />
              {/*defaultValue */}
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Địa điểm bế mạc:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='' error={this.state.tournamentEndLocationError} errorContent={this.state.tournamentEndLocationErrorContent} onChangeText={this.onChangeTournamentEndLocation} />
              {/*defaultValue */}
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Thời gian bế mạc:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChangeEndDate}
                dateFormat="dd/MM/yyyy"
              />
              {/*defaultValue */}
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Nhà tài trợ:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='' error={this.state.donorError} errorContent={this.state.donorErrorContent} onChangeText={this.onChangeTournamentDonor} />
              {/*defaultValue */}
            </div>
          </div>
          <div className="CreateNewTournament-button-container">
            <div className="CreateNewTournament-button" onClick={this.handleCreateNewTournament}>
              <h4 className="CreateNewTournament-button-text">Tạo mới</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  { createNewTournament }
)(CreateNewTournament);