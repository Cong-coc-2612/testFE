import React from 'react';
import { connect } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import './styles.css';

interface IPlayerProps extends React.ClassAttributes<Player> {
  info: IParams;
  freeToEdit: boolean;
  index: number;

  onDelete(index: number): void;
}

interface IPlayerState {
  // onEditMode: boolean;
  // name: string;
  // nameError: boolean;
  // nameErrorContent: string;
  // email: string;
  // emailError: boolean;
  // emailErrorContent: string;
  // age: string;
  // gender: ValueType<OptionTypeBase>;
}

// const genderOptions = [
//   { value: true, label: 'Nam' },
//   { value: false, label: 'Nữ' },
// ];

class Player extends React.Component<IPlayerProps, IPlayerState> {
  constructor(props: IPlayerProps) {
    super(props);
    this.state = {
      // onEditMode: false,
      // name: this.props.info.name as string,
      // nameError: false,
      // nameErrorContent: '',
      // email: this.props.info.email as string,
      // emailError: false,
      // emailErrorContent: '',
      // age: this.props.info.age as string,
      // gender: this.props.info.gender === true ? { value: true, label: 'Nam' } : { value: false, label: 'Nữ' },
    };
  }

  shouldComponentUpdate(nextProps: IPlayerProps, nextState: IPlayerState) {
    return true;
  }

  // private startEditMode = () => {
  //   this.setState({
  //     onEditMode: true,
  //   });
  // }

  private deletePlayer = () => {
    this.props.onDelete(this.props.index);
  }

  // private onChangeName = (value: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({
  //     name: value.target.value,
  //   });
  // }

  // private onChangeEmail = (value: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({
  //     email: value.target.value,
  //   });
  // }

  // private onChangeAge = (value: React.ChangeEvent<HTMLInputElement>) => {
  //   let tempValue = 0;
  //   if (!isNaN(value.target.value as unknown as number)) {
  //     tempValue = Number(value.target.value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({
  //     age: `${tempValue}`,
  //   });
  // }

  // private onChangeGender = (value: ValueType<OptionTypeBase>) => {
  //   this.setState({ gender: value, });
  // }

  render() {
    return (
      <div className="Player-container">
        <div className="Player-item1">
          <p>{this.props.info.name}</p>
        </div>
        <div className="Player-item2">
          <p>{this.props.info.gender}</p>
        </div>
        <div className="Player-item2">
          <p>{this.props.info.age}</p>
        </div>
        <div className="Player-item1">
          <p>{this.props.info.email}</p>
        </div>
        <div className="Player-setting">
          {this.props.freeToEdit === true && <TiDelete color={'white'} size={25} style={{ marginLeft: '3px', marginRight: '3px' }} onClick={this.deletePlayer} />}
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
)(Player);