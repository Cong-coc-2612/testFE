import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IParams } from 'interfaces/common';
import './styles.css';

interface IUserOverviewProps extends React.ClassAttributes<UserOverview> {
  info: IParams;
  index: number;
}

interface IUserOverviewState {
}

class UserOverview extends React.Component<IUserOverviewProps, IUserOverviewState> {
  constructor(props: IUserOverviewProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { info } = this.props;
    return (
      <Link to={`/user/${this.props.info.id}`} style={{ textDecoration: 'none' }}>
        <div className="UserOverview-container">
          <div className="UserOverview-avatar-image-container">
            <div className="UserOverview-avatar-container">
              <img className={'UserOverview-avatar-image'} src={require('../../assets/7ab1b0125d485c8dd6a4e78832b0a4b2fbed3cf8.png')} alt={'logo'} />
            </div>
            <div className="UserOverview-name-container">
              <p className="UserOverview-name-text">{`${info.firstName} ${info.lastName}`}</p>
              <p>{`Email: ${info.email}`}</p>
              {info.phoneNumber != null && <p>{`Số điện thoại: ${info.phoneNumber}`}</p>}
            </div>
          </div>
          {/* <div className="UserOverview-info-container">
            <div className="UserOverview-info-item">
              <FaRunning size={25} color={'white'} />
              <p className="UserOverview-text">Bóng bàn, cờ vua, ...</p>
            </div>
            <div className="UserOverview-info-item">
              <IoIosPeople size={25} color={'white'} />
              <p className="UserOverview-text">10 Đội tham gia</p>
            </div>
            <div className="UserOverview-info-item">
              <p>Khai mạc ngày: {info.openingTime}</p>
            </div>
            <div className="UserOverview-info-item">
              <p>Bế mạc ngày: {info.closingTime}</p>
            </div>
            <div className="UserOverview-info-item">
              <p>Tiến trình giải: 15%</p>
            </div>
          </div> */}
        </div>
      </Link>
    );
  }
}

export default connect(
  null,
  null
)(UserOverview);