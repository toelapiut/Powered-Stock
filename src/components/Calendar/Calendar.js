import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactCalendar from 'simple-react-calendar';
import './calendar.css';
import './selected.css';
import styles from './calendar.module.css';

export const Calendar = ({onChangeDates, date, start, end}) => {

  return (
    <div data-test={'calendar-container'}>
      <button className={ styles.container}>
        <SimpleReactCalendar
          today={date.end}
          maxDate={date.end}
          minDate={date.start}
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
  date: PropTypes.shape({
    start: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    end: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ])
  }),
  onChangeDates: PropTypes.func.isRequired,
  start:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  end: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])
};

