import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import dateService from '../../../../../../../../../services/dates/dateService';

const propTypes = {
  displayEventModal: PropTypes.func.isRequired,
  displayYear: PropTypes.number.isRequired,
  displayMonth: PropTypes.number.isRequired,
  displayDay: PropTypes.number.isRequired,
  dayOfWeekVal: PropTypes.number.isRequired //from the parent's loop, not the event itself
};

const defaultProps = {};

class DayHeader extends Component {

  render() {
    const { dayOfWeekVal } = this.props;
    return (
      <Header size="medium" className="day-name">
        {dateService.dayStrRepArr[dateService.convertDay(dayOfWeekVal)]}
      </Header>
    );
  }
}

DayHeader.propTypes = propTypes;

DayHeader.defaultProps = defaultProps;

export default DayHeader;


