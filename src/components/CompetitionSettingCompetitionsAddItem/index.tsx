import React from 'react';
import { connect } from 'react-redux';
import { FaPlusSquare } from 'react-icons/fa';
import './styles.css';

interface ICompetitionSettingCompetitionsAddItemProps extends React.ClassAttributes<CompetitionSettingCompetitionsAddItem> {
  handleAddACompetition(): void;
}

interface ICompetitionSettingCompetitionsAddItemState {
}

class CompetitionSettingCompetitionsAddItem extends React.Component<ICompetitionSettingCompetitionsAddItemProps, ICompetitionSettingCompetitionsAddItemState> {
  constructor(props: ICompetitionSettingCompetitionsAddItemProps) {
    super(props);
    this.state = {
    };
  }

  private handleAddACompetition = () => {
    if (this.props.handleAddACompetition) {
      this.props.handleAddACompetition();
    }
  }

  render() {
    return (
      <div className="CompetitionSettingCompetitionsAddItem-info-container">
        <div className="CompetitionSettingCompetitionsAddItem-container">
          <div className="CompetitionSettingCompetitionsAddItem-container-container"
            onClick={this.handleAddACompetition}
          >
            <div className="CompetitionSettingCompetitionsAddItem-order-number-container">
              <div className="CompetitionSettingCompetitionsAddItem-order-number-box">
                <FaPlusSquare size={20} className="CompetitionSettingCompetitionsAddItem-team-setting-icon" />
              </div>
            </div>
            <div className="CompetitionSettingCompetitionsAddItem-team-name-container">
              <p>Thêm một cuộc thi</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(CompetitionSettingCompetitionsAddItem);