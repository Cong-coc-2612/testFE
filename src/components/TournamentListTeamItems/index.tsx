import React from 'react';
import { connect } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './styles.css';

interface ITournamentListTeamItemsProps extends React.ClassAttributes<TournamentListTeamItems> {
}

interface ITournamentListTeamItemsState {
  seeMoreInfo: boolean;
}

class TournamentListTeamItems extends React.Component<ITournamentListTeamItemsProps, ITournamentListTeamItemsState> {
  constructor(props: ITournamentListTeamItemsProps) {
    super(props);
    this.state = {
      seeMoreInfo: false,
    };
  }

  private handleSeeMore = () => {
    this.setState({
      seeMoreInfo: !this.state.seeMoreInfo,
    });
  }

  render() {
    return (
      <div className="TournamentListTeamItems-info-container">
        <div className="TournamentListTeamItems-container">
          <div className="TournamentListTeamItems-container-container" onClick={this.handleSeeMore}>
            <div className="TournamentListTeamItems-order-number-container">
              <div className="TournamentListTeamItems-order-number-box">
                <p>1</p>
              </div>
            </div>
            <div className="TournamentListTeamItems-team-name-container">
              <p>G2</p>
            </div>
            <div className="TournamentListTeamItems-team-setting-container">
              <div className="TournamentListTeamItems-team-setting-container-container">
                <FaEdit className="TournamentListTeamItems-team-setting-icon" />
              </div>
              <div className="TournamentListTeamItems-team-setting-container-container">
                <MdDelete className="TournamentListTeamItems-team-setting-icon" />
              </div>
            </div>
          </div>
        </div>
        {this.state.seeMoreInfo === true &&
          <div className="TournamentListTeamItems-moreInfo-container">
            <div className="TournamentListTeamItems-moreInfo-normalInfo-container">
              <p>Người quản lý đội: Phạm minh hiếu (hieupm@gmail.com)</p>
              <p>Danh sách thành viên</p>
            </div>
            <div className="TournamentListTeamItems-moreInfo-listTeamInfo-container">
              <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-container">
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-orderNumber">
                  <p>Thứ tự</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-memberName">
                  <p>Tên</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-gender">
                  <p>Giới tính</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-dob">
                  <p>Ngày sinh</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-email">
                  <p>Email</p>
                </div>
              </div>
              <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-container TournamentListTeamItems-moreInfo-listTeamInfo-item-container1">
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-orderNumber">
                  <p>1</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-memberName">
                  <p>Phan Trọng Nhân</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-gender">
                  <p>Nam</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-dob">
                  <p>30/09/1998</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-email">
                  <p>caulamgithelol.lmht@gmail.com</p>
                </div>
              </div>
              <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-container TournamentListTeamItems-moreInfo-listTeamInfo-item-container2">
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-orderNumber">
                  <p>2</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-memberName">
                  <p>Phan Trọng Nhân</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-gender">
                  <p>Nam</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-dob">
                  <p>30/09/1998</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-email">
                  <p>caulamgithelol.lmht@gmail.com</p>
                </div>
              </div>
              <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-container TournamentListTeamItems-moreInfo-listTeamInfo-item-container1">
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-orderNumber">
                  <p>3</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-memberName">
                  <p>Phan Trọng Nhân</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-gender">
                  <p>Nam</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-dob">
                  <p>30/09/1998</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-email">
                  <p>caulamgithelol.lmht@gmail.com</p>
                </div>
              </div>
              <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-container TournamentListTeamItems-moreInfo-listTeamInfo-item-container2">
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-orderNumber">
                  <p>4</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-memberName">
                  <p>Phan Trọng Nhân</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-gender">
                  <p>Nam</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-dob">
                  <p>30/09/1998</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-email">
                  <p>caulamgithelol.lmht@gmail.com</p>
                </div>
              </div>
              <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-container TournamentListTeamItems-moreInfo-listTeamInfo-item-container1">
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-orderNumber">
                  <p>5</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-memberName">
                  <p>Phan Trọng Nhân</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-gender">
                  <p>Nam</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-dob">
                  <p>30/09/1998</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-email">
                  <p>caulamgithelol.lmht@gmail.com</p>
                </div>
              </div>
              <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-container TournamentListTeamItems-moreInfo-listTeamInfo-item-container2">
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-orderNumber">
                  <p>6</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-memberName">
                  <p>Phan Trọng Nhân</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-gender">
                  <p>Nam</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-dob">
                  <p>30/09/1998</p>
                </div>
                <div className="TournamentListTeamItems-moreInfo-listTeamInfo-item-email">
                  <p>caulamgithelol.lmht@gmail.com</p>
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

export default connect(
  null,
  null
)(TournamentListTeamItems);