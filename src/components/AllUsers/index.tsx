import React from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'pagination.css';
import UserOverview from 'components/UserOverview';
import Paging from 'components/Paging';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { searchUsers } from 'components/Header/actions';
import { formatGender, formatUserStatus } from 'utils/common';
import { queryListUsers, deActiveUser, activeUser, setAdmin } from './actions';
import './styles.css';

interface IAllUsersProps extends React.ClassAttributes<AllUsers> {
  listUsers: IParams | null;
  globalSearchString: string;
  type: 'user' | 'admin';

  queryListUsers(param: IBigRequest): void;
  searchUsers(param: IBigRequest): void;
  deActiveUser(param: IBigRequest): void;
  activeUser(param: IBigRequest): void;
  setAdmin(param: IBigRequest): void;
}

interface IAllUsersState {
  activePage: number;
}

class AllUsers extends React.Component<IAllUsersProps, IAllUsersState> {
  private configSheetData: ISheetDataConfig;

  constructor(props: IAllUsersProps) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.configSheetData = {
      fixedColumnCount: 6,
      fixedRowCount: 1,
      rowHeight: 50,
      fetchCount: 3,
      header: [
        {
          label: '',
          width: 120,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style} className={'AllUsers-button-text-hover'}><p className={'AllUsers-button-text'} onClick={() => this.setAdmin(Number(rowData.id))}>Đặt làm admin</p></div>
          ),
        },
        {
          label: 'Cài đặt',
          width: 120,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style} className={'AllUsers-button-text-hover'}>{rowData.status === 'active' ? <p className={'AllUsers-button-text'} onClick={() => this.deActiveUser(Number(rowData.id))}>Hủy kích hoạt</p> : <p className={'AllUsers-button-text'} onClick={() => this.activeUser(Number(rowData.id))}>Kích hoạt</p>}</div>
          ),
        },
        {
          label: 'Id',
          width: 50,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.id}</div>
          ),
        },
        {
          label: 'Họ',
          width: 130,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.lastName}</div>
          ),
        },
        {
          label: 'Tên',
          width: 130,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.firstName}</div>
          ),
        },
        {
          label: 'Tên đăng nhập',
          width: 170,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.username}</div>
          ),
        },
        {
          label: 'Trạng thái',
          width: 120,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{formatUserStatus(rowData.status as string)}</div>
          ),
        },
        {
          label: 'Giới tính',
          width: 70,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{formatGender(rowData.gender as boolean)}</div>
          ),
        },
        {
          label: 'Ngày sinh',
          width: 130,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.dob}</div>
          ),
        },
        {
          label: 'Email',
          width: 300,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.email}</div>
          ),
        },
        {
          label: 'Địa chỉ',
          width: 300,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.address}</div>
          ),
        },
        {
          label: 'Số điện thoại',
          width: 200,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.phoneNumber}</div>
          ),
        },
      ],
    };
  }

  shouldComponentUpdate(nextProps: IAllUsersProps, nextState: IAllUsersState) {
    if (this.props.globalSearchString !== nextProps.globalSearchString && nextProps.globalSearchString === '') {
      this.requestData();
    }
    return true;
  }

  componentDidMount() {
    if (this.props.globalSearchString === '') {
      this.requestData();
    }
  }

  private requestData = () => {
    const params = {
      path: '',
      param: {
        page: this.state.activePage,
        limit: this.props.type === 'user' ? 6 : 10,
        searchString: this.props.globalSearchString,
      },
      data: {},
    }
    this.props.queryListUsers(params);
  }

  private deActiveUser = (id: number) => {
    const params = {
      path: '',
      param: {
        userId: id,
      },
      data: {
      },
    }
    this.props.deActiveUser(params);
  }

  private activeUser = (id: number) => {
    const params = {
      path: '',
      param: {
        userId: id,
      },
      data: {
      },
    }
    this.props.activeUser(params);
  }

  private setAdmin = (id: number) => {
    const params = {
      path: '',
      param: {
        userId: id,
      },
      data: {
      },
    }
    this.props.setAdmin(params);
  }

  private onChangeSelectedPage = (pageNumber: number) => {
    this.setState({ activePage: pageNumber }, () => {
      if (this.props.globalSearchString !== '') {
        const params = {
          path: '',
          param: {
            page: pageNumber,
            limit: this.props.type === 'user' ? 6 : 10,
            searchString: this.props.globalSearchString,
          },
          data: {},
        };
        this.props.searchUsers(params);
      } else {
        this.requestData();
      }
    });
  }

  render() {
    return (
      <div className="AllUsers-container-container">
        <p className="AllUsers-header-text">Danh sách người dùng</p>
        {this.props.globalSearchString !== '' && <p className="AllUsers-search-text">Kết quả tìm kiếm cho: "{this.props.globalSearchString}"</p>}
        <div className={`${this.props.type === 'user' ? 'AllUsers-container' : 'AllUsers-container-admin'}`}>
          {this.props.listUsers && this.props.listUsers.Users ? ((this.props.listUsers.Users as unknown as IParams[]).length > 0 ? (this.props.type === 'user' ? (this.props.listUsers.Users as IParams[]).map(
            (item, index) => <UserOverview info={item} index={index} key={index} />) : <SheetData config={this.configSheetData} data={this.props.listUsers.Users as IParams[]} />) : <p>Không tìm thấy kết quả nào!</p>) :
            <Skeleton />
          }
        </div>
        <Paging currentPage={this.state.activePage} totalPage={this.props.listUsers != null ? this.props.listUsers.TotalPage as number : 0} onChangeSelectedPage={this.onChangeSelectedPage} />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    listUsers: state.listUsers,
    globalSearchString: state.globalSearchString,
  };
};

export default connect(
  mapStateToProps,
  { setAdmin, queryListUsers, searchUsers, deActiveUser, activeUser }
)(AllUsers);