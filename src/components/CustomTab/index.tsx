import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { onEditBracketMode, deleteListSelectingTeam } from 'components/BracketTeam/actions';
import './styles.css';

interface ICustomTabProps extends React.ClassAttributes<CustomTab> {
  tabList: string[];
  componentList: ReactNode[];
  selectedIndex: number;
  darkMode?: boolean;

  onEditBracketMode(status: boolean): void;
  deleteListSelectingTeam(): void;
  onChangeSelectedIndex?(index: number): void;
}

interface IModalState {
}

class CustomTab extends React.Component<ICustomTabProps, IModalState> {
  constructor(props: ICustomTabProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Tabs
        defaultIndex={this.props.selectedIndex}
        onSelect={(index) => {
          this.props.onEditBracketMode(false);
          this.props.deleteListSelectingTeam();
          if (this.props.onChangeSelectedIndex) {
            this.props.onChangeSelectedIndex(index);
          }
        }}
        className={this.props.darkMode === true ? `Tabs-color2` : `Tabs-color`}
      >
        <TabList>
          {this.props.tabList.map((item, index) => {
            return (<Tab key={index}>{item}</Tab>);
          })}
        </TabList>
        {this.props.componentList.map((item, index) => {
          return (<TabPanel key={index}>{item}</TabPanel>);
        })}
      </Tabs>
    );
  }
}

export default connect(
  null,
  { onEditBracketMode, deleteListSelectingTeam }
)(CustomTab);