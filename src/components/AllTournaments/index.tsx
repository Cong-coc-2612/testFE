import React from 'react';
import { connect } from 'react-redux';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import Skeleton from 'react-loading-skeleton';
import 'pagination.css';
import TournamentOverview from 'components/TournamentOverview';
import Paging from 'components/Paging';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { searchTournaments } from 'components/Header/actions';
import { queryListTournament, stopTournament, continueTournament } from './actions';
import {
  queryAllSports
} from 'screens/CompetitionInfo/actions';
import './styles.css';
import { formatTournamentStatus } from 'utils/common';
import { TOURNAMENT_STATUS } from 'global';
import { formatDateToDisplay } from 'utils/datetime';

interface IAllTournamentsProps extends React.ClassAttributes<AllTournaments> {
  listTournament: IParams | null;
  globalSearchString: string;
  type: 'user' | 'admin';
  allSports: IParams[];

  queryListTournament(param: IBigRequest): void;
  searchTournaments(param: IBigRequest): void;
  stopTournament(param: IBigRequest): void;
  continueTournament(param: IBigRequest): void;
  queryAllSports(): void;
}

interface IAllTournamentsState {
  activePage: number;
  selectedSport: ValueType<OptionTypeBase>;
  selectedStatus: ValueType<OptionTypeBase>;
}

let sportOptions: IParams[] = [];
let statusOptions: IParams[] = [
  {
    value: '', label: '(Tất cả)'
  },
  {
    value: TOURNAMENT_STATUS.INITIALIZING, label: 'Đang khởi tạo'
  },
  {
    value: TOURNAMENT_STATUS.OPENING, label: 'Đang mở đăng kí'
  },
  {
    value: TOURNAMENT_STATUS.PROCESSING, label: 'Đang diễn ra'
  },
  {
    value: TOURNAMENT_STATUS.STOPPED, label: 'Đang bị ngưng bởi quản trị viên'
  },
  {
    value: TOURNAMENT_STATUS.FINISHED, label: 'Đã kết thúc'
  },
];

class AllTournaments extends React.Component<IAllTournamentsProps, IAllTournamentsState> {
  private configSheetData: ISheetDataConfig;

  constructor(props: IAllTournamentsProps) {
    super(props);
    this.state = {
      activePage: 1,
      selectedSport: { value: -1, label: '(Tất cả)' },
      selectedStatus: {
        value: '', label: '(Tất cả)'
      },
    };
    this.configSheetData = {
      fixedColumnCount: 4,
      fixedRowCount: 1,
      rowHeight: 50,
      fetchCount: 3,
      header: [
        {
          label: 'Cài đặt',
          width: 120,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style} className={'AllUsers-button-text-hover'}>{(rowData.Tournament as IParams).status === 'processing' ? <p className={'AllUsers-button-text'} onClick={() => this.stopTournament(Number((rowData.Tournament as IParams).id))}>Dừng giải</p> : ((rowData.Tournament as IParams).status === 'stopped' && <p className={'AllUsers-button-text'} onClick={() => this.continueTournament(Number((rowData.Tournament as IParams).id))}>Tiếp tục giải</p>)}</div>
          ),
        },
        {
          label: 'Id',
          width: 50,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{(rowData.Tournament as IParams).id}</div>
          ),
        },
        {
          label: 'Tên đầy đủ',
          width: 220,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{(rowData.Tournament as IParams).fullName}</div>
          ),
        },
        {
          label: 'Tên ngắn',
          width: 200,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{(rowData.Tournament as IParams).shortName}</div>
          ),
        },
        {
          label: 'Trạng thái',
          width: 150,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{formatTournamentStatus((rowData.Tournament as IParams).status as string)}</div>
          ),
        },
        {
          label: 'Số đội tham gia',
          width: 130,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{(rowData.OtherInformation as IParams).countTeam}</div>
          ),
        },
        {
          label: 'Tiến trình giải',
          width: 130,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{(rowData.OtherInformation as IParams).process}%</div>
          ),
        },
        {
          label: 'Nhà tài trợ',
          width: 170,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{(rowData.Tournament as IParams).donor}</div>
          ),
        },
        {
          label: 'Nơi khai mạc',
          width: 300,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{(rowData.Tournament as IParams).openingLocation}</div>
          ),
        },
        {
          label: 'Ngày khai mạc',
          width: 250,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{formatDateToDisplay((rowData.Tournament as IParams).openingTime as string,'yyyy-MM-dd' , 'yyyy-MM-dd HH:mm:ss')}</div>
          ),
        },
        {
          label: 'Nơi bế mạc',
          width: 300,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{(rowData.Tournament as IParams).closingLocation}</div>
          ),
        },
        {
          label: 'Ngày bế mạc',
          width: 250,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{formatDateToDisplay((rowData.Tournament as IParams).closingTime as string, 'yyyy-MM-dd', 'yyyy-MM-dd HH:mm:ss')}</div>
          ),
        },
        // {
        //   label: 'Địa chỉ',
        //   width: 300,
        //   style: { justifyContent: 'center' },
        //   element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
        //     <div style={style}>{rowData.address}</div>
        //   ),
        // },
        // {
        //   label: 'Số điện thoại',
        //   width: 200,
        //   style: { justifyContent: 'center' },
        //   element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
        //     <div style={style}>{rowData.phoneNumber}</div>
        //   ),
        // },
      ],
    };
  }

  shouldComponentUpdate(nextProps: IAllTournamentsProps, nextState: IAllTournamentsState) {
    if (this.props.allSports !== nextProps.allSports) {
      sportOptions = [];
      nextProps.allSports.map((item, index) => sportOptions.push({ value: item.id, label: item.fullName }));
      sportOptions.unshift({ value: -1, label: '(Tất cả)' });
      if (nextProps.allSports.length > 0) {
        this.setState({
          selectedSport: { value: -1, label: '(Tất cả)' },
        });
      }
    }
    if (this.props.globalSearchString !== nextProps.globalSearchString) {
      if (nextProps.globalSearchString === '') {
        this.requestData();
      }
      this.setState({
        selectedSport: { value: -1, label: '(Tất cả)' },
        selectedStatus: {
          value: '', label: '(Tất cả)'
        },
      });
    }
    return true;
  }

  componentDidMount() {
    this.props.queryAllSports();
    if (this.props.globalSearchString === '') {
      this.requestData();
    }
  }

  private stopTournament = (id: number) => {
    const params = {
      path: '',
      param: {
        tournamentId: id,
      },
      data: {},
    }
    this.props.stopTournament(params);
  }

  private continueTournament = (id: number) => {
    const params = {
      path: '',
      param: {
        tournamentId: id,
      },
      data: {},
    }
    this.props.continueTournament(params);
  }

  private requestData = (page = 1) => {
    const params = {
      path: '',
      param: {
        searchString: '',
        page,
        limit: this.props.type === 'user' ? 9 : 10,
        sportId: (this.state.selectedSport as IParams).value,
        status: (this.state.selectedStatus as IParams).value,
      },
      data: {},
    }
    this.props.queryListTournament(params);
  }

  private onChangeSelectedPage = (pageNumber: number) => {
    if (this.props.globalSearchString !== '') {
      const params = {
        path: '',
        param: {
          page: pageNumber,
          limit: this.props.type === 'user' ? 9 : 10,
          searchString: this.props.globalSearchString,
          sportId: (this.state.selectedSport as IParams).value,
          status: (this.state.selectedStatus as IParams).value,
        },
        data: {},
      };
      this.props.searchTournaments(params);
    } else {
      this.requestData(pageNumber);
    }
    this.setState({ activePage: pageNumber });
  }

  private onChangeSport = (value: ValueType<OptionTypeBase>) => {
    if (this.props.globalSearchString !== '') {
      const params = {
        path: '',
        param: {
          page: 1,
          limit: this.props.type === 'user' ? 9 : 10,
          searchString: this.props.globalSearchString,
          sportId: (value as IParams).value,
          status: (this.state.selectedStatus as IParams).value,
        },
        data: {},
      };
      this.props.searchTournaments(params);
    } else {
      const params = {
        path: '',
        param: {
          page: 1,
          limit: this.props.type === 'user' ? 9 : 10,
          searchString: '',
          sportId: (value as IParams).value,
          status: (this.state.selectedStatus as IParams).value,
        },
        data: {},
      };
      this.props.searchTournaments(params);
    }
    this.setState({
      selectedSport: value,
    });
  }

  private onChangeStatus = (value: ValueType<OptionTypeBase>) => {
    if (this.props.globalSearchString !== '') {
      const params = {
        path: '',
        param: {
          page: 1,
          limit: this.props.type === 'user' ? 9 : 10,
          searchString: this.props.globalSearchString,
          sportId: (this.state.selectedSport as IParams).value,
          status: (value as IParams).value,
        },
        data: {},
      };
      this.props.searchTournaments(params);
    } else {
      const params = {
        path: '',
        param: {
          page: 1,
          limit: this.props.type === 'user' ? 9 : 10,
          searchString: '',
          sportId: (this.state.selectedSport as IParams).value,
          status: (value as IParams).value,
        },
        data: {},
      };
      this.props.searchTournaments(params);
    }
    this.setState({
      selectedStatus: value,
    });
  }

  render() {
    return (
      <div className="AllTournaments-container-container">
        <p className="AllTournaments-header-text">Tất cả các giải đấu</p>
        <div className="AllTournaments-header-filter-container">
          <div className="AllTournaments-header-filter-container AllTournaments-header-filter">
            <p>Bộ môn: </p>
            <Select
              options={sportOptions}
              className="Select"
              defaultValue={this.state.selectedSport}
              value={this.state.selectedSport}
              onChange={this.onChangeSport}
              maxMenuHeight={140}
            />
          </div>
          <div className="AllTournaments-header-filter-container AllTournaments-header-filter">
            <p style={{ width: '80px' }}>Trạng thái: </p>
            <Select
              options={statusOptions}
              className="Select"
              defaultValue={this.state.selectedStatus}
              value={this.state.selectedStatus}
              onChange={this.onChangeStatus}
              maxMenuHeight={140}
            />
          </div>
        </div>
        {this.props.globalSearchString !== '' && <p className="AllTournaments-search-text">Kết quả tìm kiếm cho: "{this.props.globalSearchString}"</p>}
        <div className={`${this.props.type === 'user' ? 'AllTournaments-container' : 'AllTournaments-container-admin'}`}>
          {this.props.listTournament && this.props.listTournament.Tournaments ? ((this.props.listTournament.Tournaments as unknown as IParams[]).length > 0 ? (this.props.type === 'user' ? (this.props.listTournament.Tournaments as IParams[]).map(
            (item, index) => <TournamentOverview info={item} index={index} key={index} />) : <SheetData config={this.configSheetData} data={this.props.listTournament.Tournaments as IParams[]} />) : <p>Không tìm thấy kết quả nào!</p>) :
            <Skeleton />
          }
        </div>
        <Paging currentPage={this.state.activePage} totalPage={this.props.listTournament != null ? this.props.listTournament.TotalPage as number : 0} onChangeSelectedPage={this.onChangeSelectedPage} />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    listTournament: state.listTournament,
    globalSearchString: state.globalSearchString,
    allSports: state.allSports,
  };
};

export default connect(
  mapStateToProps,
  { queryListTournament, searchTournaments, stopTournament, continueTournament, queryAllSports }
)(AllTournaments);