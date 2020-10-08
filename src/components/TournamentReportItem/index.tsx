import React from 'react';
import { connect } from 'react-redux';
import { Styles } from 'react-modal';
import CustomModal from 'components/CustomModal';
import { IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import './styles.css';

interface ITournamentReportItemProps extends React.ClassAttributes<TournamentReportItem> {
  info: IParams;
  index: number;
}

interface ITournamentReportItemState {
  seeMoreInfo: boolean;
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

class TournamentReportItem extends React.Component<ITournamentReportItemProps, ITournamentReportItemState> {
  constructor(props: ITournamentReportItemProps) {
    super(props);
    this.state = {
      seeMoreInfo: false,
    };
  }

  shouldComponentUpdate(nextProps: ITournamentReportItemProps, nextState: ITournamentReportItemState) {
    return true;
  }

  private handleSeeMore = () => {
    this.setState({
      seeMoreInfo: true,
    });
  }

  private handleCloseModal = () => {
    this.setState({
      seeMoreInfo: false,
    });
  }

  private handleConfirmModal = () => {
  }

  render() {
    return (
      <div className="TournamentReportItem-info-container">
        <div className="TournamentReportItem-container">
          <div className="TournamentReportItem-container-container" onClick={this.handleSeeMore}>
            <div className="TournamentReportItem-order-number-container">
              <div className="TournamentReportItem-order-number-box">
                <p style={{ color: 'white' }}>{this.props.index + 1}</p>
              </div>
            </div>
            <div className="TournamentReportItem-team-name-container">
              <p style={{ color: 'white' }}>{this.props.info && this.props.info.subject}</p>
            </div>
          </div>
        </div>
        <CustomModal
          customStyles={customStyles}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.seeMoreInfo}
          handleConfirmModal={this.handleConfirmModal}
          confirmButtonVisible={false}
          handleCancelModal={this.handleCloseModal}
          cancelButtonText={'Thoát'}
        >
          <div className={'Report-modal-container'}>
            <div className={'Report-modal-header-container'}>
              <h1>Báo cáo</h1>
            </div>
            <p style={{ color: 'white', fontSize: '25px' }}>Tiêu đề: <span style={{ color: 'white', fontSize: '18px' }}>{this.props.info.subject}</span></p>
            <p style={{ color: 'white', fontSize: '25px' }}>Nội dung báo cáo: <span style={{ color: 'white', fontSize: '18px' }}>{this.props.info.content}</span></p>
          </div>
        </CustomModal>
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
  null
)(TournamentReportItem);