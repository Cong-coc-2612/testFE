import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';
import { COOKIES_TYPE } from 'global';
import { IBigRequest, IParams } from 'interfaces/common';
import history from "utils/history";
import { cookies } from 'utils/cookies';
import { IState } from 'redux-saga/reducers';
import { setGlobalSearchString } from 'redux-saga/global-actions/SetGlobalSearchString-actions';
import { logOut, searchTournaments, searchUsers } from './actions';
import './styles.css';
import config from 'config';

interface IHeaderProps extends React.ClassAttributes<Header> {
  currentPage: 'competitionInfo' | 'login' | 'signUp' | 'tournaments' | 'tournamentInfo' | 'reports' | 'users' | 'userInfo' | 'home' | 'forgotPassword' | 'newTournament' | 'changePassword' | 'active';
  currentUserInfo: IParams | null;
  globalSearchString: string;

  logOut(): void;
  searchTournaments(params: IBigRequest): void;
  searchUsers(params: IBigRequest): void;
  setGlobalSearchString(params: string): void;
}

interface IHeaderState {
  showUserOption: boolean;
  searchText: string;
  selectedSearchOption: ValueType<OptionTypeBase>;
  errorLoadImage: boolean;
}

const searchOption = [
  { value: 1, label: 'Tìm Giải' },
  { value: 2, label: 'Tìm Người dùng' },
];

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      showUserOption: false,
      searchText: '',
      selectedSearchOption: { value: 1, label: 'Tìm Giải' },
      errorLoadImage: false,
    };
  }

  shouldComponentUpdate(nextProps: IHeaderProps, nextState: IHeaderState) {
    if (this.props.currentPage !== nextProps.currentPage) {
      this.setState({
        showUserOption: false,
      });
    }
    return true;
  }

  private handleShowUserOption = () => {
    this.setState({
      showUserOption: !this.state.showUserOption,
    });
  }


  private hideUserOption = () => {
    this.setState({
      showUserOption: false,
    });
  }

  private logOut = () => {
    this.hideUserOption();
    this.props.logOut();
  }

  private handleSearch = () => {
    if (this.state.searchText !== this.props.globalSearchString || this.state.searchText === '') {
      let params: IBigRequest;
      if ((this.state.selectedSearchOption as IParams).value === 1) {
        params = {
          path: '',
          param: {
            page: 1,
            limit: 9,
            searchString: this.state.searchText.trim(),
            sportId: -1,
            status: '',
          },
          data: {},
        };
      } else {
        params = {
          path: '',
          param: {
            page: 1,
            limit: 9,
            searchString: this.state.searchText.trim(),
          },
          data: {},
        };
      }

      this.props.setGlobalSearchString(this.state.searchText.trim());
      if ((this.state.selectedSearchOption as IParams).value === 1) {
        this.props.searchTournaments(params);
        if (this.props.currentUserInfo != null && this.props.currentUserInfo.roleId === 1) {
          history.push("/admin/tournaments");
        } else {
          history.push("/tournaments");
        }
      } else {
        this.props.searchUsers(params);
        if (this.props.currentUserInfo != null && this.props.currentUserInfo.roleId === 1) {
          history.push("/admin/users");
        } else {
          history.push("/users");
        }
      }
    }
  }

  private onChangeSearchOption = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedSearchOption: value,
    });
  }

  private clearSearchText = () => {
    this.setState({
      searchText: '',
    });
  }

  private onChangeSearchText = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchText: value.target.value,
    });
  }

  private keyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  private onImageError = () => {
    this.setState({
      errorLoadImage: true,
    });
  };

  render() {
    const currentUserInfo = this.props.currentUserInfo;
    return (
      <div className="Header-container">
        <div className="Logo-container">
          <Link to="/" style={{ height: 50 }}>
            <img className={'Header-logo-image'} style={{ width: '100%', height: '100%' }} src={require('../../assets/logo.png')} alt={'logo'} />
          </Link>
        </div>
        <div className={`Option-container ${this.props.currentPage === 'tournaments' ? 'Option-container1' : ''}`}>
          <Link to={`${currentUserInfo != null && currentUserInfo.roleId === 1 && cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null ? '/admin/tournaments' : '/tournaments'}`} style={{ textDecoration: 'none' }} onClick={() => { this.props.setGlobalSearchString('') }}>
            <div className="Link"><p className={`Link-text ${this.props.currentPage === 'tournaments' ? 'Link-text-selected' : ''}`}>{`${this.props.currentPage === 'home' ? 'Các giải đấu' : (currentUserInfo != null && currentUserInfo.roleId === 1 && cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null ? 'Quản lý giải đấu' : 'Các giải đấu')}`}</p></div>
          </Link>
          {this.props.currentPage !== 'login' && currentUserInfo != null && currentUserInfo.roleId === 1 && cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null &&
            <Link to="/admin/users" style={{ textDecoration: 'none' }} onClick={() => { this.props.setGlobalSearchString('') }}>
              <div className="Link"><p className={`Link-text ${this.props.currentPage === 'users' ? 'Link-text-selected' : ''}`}>Quản lý người dùng</p></div>
            </Link>}
          {this.props.currentPage !== 'login' && currentUserInfo != null && currentUserInfo.roleId === 1 && cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null &&
            <Link to="/admin/reports" style={{ textDecoration: 'none' }} onClick={() => { this.props.setGlobalSearchString('') }}>
              <div className="Link"><p className={`Link-text ${this.props.currentPage === 'reports' ? 'Link-text-selected' : ''}`}>Quản lý báo cáo</p></div>
            </Link>}
          {/* <Link to="/news" style={{ textDecoration: 'none' }}>
            <div className="Link"><p className="Link-text">Tin tức</p></div>
          </Link>
          <Link to="/events" style={{ textDecoration: 'none' }}>
            <div className="Link"><p className="Link-text">Sự kiện</p></div>
          </Link> */}
        </div>
        <div className="SearchBar-container">
          <Select
            options={searchOption}
            className="Select Select1"
            defaultValue={this.state.selectedSearchOption}
            value={this.state.selectedSearchOption}
            onChange={this.onChangeSearchOption}
            menuPlacement={'top'}
          />
          <input type={'text'} onKeyPress={this.keyPressed} className={'Header-text-input'} onChange={this.onChangeSearchText} value={this.state.searchText} />
          {this.state.searchText !== '' && <div className={'Header-icon-container'} onClick={this.clearSearchText}>
            <RiCloseLine className={'Header-icon'} size={30} />
          </div>}
          <div className={'Header-icon-container'} onClick={this.handleSearch}>
            <FaSearch className={'Header-icon'} size={25} />
          </div>
        </div>
        {currentUserInfo != null && cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null ? (this.props.currentPage !== 'newTournament' && this.props.currentPage !== 'login' && currentUserInfo.roleId !== 1 &&
          <Link to="/newTournament" style={{ textDecoration: 'none' }}>
            <div className="SignUp-Button-container"><p className="Button">Tạo giải ngay</p></div>
          </Link>) : (this.props.currentPage !== 'newTournament' && this.props.currentPage !== 'login' &&
            <Link to="/newTournament" style={{ textDecoration: 'none' }}>
              <div className="SignUp-Button-container"><p className="Button">Tạo giải ngay</p></div>
            </Link>)}
        {currentUserInfo != null && cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null ?
          <div className="Right-container Right-container-hover">
            <div className={'UserOption-container'} onClick={this.handleShowUserOption}>
              <div className={'UserOption-avatar-container'}>
                <img className={'UserOption-avatar-image'} src={this.state.errorLoadImage === false ? (currentUserInfo.avatar != null ? currentUserInfo.avatar as string : '') : config.defaultAvatar} alt={'logo'} onError={this.onImageError} />
              </div>
              <p className={'UserOption-name-text'}>{`${currentUserInfo.username}`}</p>
              {this.state.showUserOption === true ? <FaChevronDown color={'white'} /> : <FaChevronUp color={'white'} />}
            </div>
            {this.state.showUserOption === true &&
              <div
                className={'UserOption-dropdown-container'}
              >
                <Link to={`/user/${currentUserInfo.id}`} style={{ textDecoration: 'none' }}>
                  <div className={'UserOption-dropdown-item-container UserOption-dropdown-item-container1'}>
                    <p className={'UserOption-text-color-white'}>Thông tin</p>
                  </div>
                </Link>
                <Link to={`/changePassword`} style={{ textDecoration: 'none' }}>
                  <div className={'UserOption-dropdown-item-container UserOption-dropdown-item-container2'}>
                    <p className={'UserOption-text-color-white'}>Đổi mật khẩu</p>
                  </div>
                </Link>
                <div className={'UserOption-dropdown-item-container UserOption-dropdown-item-container1'} onClick={this.logOut}>
                  <p className={'UserOption-text-color-white'}>Đăng xuất</p>
                </div>
              </div>
            }
          </div>
          : <div className="Right-container">
            {this.props.currentPage === 'login' && <div className="Link-text-no-hover-container"><p className="Link-text-no-hover">Bạn chưa có tài khoản?</p></div>}
            {this.props.currentPage === 'login' ?
              <Link to="/signUp" style={{ textDecoration: 'none' }}>
                <div className="SignUp-Button-container"><p className="Button">Đăng ký</p></div>
              </Link> :
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <div className="SignUp-Button-container"><p className="Button">Đăng nhập</p></div>
              </Link>}
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUserInfo: state.currentUserInfo,
    globalSearchString: state.globalSearchString,
  };
};

export default connect(
  mapStateToProps,
  { logOut, searchTournaments, setGlobalSearchString, searchUsers }
)(Header);