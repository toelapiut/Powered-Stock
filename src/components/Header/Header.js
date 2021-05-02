import React from 'react';
import PropTypes from 'prop-types';
import DateInput from '../../components/DateInput';
import styles from './header.module.css';



export const Header = ({name, isOpen, onChangeDates, ticker, start, end, onOpenCalendar}) => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.ticker}>{ticker}</h1>
        <p className={styles.name}>{name}</p>
      </div>
      <DateInput
        isOpen={isOpen}
        onChangeDates={onChangeDates}
        start={start}
        end={end}
        onOpenCalendar={onOpenCalendar}
      />
    </div>
  );
};

Header.propTypes = {
  name:PropTypes.string.isRequired,
  ticker:PropTypes.string.isRequired,
  start: PropTypes.object,
  end: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onChangeDates: PropTypes.func.isRequired,
  onOpenCalendar: PropTypes.func.isRequired,
};

