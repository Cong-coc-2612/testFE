import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaRunning } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { IParams } from 'interfaces/common';
import './styles.css';

interface ITournamentOverviewProps extends React.ClassAttributes<TournamentOverview> {
  info: IParams;
  index: number;
}

interface ITournamentOverviewState {
}

class TournamentOverview extends React.Component<ITournamentOverviewProps, ITournamentOverviewState> {
  constructor(props: ITournamentOverviewProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    const info = this.props.info.Tournament;
    const moreInfo = this.props.info.OtherInformation;
    return (
      <Link to={`/tournament/${(info as unknown as IParams).id}`} style={{ textDecoration: 'none' }}>
        <div className="TournamentOverview-container">
          <div className="TournamentOverview-background-image-container">
            <img className={'TournamentOverview-background-image'} src={require('../../assets/7ab1b0125d485c8dd6a4e78832b0a4b2fbed3cf8.png')} alt={'logo'} />
          </div>
          <div className="TournamentOverview-avatar-image-container">
            <div className="TournamentOverview-avatar-container">
              <img className={'TournamentOverview-avatar-image'} src={require('../../assets/7ab1b0125d485c8dd6a4e78832b0a4b2fbed3cf8.png')} alt={'logo'} />
            </div>
            <div className="TournamentOverview-name-container">
              <p className="TournamentOverview-name-text">{(info as unknown as IParams).fullName}</p>
            </div>
          </div>
          <div className="TournamentOverview-info-container">
            <div className="TournamentOverview-info-item">
              <FaRunning size={25} color={'white'} />
              <p className="TournamentOverview-text">{((moreInfo as unknown as IParams).sportsName as unknown as IParams[]).map((item, index) => `${index > 0 ? `, ${item}` : item}`)}</p>
            </div>
            <div className="TournamentOverview-info-item">
              <IoIosPeople size={25} color={'white'} />
              <p className="TournamentOverview-text">{(moreInfo as unknown as IParams).countPlayer} Đội tham gia</p>
            </div>
            <div className="TournamentOverview-info-item">
              <p>Khai mạc ngày: {(info as unknown as IParams).openingTime}</p>
            </div>
            <div className="TournamentOverview-info-item">
              <p>Bế mạc ngày: {(info as unknown as IParams).closingTime}</p>
            </div>
            <div className="TournamentOverview-info-item">
              <p>Tiến trình giải: {(moreInfo as unknown as IParams).process}%</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default connect(
  null,
  null
)(TournamentOverview);