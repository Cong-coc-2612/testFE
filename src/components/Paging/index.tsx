import React from 'react';
import { connect } from 'react-redux';
import { IState } from 'redux-saga/reducers';
import './styles.css';

interface IPagingProps extends React.ClassAttributes<Paging> {
  currentPage: number;
  totalPage: number;

  onChangeSelectedPage(page: number): void;
}

interface IPagingState {
  currentPage: number;
}

class Paging extends React.Component<IPagingProps, IPagingState> {
  constructor(props: IPagingProps) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
    };
  }

  shouldComponentUpdate(nextProps: IPagingProps, nextState: IPagingState) {
    if (this.props.currentPage !== nextProps.currentPage) {
      this.setState({ currentPage: nextProps.currentPage });
    }
    return true;
  }

  private onChangeCurrentPageText = (value: React.ChangeEvent<HTMLInputElement>) => {
    let tempValue = 1;
    if (!isNaN(value.target.value as unknown as number)) {
      tempValue = Number(value.target.value);
      if (tempValue < 1) {
        tempValue = 1;
      } else if (tempValue > this.props.totalPage) {
        tempValue = this.props.totalPage;
      }
    } else {
      tempValue = 1;
    }
    this.setState({ currentPage: tempValue, });
  }

  private onSelectPage = (page: number) => {
    this.props.onChangeSelectedPage(page);
  }

  private keyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.onSelectPage(this.state.currentPage);
    }
  }

  private renderListPage = () => {
    const listPage = [];
    if (this.props.totalPage >= 7) {
      let distance = 0;
      if (this.props.currentPage > 3) {
        if (this.props.currentPage < this.props.totalPage - 2) {
          distance = 3;
        } else {
          if (this.props.totalPage - this.props.currentPage === 2) {
            distance = (this.props.totalPage - this.props.currentPage) * 2;
          } else if (this.props.totalPage - this.props.currentPage === 1) {
            distance = this.props.totalPage - this.props.currentPage + 4;
          } else {
            distance = this.props.totalPage - this.props.currentPage + 6;
          }
        }
      } else {
        distance = this.props.currentPage - 1;
      }
      for (let i = 0; i < 7; i++) {
        listPage.push(
          <div className="Paging-each-page" onClick={() => { if (i !== distance) { this.onSelectPage(this.props.currentPage - distance + i) } }} key={i}>
            <p className={`Paging-each-page-text ${i === distance && 'Paging-each-page-text-selected'}`}>{this.props.currentPage - distance + i}</p>
          </div>
        );
      }
      if (this.props.currentPage > 1) {
        listPage.unshift(
          <div className="Paging-each-page" onClick={() => this.onSelectPage(this.props.currentPage - 1)} key={'<'}>
            <p className={`Paging-each-page-icon1`}>{'<'}</p>
          </div>
        );
        if (this.props.totalPage > 7 && this.props.currentPage > 4) {
          listPage.unshift(
            <div className="Paging-each-page" onClick={() => this.onSelectPage(1)} key={'<<'}>
              <p className={`Paging-each-page-icon2`}>{'<<'}</p>
            </div>
          );
        }
      }
      if (this.props.currentPage < this.props.totalPage) {
        listPage.push(
          <div className="Paging-each-page" onClick={() => this.onSelectPage(this.props.currentPage + 1)} key={'>'}>
            <p className={`Paging-each-page-icon1`}>{'>'}</p>
          </div>
        );
        if (this.props.totalPage > 7 && this.props.currentPage < this.props.totalPage - 3) {
          listPage.push(
            <div className="Paging-each-page" onClick={() => this.onSelectPage(this.props.totalPage)} key={'>>'}>
              <p className={`Paging-each-page-icon2`}>{'>>'}</p>
            </div>
          );
        }
      }
    } else {
      for (let i = 0; i < this.props.totalPage; i++) {
        listPage.push(
          <div className="Paging-each-page" onClick={() => { if (i !== this.props.currentPage - 1) { this.onSelectPage(1 + i) } }} key={i}>
            <p className={`Paging-each-page-text ${i === this.props.currentPage - 1 && 'Paging-each-page-text-selected'}`}>{1 + i}</p>
          </div>
        );
      }
      if (this.props.currentPage > 1) {
        listPage.unshift(
          <div className="Paging-each-page" onClick={() => this.onSelectPage(this.props.currentPage - 1)} key={'<'}>
            <p className={`Paging-each-page-icon1`}>{'<'}</p>
          </div>
        );
      }
      if (this.props.currentPage < this.props.totalPage) {
        listPage.push(
          <div className="Paging-each-page" onClick={() => this.onSelectPage(this.props.currentPage + 1)} key={'>'}>
            <p className={`Paging-each-page-icon1`}>{'>'}</p>
          </div>
        );
      }
    }
    return listPage;
  }

  render() {
    if (this.props.totalPage < 2) {
      return null;
    }
    return (
      <div className="Paging-container">
        <input style={{ width: 30 }} type={'text'} onChange={this.onChangeCurrentPageText} onKeyPress={this.keyPressed} value={this.state.currentPage} />
        <p>/{this.props.totalPage}</p>
        <div className="Paging-bar">
          {this.renderListPage()}
        </div>
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
  null
)(Paging);