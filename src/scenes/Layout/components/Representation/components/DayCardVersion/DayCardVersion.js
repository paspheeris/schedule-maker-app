import React from 'react';
import PropTypes from 'prop-types';
import timeService from '../../../../../../services/times/timeService';
import { Card } from 'semantic-ui-react';
import './DayCardVersion.css';

const propTypes = {
  events: PropTypes.array.isRequired,
  condensed: PropTypes.bool,
  displayEventModal: PropTypes.func.isRequired
};

const defaultProps = {};

const DayCardVersion = ({ events, condensed, displayEventModal }) => {
  if (condensed) {
    return (
      <div className="day" >
        {timeService.sortEventsByTimeMutable(events).map((event, i) => {
          return (
            <Card key={i} onClick={(event, data) => displayEventModal(event, data)} fluid style={{ 'width': '100%', 'padding': '0px' }}>
              <Card.Content extra className="event-start">
                {event.time.start}
              </Card.Content>
              <Card.Content>
                <Card.Header>
                  {event.title}
                </Card.Header>
              </Card.Content>
              <Card.Content extra className="event-end">
                {event.time.end}
              </Card.Content>
            </Card>
          )
        })
        }
      </div>
    )
  }
  return (
    <div className="day">
      {timeService.sortEventsByTimeMutable(events).map((event, i) => {
        return (
          <Card key={i} centered name={event.id} onClick={(event, data) => displayEventModal(event.target, data)}>
            <Card.Content extra className="event-start">
              {event.time.start}
            </Card.Content>
            <Card.Content>
              <Card.Header>
                {event.title}
              </Card.Header>
              <Card.Description>
                {event.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra className="event-end">
              {event.time.end}
            </Card.Content>
          </Card>
        )
      })
      }
    </div>
  )
}


DayCardVersion.propTypes = propTypes;

DayCardVersion.defaultProps = defaultProps;

export default DayCardVersion;
