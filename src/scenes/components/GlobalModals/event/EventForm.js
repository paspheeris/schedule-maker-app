/* eslint no-unused-vars: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, TextArea } from 'semantic-ui-react';
import { generateUniqueId } from '../../../.././services/event/UniqueEventId';

const propTypes = {
  eventModalData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]).isRequired,
  submitEditedEvent: PropTypes.func.isRequired,
  dismissEventModal: PropTypes.func.isRequired,
  isNewEvent: PropTypes.bool.isRequired
};

const defaultProps = {};

class EventForm extends Component {
  constructor(props) {
    super(props);
    const { eventModalData, isNewEvent } = props;
    if (isNewEvent === false) {
      const { date, description, id, notes, repeated, tags, time, title } = eventModalData;
      // const { year, month, day, dayOfWeek } = date;
      // const { state, end } = time;
      this.state = {
        date,
        description,
        id,
        notes,
        repeated,
        tags,
        time,
        title
      };
    }
    // @Temp
    // There is definitely some more elegant way of handling this default/empty state for
    // New events.
    else if (isNewEvent === true) {
      this.state = {
        date: {
          year: '',
          month: '',
          day: '',
          dayOfWeek: ''
        },
        description: '',
        // @Temp
        // Need a unique id for the new event. This method should work and not overwrite data,
        // but a uuid or a random id generated by a database on the backend during the post
        // of a new event would be better.
        id: generateUniqueId(),
        notes: '',
        repeated: '',
        tags: '',
        time: {
          start: '',
          end: ''
        },
        title: ''
      }
    }
  }

  render() {
    const { dismissEventModal, isNewEvent } = this.props;
    // if (isNewEvent === false) {
    const { date, description, id, notes, repeated, tags, time, title } = this.state;
    // }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field name='title' control={Input} label="Title" value={title}
          onChange={this.handleChange} />
        <Form.Field name='description' control={TextArea} label="Description" value={description}
          onChange={this.handleChange} />
        <Form.Field name='start' control={Input} label="Start Time" value={time.start}
          onChange={this.handleTimeChange} />
        <Form.Field name='end' control={Input} label="End Time" value={time.end}
          onChange={this.handleTimeChange} />
        <Form.Group>
          <Form.Button color="green" content="Save Changes" />
          <Form.Button onClick={this.handleDismiss} color="red" content="Discard Changes" />
        </Form.Group>
        {/* <Form.Field name='title' control={Input} label="Title" value={title} onChange={this.handleChange} /> */}
      </Form>
    );
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleTimeChange = (e, { name, value }) => this.setState({ time: { ...this.state.time, [name]: value } });
  handleSubmit = () => {
    this.props.submitEditedEvent(this.state);
    this.props.dismissEventModal();
  }
  handleDismiss = (e) => {
    e.preventDefault();
    this.props.dismissEventModal();
  }
}

EventForm.propTypes = propTypes;

EventForm.defaultProps = defaultProps;

export default EventForm;
