import React from 'react';
import PropTypes from 'prop-types';
import styles from './date.input.module.css';

export const DateInput = ({start, end, onChangeDates}) => {
  return (
    <div className={styles.container} onClick={onChangeDates}>
      <div className={styles.start}>
        <p className={styles.label}>Start date</p>
        <p className={styles.date}>{start}</p>
      </div>
      <div className={styles.start}>
        <p className={styles.label}>End date</p>
        <p className={styles.date}>{end}</p>
      </div>
    </div>
  );
};

DateInput.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  onChangeDates: PropTypes.func.isRequired
};

