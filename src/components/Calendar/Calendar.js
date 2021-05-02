import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactCalendar from 'simple-react-calendar';
import './calendar.css';
import './selected.css';
import styles from './calendar.module.css';

export const Calendar = ({isOpen, onChangeDates, start, end}) => {

  console.log({isOpen});
  return (
    <div>
      <button className={ styles.container}>
        <SimpleReactCalendar
          mode='range'
          minNumberOfWeeks={6}
          blockClassName='date_picker'
          selected={{start, end}}
          onSelect={(date) => onChangeDates(date)}
        />
      </button>
    </div>
  );
};


Calendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChangeDates: PropTypes.func.isRequired,
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
};

