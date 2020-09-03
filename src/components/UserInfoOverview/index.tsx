import React from 'react';
import { connect } from 'react-redux';
import { FaTrophy } from 'react-icons/fa';
import './styles.css';

interface IUserInfoOverviewProps extends React.ClassAttributes<UserInfoOverview> {
}

interface IUserInfoOverviewState {
}

class UserInfoOverview extends React.Component<IUserInfoOverviewProps, IUserInfoOverviewState> {
  constructor(props: IUserInfoOverviewProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="UserInfoOverview-container">
        <p className="UserInfoOverview-header-text">Tổng quan chỉ số</p>
        <div className="UserInfoOverview-overview-info-container">
          <div className="UserInfoOverview-overview-info-item">
            <p className="UserInfoOverview-number-text">1</p>
            <p>Giải đấu đã tạo</p>
          </div>
          <div className="UserInfoOverview-overview-info-item">
            <p className="UserInfoOverview-number-text">2</p>
            <p>Đội đã lập</p>
          </div>
          <div className="UserInfoOverview-overview-info-item">
            <p className="UserInfoOverview-number-text">3</p>
            <p>Tin đã viết</p>
          </div>
          <div className="UserInfoOverview-overview-info-item">
            <p className="UserInfoOverview-number-text">2</p>
            <p>Số lượt comment</p>
          </div>
        </div>
        <p className="UserInfoOverview-header-text">Tổng quan thứ hạng</p>
        <div className="UserInfoOverview-overview-info-container">
          <div className="UserInfoOverview-top-info-item">
            <div className="UserInfoOverview-top-info-item-left">
              <FaTrophy className="UserInfoOverview-top1-icon" size={30} />
              <p>1st</p>
            </div>
            <div className="UserInfoOverview-top-info-item-right">
              <p className="UserInfoOverview-number-text">1</p>
            </div>
          </div>
          <div className="UserInfoOverview-top-info-item">
            <div className="UserInfoOverview-top-info-item-left">
              <FaTrophy className="UserInfoOverview-top2-icon" size={30} />
              <p>2nd</p>
            </div>
            <div className="UserInfoOverview-top-info-item-right">
              <p className="UserInfoOverview-number-text">1</p>
            </div>
          </div>
          <div className="UserInfoOverview-top-info-item">
            <div className="UserInfoOverview-top-info-item-left">
              <FaTrophy className="UserInfoOverview-top3-icon" size={30} />
              <p>3rd</p>
            </div>
            <div className="UserInfoOverview-top-info-item-right">
              <p className="UserInfoOverview-number-text">1</p>
            </div>
          </div>
          <div className="UserInfoOverview-top-info-item">
            <div className="UserInfoOverview-top-info-item-left">
              <p>Top 10</p>
            </div>
            <div className="UserInfoOverview-top-info-item-right">
              <p className="UserInfoOverview-number-text">1</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(UserInfoOverview);