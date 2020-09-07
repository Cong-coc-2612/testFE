import React from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'pagination.css';
import TournamentOverview from 'components/TournamentOverview';
import Paging from 'components/Paging';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { searchTournaments } from 'components/Header/actions';
import { queryListTournament, stopTournament, continueTournament } from './actions';
import './styles.css';
import { formatTournamentStatus } from 'utils/common';

interface IAllTournamentsProps extends React.ClassAttributes<AllTournaments> {
  listTournament: IParams | null;
  globalSearchString: string;
  type: 'user' | 'admin';

  queryListTournament(param: IBigRequest): void;
  searchTournaments(param: IBigRequest): void;
  stopTournament(param: IBigRequest): void;
  continueTournament(param: IBigRequest): void;
}

interface IAllTournamentsState {
  activePage: number;
}

class AllTournaments extends React.Component<IAllTournamentsProps, IAllTournamentsState> {
  private configSheetData: ISheetDataConfig;

  constructor(props: IAllTournamentsProps) {
    super(props);
    this.state = {
      activePage: 1,
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
            <div style={style}>{(rowData.Tournament as IParams).openingTime}</div>
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
            <div style={style}>{(rowData.Tournament as IParams).closingTime}</div>
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
    console.log('this.props.type', this.props.type);
    const params = {
      path: '',
      param: {
        page,
        limit: this.props.type === 'user' ? 9 : 10,
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
        },
        data: {},
      };
      this.props.searchTournaments(params);
    } else {
      this.requestData(pageNumber);
    }
    this.setState({ activePage: pageNumber });
  }

  render() {
    return (
      <div className="AllTournaments-container-container">
        <p className="AllTournaments-header-text">Tất cả các giải đấu</p>
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
  };
};

export default connect(
  mapStateToProps,
  { queryListTournament, searchTournaments, stopTournament, continueTournament }
)(AllTournaments);