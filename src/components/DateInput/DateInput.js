import React from 'react';
import PropTypes from 'prop-types';
import styles from './date.input.module.css';
import {Calendar} from '../Calendar/Calendar';
import {dateFormat} from '../../helper/utils';

export const DateInput = ({start, end, onOpenCalendar, isOpen, onChangeDates}) => {
  return (
    <div className={styles.container}>
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
      { !isOpen && <div className={styles.overlay} onClick={onOpenCalendar}/> }
      { !isOpen &&<div className={styles.calendar}>
        <Calendar isOpen={isOpen} onChangeDates={onChangeDates} end={end} start={start}/>
      </div>}
    </div>
  );
};

DateInput.propTypes = {
  start: PropTypes.object,
  end: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onOpenCalendar: PropTypes.func.isRequired,
  onChangeDates: PropTypes.func.isRequired
};

