import * as React from 'react';
// import ReduxBlockUi from 'react-block-ui/redux';
import { AutoSizer, MultiGrid, Index, ScrollParams, GridCellProps } from 'react-virtualized';
import './styles.css';
import { IParams } from 'interfaces/common';

// const STYLE = {
//   // backgroundColor: 'red',
// };

interface ISheetDataColumn {
  label: string | React.ReactElement;
  width: number;
  style?: React.CSSProperties;
  element(rowData: IParams, index: number, style?: React.CSSProperties): React.ReactNode;
}

export interface ISheetDataConfig {
  fetchCount: number;
  fixedColumnCount: number;
  fixedRowCount: number;
  rowHeight: number;
  hideHeader?: boolean;
  header: ISheetDataColumn[];
  headerStyle?: React.CSSProperties;
  totalWidth?: number;
  totalFixedWidth?: number;
}

interface ISheetDataProps extends React.ClassAttributes<SheetData> {
  data?: IParams[] | null;
  singleData?: IParams | null;
  config: ISheetDataConfig;
  isRowClickable?: boolean;
  boardMode?: boolean;
  isShowOrderHistory?: boolean;
  isPlusRow?: boolean;
  isTotalRow?: boolean;
  blockAction?: string[];
  unBlockAction?: string[];
  haveTotalRow?: boolean;

  onClickRow?(rowData: IParams): void;
  sheetDataRef?(ref: SheetData): void;
  requestLoadMore?(): void;
}

interface ISheetDataState {
  hoveredRowIndex?: number | null;
  hoveredColumnIndex?: number | null;
  onClickRowIndex?: number | null;
}

export class SheetData extends React.Component<ISheetDataProps, ISheetDataState> {
  static defaultProps = {
    isRowClickable: true,
    boardMode: false,
    isTotalRow: false,
    haveTotalRow: false,
  };

  private list: IParams[] = [{}];
  private lock = false;
  private virtualList: MultiGrid | undefined;
  // private config: ISheetDataConfig;
  private loadMore = true;

  constructor(props: ISheetDataProps) {
    super(props);
    this.state = {};
    // this.config = JSON.parse(JSON.stringify(this.props.config));
    // this.config.totalWidth = this.config.header.reduce((a: number, b: ISheetDataColumn) => a + b.width, 0);
    // this.config.totalFixedWidth = this.config.header.reduce(
    //   (a: number, b: ISheetDataColumn, index: number) => a + (index < this.config.fixedColumnCount ? b.width : 0),
    //   0
    // );
  }

  componentDidMount = () => {
    if (this.props.data != null) {
      this.processData();
    }
    // if (this.props.singleData != null) {
    //   this.processSingleData();
    // }
  };

  shouldComponentUpdate(nextProps: ISheetDataProps) {
    if (this.props.data !== nextProps.data) {
      // this.config = JSON.parse(JSON.stringify(nextProps.config));
      // this.config.totalWidth = this.config.header.reduce((a: number, b: ISheetDataColumn) => a + b.width, 0);
      // this.config.totalFixedWidth = this.config.header.reduce(
      //   (a: number, b: ISheetDataColumn, index: number) => a + (index < this.config.fixedColumnCount ? b.width : 0),
      //   0
      // );
    }
    
    return true;
  }
  
  componentDidUpdate(prevProps: ISheetDataProps) {
    if (this.props.data !== prevProps.data) {
      this.processData();
    } else if (this.props.data != null) {
      if (this.virtualList != null && this.virtualList.recomputeGridSize != null) {
        this.virtualList.recomputeGridSize();
          this.virtualList.forceUpdateGrids();
      }
    }
  }

  // private processSingleData = () => {
  //   const { config, singleData } = this.props;

  //   if (singleData == null) {
  //     this.list = [{}];
  //   } else {
  //     if (singleData) {
  //       this.list = [];
  //       if (config.hideHeader !== true) {
  //         this.list.push({});
  //       }
  //       this.list = this.list.concat([singleData]);
  //     } else {
  //       this.list = [];
  //       if (config.hideHeader !== true) {
  //         this.list.push({});
  //       }
  //     }
  //   }
  // };

  private processData = () => {
    const { data } = this.props;

    if (data == null) {
      this.loadMore = true;
      this.list = [{}];
    } else {
      this.list = [{}, ...data];
    }
  };

  private getColumnWidth = ({ index }: Index) => {
    return this.props.config.header[index].width;
  };

  private getRowHeight = ({ index }: Index) => {
    if (index === 0) {
      return 40;
    } else {
      return this.props.config.rowHeight;
    }
  };

  private onScroll = ({
    clientHeight,
    clientWidth,
    scrollHeight,
    scrollLeft,
    scrollTop,
    scrollWidth,
  }: ScrollParams) => {
    if (clientHeight !== undefined && scrollTop !== undefined && scrollHeight !== undefined) {
      if ((scrollTop + clientHeight) / scrollHeight > 0.8 && this.lock === false) {
        if (this.props.requestLoadMore && this.loadMore && this.props.data != null) {
          this.props.requestLoadMore();
          this.lock = true;
        }
      }
    }
  };

  private cellRenderer = ({ columnIndex, key, rowIndex, style }: GridCellProps) => {
    const { config } = this.props;
    const properties = config.header[columnIndex];
    const rowData = this.list[rowIndex];

    if (rowData) {
      if (rowIndex === 0 && config.hideHeader !== true) {
        return (
          <div key={key} style={style}>
            <div
              className={`SheetData-Column1 ${columnIndex === config.fixedColumnCount - 1 && 'SheetData-last-fixed-column'}`}
              style={{ ...properties.style, ...config.headerStyle }}
            >
              {properties.label}
            </div>
          </div>
        );
      } else {
        // return null;
        // if (haveTotalRow !== true) {
        if (columnIndex <= config.header.length) {
          return (
            <div
              key={key}
              style={style}
              onMouseOver={() => {
                this.setState({
                  hoveredColumnIndex: columnIndex,
                  hoveredRowIndex: rowIndex,
                });
                // this.virtualList.forceUpdate();
              }}
              // className={`${domain ? sheetStyle.Column2KBSV : sheetStyle.Column2} 
              //   ${this.props.boardMode === true ? sheetStyle.BlackColumn : ''} 
              //   ${rowIndex === this.state.hoveredRowIndex && sheetStyle.HoverItem}
              //   ${this.props.isShowOrderHistory && rowIndex === this.state.onClickRowIndex && sheetStyle.OnClickItem}
              //   ${this.props.isRowClickable === true ? sheetStyle.ColumnClickable : ''} 
              //   ${rowIndex % 2 === 0 ? sheetStyle.Highlight : ''}
              //   ${rowIndex % 2 === 0 && this.props.boardMode === true ? sheetStyle.HighlightBlack : ''}
              //   ${columnIndex === config.header.length - 1 ? sheetStyle.ColumnLast : ''}`}
              {...(this.props.isRowClickable === true ? { onClick: this.onClickRow(rowData, rowIndex) } : null)}
            >
              <div
                className={`SheetData-Column2 ${columnIndex === config.fixedColumnCount - 1 ? 'SheetData-last-fixed-column' : 'SheetData-notLast-fixed-column'} ${rowIndex % 2 !== 0 ? 'SheetData-Row1' : 'SheetData-Row2'}`}
              >
                {properties.element(rowData, rowIndex, properties.style)}
              </div>
            </div>
          );
        } else {
          return null;
        }
        // } else {
        //   if (rowIndex < this.list.length - 1) {
        //     if (columnIndex <= config.header.length) {
        //       return (
        //         <div
        //           key={key}
        //           style={style}
        //           onMouseOver={() => {
        //             this.setState({
        //               hoveredColumnIndex: columnIndex,
        //               hoveredRowIndex: rowIndex,
        //             });
        //             // this.virtualList.forceUpdate();
        //           }}
        //           // className={`${domain ? sheetStyle.Column2KBSV : sheetStyle.Column2} 
        //           //   ${this.props.boardMode === true ? sheetStyle.BlackColumn : ''} 
        //           //   ${rowIndex === this.state.hoveredRowIndex && sheetStyle.HoverItem}
        //           //   ${this.props.isShowOrderHistory &&
        //           //   rowIndex === this.state.onClickRowIndex &&
        //           //   sheetStyle.OnClickItem}
        //           //   ${this.props.isRowClickable === true ? sheetStyle.ColumnClickable : ''} 
        //           //   ${rowIndex % 2 === 0 ? sheetStyle.Highlight : ''}
        //           //   ${rowIndex % 2 === 0 && this.props.boardMode === true ? sheetStyle.HighlightBlack : ''}
        //           //   ${columnIndex === config.header.length - 1 ? sheetStyle.ColumnLast : ''}`}
        //           {...(this.props.isRowClickable === true ? { onClick: this.onClickRow(rowData, rowIndex) } : null)}
        //         >
        //           {properties.element(rowData, rowIndex, properties.style)}
        //         </div>
        //       );
        //     } else {
        //       return null;
        //     }
        //   } else {
        //     return (
        //       <div key={key} style={style}>
        //         <div
        //           // className={`${sheetStyle.ColumnLastKBSV} ${
        //           //   this.props.boardMode === true ? sheetStyle.BlackColumn : ''
        //           //   } ${columnIndex === config.header.length - 1 ? sheetStyle.ColumnLast : ''}`}
        //           style={{ ...properties.style, ...config.headerStyle }}
        //         >
        //           {properties.element(rowData, -1, properties.style)}
        //         </div>
        //       </div>
        //     );
        //   }
        // }
      }
    } else {
      return null;
    }
  };

  private onClickRow = (rowData: IParams, rowIndex?: number) => () => {
    if (this.props.onClickRow != null) {
      this.props.onClickRow(rowData);
    }
    if (this.props.isShowOrderHistory === true) {
      this.setState({
        onClickRowIndex: rowIndex,
      });
    }
  };

  render() {
    const { config } = this.props;
    // const domain = store.getState().config.domain === 'kbsv';

    // const SheetDataForm = (
    //   // <AutoSizer>
    //   //   {({ width, height }: Size) => {
    //   //     const totalWidth = config.header.reduce((a: number, b: ISheetDataColumn) => a + b.width, 0);
    //   //     if (width - 6 > totalWidth) {
    //   //       //6px is Scrollbar width

    //   //       for (let i = 0; i < this.config.header.length; i++) {
    //   //         if (i >= config.fixedColumnCount) {
    //   //           this.config.header[i].width = Math.floor(
    //   //             (config.header[i].width / (this.config.totalWidth! - this.config.totalFixedWidth!)) *
    //   //             (width - this.config.totalFixedWidth! - 6)
    //   //           );
    //   //         }
    //   //       }
    //   //     } else {
    //   //       this.config = JSON.parse(JSON.stringify(this.props.config));
    //   //       this.config.totalWidth = this.config.header.reduce((a: number, b: ISheetDataColumn) => a + b.width, 0);
    //   //       this.config.totalFixedWidth = this.config.header.reduce(
    //   //         (a: number, b: ISheetDataColumn, index: number) =>
    //   //           a + (index < this.config.fixedColumnCount ? b.width : 0),
    //   //         0
    //   //       );
    //   //     }

    //   // return (
    //   <MultiGrid
    //     ref={(ref: MultiGrid) => (this.virtualList = ref)}
    //     fixedColumnCount={config.fixedColumnCount}
    //     fixedRowCount={config.fixedRowCount}
    //     cellRenderer={this.cellRenderer}
    //     columnWidth={this.getColumnWidth}
    //     columnCount={config.header.length}
    //     enableFixedColumnScroll={false}
    //     enableFixedRowScroll={false}
    //     rowHeight={this.getRowHeight}
    //     rowCount={1}
    //     // rowCount={this.list.length}
    //     style={STYLE}
    //     // styleBottomLeftGrid={
    //     //   this.props.boardMode === true
    //     //     ? domain
    //     //       ? STYLE_BOTTOM_LEFT_GRID_BOARD_MODE_KBSV
    //     //       : STYLE_BOTTOM_LEFT_GRID_BOARD_MODE
    //     //     : domain
    //     //       ? STYLE_BOTTOM_LEFT_GRID_KBSV
    //     //       : STYLE_BOTTOM_LEFT_GRID
    //     // }
    //     // styleTopLeftGrid={
    //     //   this.props.boardMode === true
    //     //     ? domain
    //     //       ? STYLE_TOP_LEFT_GRID_BOARD_MODE_KBSV
    //     //       : STYLE_TOP_LEFT_GRID_BOARD_MODE
    //     //     : domain
    //     //       ? STYLE_TOP_LEFT_GRID_KBSV
    //     //       : STYLE_TOP_LEFT_GRID
    //     // }
    //     // styleTopRightGrid={
    //     //   this.props.boardMode
    //     //     ? domain
    //     //       ? STYLE_TOP_RIGHT_GRID_BOARD_MODE_KBSV
    //     //       : STYLE_TOP_RIGHT_GRID_BOARD_MODE
    //     //     : domain
    //     //       ? STYLE_TOP_RIGHT_GRID_KBSV
    //     //       : STYLE_TOP_RIGHT_GRID
    //     // }
    //     // styleBottomRightGrid={
    //     //   this.props.boardMode === true
    //     //     ? domain
    //     //       ? STYLE_BOTTOM_RIGHT_GRID_BOARD_MODE_KBSV
    //     //       : STYLE_BOTTOM_RIGHT_GRID_BOARD_MODE
    //     //     : STYLE_BOTTOM_RIGHT_GRID
    //     // }
    //     width={200}
    //     height={200}
    //   // hideTopRightGridScrollbar={true}
    //   // hideBottomLeftGridScrollbar={true}
    //   // onScroll={this.onScroll}
    //   />
    //   // );
    //   //   }}
    //   // </AutoSizer>
    // );

    if (this.list.length > 0) {
      // if (store.getState().config.domain !== 'kbsv') {
      //   return (
      //     <div
      //       // className={sheetStyle.SheetData}
      //       onMouseOut={() => {
      //         this.setState({
      //           hoveredColumnIndex: null,
      //           hoveredRowIndex: null,
      //         });
      //         this.virtualList.forceUpdate();
      //       }}
      //     >
      //       {SheetDataForm}
      //     </div>
      //   );
      // } else {
      return (
        // <ReduxBlockUi
        //   tag="div"
        //   className={'SheetData'}
        //   block={this.props.blockAction}
        //   unblock={this.props.unBlockAction}
        //   onMouseOut={() => {
        //     this.setState({
        //       hoveredColumnIndex: null,
        //       hoveredRowIndex: null,
        //     });
        //     // this.virtualList.forceUpdate();
        //   }}
        // >
        // { SheetDataForm }
        <AutoSizer>
          {({ height, width }) => (
            <MultiGrid
              ref={(ref: MultiGrid) => (this.virtualList = ref)}
              width={width}
              height={height}
              rowCount={this.list.length}
              rowHeight={this.getRowHeight}
              columnCount={config.header.length}
              columnWidth={this.getColumnWidth}
              cellRenderer={this.cellRenderer}
              fixedColumnCount={config.fixedColumnCount}
              fixedRowCount={config.fixedRowCount}
              enableFixedColumnScroll={false}
              enableFixedRowScroll={false}
              hideTopRightGridScrollbar={true}
              hideBottomLeftGridScrollbar={true}
              style={{ display: 'flex', flexDirection: 'column' }}
            />
          )}
        </AutoSizer>
        // <AutoSizer>
        //   {({ height, width }: Size) => {
        //     return (
        //       <MultiGrid
        //         width={700}
        //         height={250}
        //         rowCount={this.list.length}
        //         rowHeight={this.getRowHeight}
        //         columnCount={config.header.length}
        //         columnWidth={this.getColumnWidth}
        //         cellRenderer={this.cellRenderer}
        //         fixedColumnCount={config.fixedColumnCount}
        //         fixedRowCount={config.fixedRowCount}
        //         enableFixedColumnScroll={false}
        //         enableFixedRowScroll={false}
        //         hideTopRightGridScrollbar={true}
        //         hideBottomLeftGridScrollbar={true}
        //         style={{ display: 'flex' }}
        //       />
        //     );
        //   }}
        // </AutoSizer>,
        // </ReduxBlockUi>
      );
    }
    // }
    return null;
  }
}

export default SheetData;
