import React from 'react';
import { connect } from 'react-redux';
import './styles.css';

interface IHomeProps extends React.ClassAttributes<Home> {
}

interface IHomeState {
}

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="Container-login">
        <div className="Container-login-middle">
          <h1>Quản lý giải đấu đơn giản</h1>
          <img src={require('../../assets/home-image.png')} alt={'img'} style={{ width: '713px', height: '325px', objectFit: 'cover', }} />
          <img src={require('../../assets/home-image2.png')} alt={'img'} style={{ width: '1021px', height: '541px', objectFit: 'cover', }} />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Home);