import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import Modal, { Styles } from 'react-modal';
import 'react-tabs/style/react-tabs.css';
import './styles.css';

interface ICustomModalProps extends React.ClassAttributes<CustomModal> {
  children?: ReactNode;
  showModal: boolean;
  customStyles: Styles;
  confirmButtonVisible?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;

  handleCloseModal(): void;
  handleConfirmModal(): void;
  handleCancelModal?(): void;
}

interface IModalState {
}

class CustomModal extends React.Component<ICustomModalProps, IModalState> {
  constructor(props: ICustomModalProps) {
    super(props);
    this.state = {
    };
  }

  private handleCloseModal = () => {
    this.props.handleCloseModal();
  }

  private handleConfirmModal = () => {
    this.props.handleConfirmModal();
  }

  private handleCancelModal = () => {
    if (this.props.handleCancelModal) {
      this.props.handleCancelModal();
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={this.handleCloseModal}
        style={this.props.customStyles}
        ariaHideApp={false}
      >
        <div className="Modal-content-container">
          {this.props.children}
        </div>
        {this.props.confirmButtonVisible !== false ?
          <div className="Modal-button-container">
            <div className="Modal-button" onClick={this.handleConfirmModal}>
              <p style={{ color: 'white' }}>{this.props.confirmButtonText ? this.props.confirmButtonText : 'Xác nhận'}</p>
            </div>
            {this.props.handleCancelModal &&
              <div className="Modal-button2" onClick={this.handleCancelModal}>
                <p style={{ color: 'white' }}>{this.props.cancelButtonText ? this.props.cancelButtonText : 'Hủy'}</p>
              </div>
            }
          </div> : <div className="Modal-button-container">
            {this.props.handleCancelModal &&
              <div className="Modal-button2" onClick={this.handleCancelModal}>
                <p style={{ color: 'white' }}>{this.props.cancelButtonText ? this.props.cancelButtonText : 'Hủy'}</p>
              </div>
            }
          </div>}
      </Modal>
    );
  }
}

export default connect(
  null,
  null
)(CustomModal);