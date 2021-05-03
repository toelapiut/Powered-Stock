import React from 'react';
import PropTypes from 'prop-types';
import DateInput from '../../components/DateInput';
import styles from './header.module.css';



export const Header = ({name, date, isOpen, onChangeDates, ticker, start, end, onOpenCalendar}) => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.ticker}>{ticker}</h1>
        <p className={styles.name}>{name}</p>
      </div>
      <DateInput
        date={date}
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
  name:PropTypes.string.isRequired,
  ticker:PropTypes.string.isRequired,
  start: PropTypes.string,
  end: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onChangeDates: PropTypes.func.isRequired,
  onOpenCalendar: PropTypes.func.isRequired,
};

