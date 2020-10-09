import React from 'react';
import { connect } from 'react-redux';
import { Styles } from 'react-modal';
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import CustomModal from 'components/CustomModal';
import { IBigRequest } from 'interfaces/common';
import { reportViolation } from 'screens/TournamentInfo/actions';
import { IState } from 'redux-saga/reducers';
import './styles.css';

interface IFooterProps extends React.ClassAttributes<Footer> {
  reportViolation(params: IBigRequest): void;
}

interface IFooterState {
  showReportModal: boolean;
  subjectForm: string;
  detailReportForm: string;
  subjectFormError: boolean;
  subjectFormErrorContent: string;
  detailReportFormError: boolean;
  detailReportFormErrorContent: string;
}

const customStyles2: Styles = {
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

class Footer extends React.Component<IFooterProps, IFooterState> {
  constructor(props: IFooterProps) {
    super(props);
    this.state = {
      showReportModal: false,
      subjectForm: '',
      detailReportForm: '',
      subjectFormError: false,
      subjectFormErrorContent: '',
      detailReportFormError: false,
      detailReportFormErrorContent: '',
    };
  }

  shouldComponentUpdate(nextProps: IFooterProps, nextState: IFooterState) {
    return true;
  }

  private handleCloseReportModal = () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hủy form báo cáo?');
    if (confirm === true) {
      this.setState({
        showReportModal: false,
        subjectForm: '',
        subjectFormError: false,
        subjectFormErrorContent: '',
        detailReportForm: '',
        detailReportFormError: false,
        detailReportFormErrorContent: '',
      });
    }
  };

  private validateReportForm = () => {
    let subjectFormError = false;
    let subjectFormErrorContent = '';
    let detailReportFormError = false;
    let detailReportFormErrorContent = '';
    if (this.state.subjectForm.trim() === '') {
      subjectFormError = true;
      subjectFormErrorContent = 'Tiêu đề báo cáo không được trống';
    }
    if (this.state.detailReportForm.trim() === '') {
      detailReportFormError = true;
      detailReportFormErrorContent = 'Nội dung báo cáo không được trống';
    }

    return {
      subjectFormError,
      subjectFormErrorContent,
      detailReportFormError,
      detailReportFormErrorContent,
    };
  }

  private handleConfirmReportModal = () => {
    const {
      subjectFormError,
      subjectFormErrorContent,
      detailReportFormError,
      detailReportFormErrorContent,
    } = this.validateReportForm();
    this.setState({
      subjectFormError,
      subjectFormErrorContent,
      detailReportFormError,
      detailReportFormErrorContent,
    });
    if (subjectFormError === true || detailReportFormError === true) {
      return;
    }
    const params = {
      path: '',
      param: {
      },
      data: {
        content: this.state.detailReportForm.trim(),
        subject: this.state.subjectForm.trim(),
        type: 'syserror',
      },
    }
    this.props.reportViolation(params);
    this.setState({
      showReportModal: false,
      detailReportForm: '',
      detailReportFormError: false,
      detailReportFormErrorContent: '',
      subjectForm: '',
      subjectFormError: false,
      subjectFormErrorContent: '',
    });
  };

  private onChangeSubjectForm = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      subjectForm: value.target.value,
    });
  }

  private onChangeDetailReportForm = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      detailReportForm: value.target.value,
    });
  }

  private handleReportSystem = () => {
    this.setState({
      showReportModal: true,
    });
  };

  render() {
    return (
      <div className={'Footer-container'}>
        <div className={'Footer-column-container'}>
          <img src={require('../../assets/logo.png')} style={{ width: '200px', height: '100%' }} alt={'logo'} />
        </div>
        <div className={'Footer-column-container'}>
          <p>Liên hệ</p>
          <div className={'Footer-icon-container'}>
            <a href={'https://www.facebook.com/nhan.phantrong.355/'} target={'_blank'} rel="noopener noreferrer">
              <AiFillFacebook color={'black'} size={40} />
            </a>
            {/* <a href={'mailto:nhanptse05568@fpt.edu.vn'} target={'_blank'} rel="noopener noreferrer">
              <GoMail color={'black'} size={40} />
            </a> */}
            <a href={'https://github.com/SWP2020/SportTournamentSupportSystem'} target={'_blank'} rel="noopener noreferrer">
              <AiFillGithub color={'black'} size={40} />
            </a>
          </div>
          <p>Địa chỉ: Trường đại học FPT, Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, Thạch Thất, TP. Hà Nội</p>
        </div>
        <div className={'Footer-column-container'}>
          <p>Báo cáo</p>
          <div className={'Footer-report-container'}>
            <p className={'Footer-report-text'} onClick={this.handleReportSystem}>Báo cáo hệ thống</p>
          </div>
        </div>
        <CustomModal
          customStyles={customStyles2}
          handleCloseModal={this.handleCloseReportModal}
          showModal={this.state.showReportModal}
          handleConfirmModal={this.handleConfirmReportModal}
          handleCancelModal={this.handleCloseReportModal}
          cancelButtonText={'Thoát'}
        >
          <div className={'Report-modal-container'}>
            <div className={'Report-modal-header-container'}>
              <h1>Form Báo cáo</h1>
            </div>
            <div className={'Report-modal-subject-input-container'}>
              <p style={{ color: 'white', fontSize: '20px' }}>Tiêu đề: </p>
              <input style={{ width: '200px', height: '25px', marginLeft: '20px' }} type={'text'} onChange={this.onChangeSubjectForm} value={this.state.subjectForm} />
            </div>
            <p style={{ color: 'white', fontSize: '20px' }}>Nội dung báo cáo: </p>
            <textarea rows={7} cols={60} value={this.state.detailReportForm} onChange={this.onChangeDetailReportForm}></textarea>
            {this.state.subjectFormError === true && <p style={{ color: 'red' }}>{this.state.subjectFormErrorContent}</p>}
            {this.state.detailReportFormError === true && <p style={{ color: 'red' }}>{this.state.detailReportFormErrorContent}</p>}
          </div>
        </CustomModal>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  { reportViolation, }
)(Footer);