import React from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import TournamentOverview from 'components/TournamentOverview';
import Paging from 'components/Paging';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { queryListTournamentsOfUser } from './actions';
import './styles.css';

interface IUserInfoTournamentProps extends React.ClassAttributes<UserInfoTournament> {
  userId: number;
  listTournamentOfUser: IParams | null;

  queryListTournamentsOfUser(param: IBigRequest): void;
}

interface IUserInfoTournamentState {
  currentPage: number;
}

class UserInfoTournament extends React.Component<IUserInfoTournamentProps, IUserInfoTournamentState> {
  constructor(props: IUserInfoTournamentProps) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    const params = {
      path: '',
      param: {
        userId: this.props.userId,
        page: this.state.currentPage,
      },
      data: {},
    };
    this.props.queryListTournamentsOfUser(params);
  }

  private onChangeSelectedPage = (pageNumber: number) => {
    this.setState({ currentPage: pageNumber }, () => this.requestData());
  }

  render() {
    console.log(this.props.listTournamentOfUser);
    return (
      <div className="UserInfoTournament-container">
        <div className="UserInfoTournament-container-container">
          {this.props.listTournamentOfUser && this.props.listTournamentOfUser.Tournaments ? ((this.props.listTournamentOfUser.Tournaments as unknown as IParams[]).length > 0 ? (this.props.listTournamentOfUser.Tournaments as unknown as IParams[]).map(
            (item, index) => <TournamentOverview info={item} index={index} key={index} />) : <p>Không tìm thấy kết quả nào!</p>) :
            <Skeleton />
          }
        </div>
        <Paging currentPage={this.state.currentPage} totalPage={this.props.listTournamentOfUser != null ? this.props.listTournamentOfUser.TotalPage as number : 0} onChangeSelectedPage={this.onChangeSelectedPage} />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    listTournamentOfUser: state.listTournamentOfUser,
  };
};

export default connect(
  mapStateToProps,
  { queryListTournamentsOfUser, }
)(UserInfoTournament);