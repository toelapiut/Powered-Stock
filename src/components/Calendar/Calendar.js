import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactCalendar from 'simple-react-calendar';
import './calendar.css';
import './selected.css';
import styles from './calendar.module.css';

export const Calendar = ({onChangeDates, start, end}) => {

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
  onChangeDates: PropTypes.func.isRequired,
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
};

