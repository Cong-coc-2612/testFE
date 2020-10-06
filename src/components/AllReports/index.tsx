import React from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { Styles } from 'react-modal';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import 'pagination.css';
import Paging from 'components/Paging';
import CustomModal from 'components/CustomModal';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { queryAllReports } from './actions';
import './styles.css';

interface IAllReportsProps extends React.ClassAttributes<AllReports> {
  listReports: IParams | null;

  queryAllReports(param: IBigRequest): void;
}

interface IAllReportsState {
  activePage: number;
  showModal: boolean;
  selectedFilter: ValueType<OptionTypeBase>;
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

let reportOptions: IParams[] = [
  { label: 'Báo cáo giải', value: 1 },
  { label: 'Báo cáo hệ thống', value: 2 },
];

class AllReports extends React.Component<IAllReportsProps, IAllReportsState> {
  private info: IParams | null = null;

  constructor(props: IAllReportsProps) {
    super(props);
    this.state = {
      activePage: 1,
      showModal: false,
      selectedFilter: { label: 'Báo cáo hệ thống', value: 2 },
    };
  }

  shouldComponentUpdate(nextProps: IAllReportsProps, nextState: IAllReportsState) {
    if (this.state.selectedFilter !== nextState.selectedFilter) {
      this.setState({
        activePage: 1,
      }, () => this.requestData());
    }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = (page = 1) => {
    const params = {
      path: '',
      param: {
        page,
        limit: 10,
      },
      data: {
        type: (this.state.selectedFilter as IParams).value,
      },
    }
    this.props.queryAllReports(params);
  }

  private onChangeSelectedPage = (pageNumber: number) => {
    this.requestData(pageNumber);
    this.setState({ activePage: pageNumber });
  }

  private handleSeeMore = (item: IParams) => {
    this.info = item;
    this.setState({
      showModal: true,
    });
  }

  private handleConfirmModal = () => {
  }

  private handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }

  private onChangeSelectedFilter = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedFilter: value,
    });
  }

  render() {
    return (
      <div className="AllReports-container-container">
        <p className="AllReports-header-text">Tất cả các báo cáo</p>
        <Select
          options={reportOptions}
          className="Select"
          defaultValue={this.state.selectedFilter}
          value={this.state.selectedFilter}
          onChange={this.onChangeSelectedFilter}
        />
        <div className="AllReports-container-admin">
          {this.props.listReports &&
            this.props.listReports.Reports ?
            ((this.props.listReports.Reports as unknown as IParams[]).length > 0 ?
              (this.props.listReports.Reports as unknown as IParams[]).map((item, index) =>
                <div className="AllReports-info-container">
                  <div className="UserInfoTeamsItem-container">
                    <div className="UserInfoTeamsItem-container-container" onClick={() => this.handleSeeMore(item)}>
                      <div className="UserInfoTeamsItem-order-number-container">
                        <div className="UserInfoTeamsItem-order-number-box">
                          <p style={{ color: 'white' }}>{index + 1}</p>
                        </div>
                      </div>
                      <div className="UserInfoTeamsItem-team-name-container">
                        <p style={{ color: 'white' }}>{item.subject}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
              :
              <p>Không tìm thấy kết quả nào!</p>) :
            <Skeleton />
          }
        </div>
        <Paging currentPage={this.state.activePage} totalPage={this.props.listReports != null ? this.props.listReports.TotalPage as number : 0} onChangeSelectedPage={this.onChangeSelectedPage} />
        <CustomModal
          customStyles={customStyles}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
          handleConfirmModal={this.handleConfirmModal}
          confirmButtonVisible={false}
        >
          <div className={'Report-modal-container'}>
            <div className={'Report-modal-header-container'}>
              <h1>Báo cáo</h1>
            </div>
            <p style={{ color: 'white', fontSize: '25px' }}>Tiêu đề: <span style={{ color: 'white', fontSize: '18px' }}>{this.info && this.info.subject}</span></p>
            <p style={{ color: 'white', fontSize: '25px' }}>Nội dung báo cáo: <span style={{ color: 'white', fontSize: '18px' }}>{this.info && this.info.content}</span></p>
          </div>
        </CustomModal>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    listReports: state.listReports,
  };
};

export default connect(
  mapStateToProps,
  { queryAllReports }
)(AllReports);