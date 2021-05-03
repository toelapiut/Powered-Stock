import React from 'react';
import PropTypes from 'prop-types';
import styles from './date.input.module.css';
import {Calendar} from '../Calendar/Calendar';
import {dateFormat} from '../../helper/utils';

export const DateInput = ({date, start, end, onOpenCalendar, isOpen, onChangeDates}) => {
  return (
    <div className={styles.container} data-test={'date-input-container'}>
      <button className={styles.wrap} onClick={onOpenCalendar}>
        <div className={styles.start}>
          <p className={styles.label}>Start date</p>
          <p className={styles.date}>{dateFormat(start)}</p>
        </div>
        <div className={styles.start}>
          <p className={styles.label}>End date</p>
          <p className={styles.date}>{dateFormat(end)}</p>
        </div>
      </button>
      {!isOpen && <div data-test={'toggle-calendar'}>
        <div className={styles.overlay} onClick={onOpenCalendar}/>
        <div className={styles.calendar}>
          <Calendar
            date={date}
            isOpen={isOpen}
            onChangeDates={onChangeDates}
            end={end}
            start={start}
          />
        </div>
      </div>
      }
    </div>
  );
};

DateInput.propTypes = {
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
  start: PropTypes.string,
  end: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onOpenCalendar: PropTypes.func.isRequired,
  onChangeDates: PropTypes.func.isRequired
};

