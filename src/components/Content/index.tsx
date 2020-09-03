import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import './styles.css';

interface IContentProps extends React.ClassAttributes<Content> {
  children: ReactNode;
  transparent?: boolean;
}

interface IContentState {
}

class Content extends React.Component<IContentProps, IContentState> {
  render() {
    return (
      <div className="Content-container Background-transparent">
        <div className={`Content ${this.props.transparent === true ? 'Background-transparent' : 'Content-background'}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Content);