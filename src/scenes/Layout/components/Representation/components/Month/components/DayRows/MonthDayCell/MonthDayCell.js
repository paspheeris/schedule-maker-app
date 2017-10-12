import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import AddEventIcon from '../../../.././AddEventIcon/AddEventIcon';


const propTypes = {
  displayYear: PropTypes.number.isRequired,
  displayMonth: PropTypes.number.isRequired,
  // day: PropTypes.oneOf([
  //   PropTypes.number,
  //   null
  // ]), // How to do ProptTypes.onOfType?
  events: PropTypes.array.isRequired

};

const defaultProps = {};

class MonthDayCell extends Component {
  constructor(props) {
    super(props);
    this.acceptedDays = [
      1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13,
      14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31
    ];
    this.eventsPerDayArray = this.eventsPerDayInMonth(this.props.events);
    this.state = {
      hoveringOver: false
    };
  }

  render() {
    const { acceptedDays, cellClasses, cellColor, eventsPerDayArray } = this
    const { day, displayYear, displayMonth, } = this.props;
    return (
      <Grid.Column className={cellClasses(day)} color={cellColor(day)} >
        <Link to={`/day/${displayYear}/${displayMonth + 1}/${day}`} >
          <div>{day}</div>
        </Link>
        {acceptedDays.includes(day) && <AddEventIcon />}
        {/* Gross, break out a function for this */}
        {eventsPerDayArray[day] > 0
          ? `${eventsPerDayArray[day]} events`
          : ''}
      </Grid.Column>
    );
  }
  //TODO TEST
  eventsPerDayInMonth = (events) => {
    const daysArr = Array.from({ length: 32 }, (_, i) => 0);
    return events.reduce((accum, event) => {
      accum[event.date.day]++;
      return accum;
    }, daysArr);
  }
  // decide if a cell should be greyed out
  cellColor = (day) => {

    if (this.acceptedDays.includes(day))
      return;
    else
      return "grey";
  }

  // gives custom classes to greyed out cells
  // such as background color and a more defined shadow
  cellClasses = (day) => {

    if (this.acceptedDays.includes(day))
      return;
    else
      return "no-day shadow";
  }
}

MonthDayCell.propTypes = propTypes;

MonthDayCell.defaultProps = defaultProps;

export default MonthDayCell;
