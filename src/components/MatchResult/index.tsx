import React from 'react';
import { connect } from 'react-redux';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import './styles.css';

interface IMatchResultProps extends React.ClassAttributes<MatchResult> {
  teamsInfo: IParams[];
}

interface IMatchResultState {
}


class MatchResult extends React.Component<IMatchResultProps, IMatchResultState> {
  private configSheetData: ISheetDataConfig;

  constructor(props: IMatchResultProps) {
    super(props);
    this.state = {
    };
    this.configSheetData = {
      fixedColumnCount: 4,
      fixedRowCount: 1,
      rowHeight: 40,
      fetchCount: props.teamsInfo.length,
      header: [
        {
          label: 'Thứ tự',
          width: 50,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowIndex}</div>
          ),
        },
        // {
        //   label: 'Tên đội',
        //   width: 140,
        //   style: { justifyContent: 'center' },
        //   element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
        //     <div style={style}>{rowData.teamInfo ? (rowData.teamInfo as IParams).name : ''}</div>
        //   ),
        // },
        {
          label: 'Hạng',
          width: 40,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.top}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        {
          label: 'Kết quả',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.score}</div>
          ),
        },
        // {
        //   label: 'Kết quả chung cuộc',
        //   width: 190,
        //   style: { justifyContent: 'center' },
        //   element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
        //     <div style={style}>{rowData.stockCode}</div>
        //   ),
        // },
        // {
        //   label: 'Kết quả chung cuộc',
        //   width: 190,
        //   style: { justifyContent: 'center' },
        //   element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
        //     <div style={style}>{rowData.stockCode}</div>
        //   ),
        // },
        // {
        //   label: 'Kết quả chung cuộc',
        //   width: 190,
        //   style: { justifyContent: 'center' },
        //   element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
        //     <div style={style}>{rowData.stockCode}</div>
        //   ),
        // },
        // {
        //   label: '',
        //   width: 90,
        //   style: { justifyContent: 'center' },
        //   element: (rowData: IParams, rowIndex: number, cellStyle?: React.CSSProperties) =>
        //     this.props.isShowOrderHistory !== true && (
        //       <div
        //         style={cellStyle}
        //         className={style.ButtonCancel}
        //         onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        //           e.stopPropagation();

        //           this.onClickCell({
        //             action: 'cancel',
        //             data: rowData,
        //             index: rowIndex,
        //           });
        //         }}
        //       >
        //         {this.props.t('Cancel')}
        //       </div>
        //     ),
        // },
      ],
    };
  }

  render() {
    return (
      <div
        className="MatchResult-container"
      >
        {/* <SheetData config={this.configSheetData} data={this.props.teamsInfo as IParams[]}/> */}
      </div >
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
)(MatchResult);