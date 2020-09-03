import React from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-block-ui/style.css';
import Paging from 'components/Paging';
import TournamentReportItem from 'components/TournamentReportItem';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { queryTournamentReport } from './actions';
import './styles.css';

interface ITournamentReportProps extends React.ClassAttributes<TournamentReport> {
  tournamentInfo: IParams;
  tournamentId: number;
  listTournamentReport: IParams | null;

  queryTournamentReport(params: IBigRequest): void;
}

interface ITournamentReportState {
  activePage: number;
}

class TournamentReport extends React.Component<ITournamentReportProps, ITournamentReportState> {
  constructor(props: ITournamentReportProps) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  shouldComponentUpdate(nextProps: ITournamentReportProps, nextState: ITournamentReportState) {
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = (page = 1) => {
    const params: IBigRequest = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
      },
      data: {
        page,
        limit: 5,
      },
    };
    this.props.queryTournamentReport(params);
  }

  private onChangeSelectedPage = (pageNumber: number) => {
    this.requestData(pageNumber);
    this.setState({ activePage: pageNumber });
  }

  render() {
    return (
      <div className={'TournamentReport-container'}>
        {this.props.listTournamentReport != null && this.props.listTournamentReport.Reports != null ? ((this.props.listTournamentReport.Reports as IParams[]).length > 0 ?
          (this.props.listTournamentReport.Reports as IParams[]).map(
            (item, index) => <TournamentReportItem info={item} index={index} key={index} />
          ) : <p>Không có báo cáo nào!</p>) :
          <Skeleton />
        }
        <Paging currentPage={this.state.activePage} totalPage={this.props.listTournamentReport != null ? this.props.listTournamentReport.TotalPage as number : 0} onChangeSelectedPage={this.onChangeSelectedPage} />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    listTournamentReport: state.listTournamentReport,
  };
};

export default connect(
  mapStateToProps,
  { queryTournamentReport, }
)(TournamentReport);