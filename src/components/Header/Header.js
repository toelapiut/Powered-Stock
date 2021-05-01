import React from 'react';
import PropTypes from 'prop-types';
import DateInput from '../../components/DateInput';
import styles from './header.module.css';



export const Header = ({name, ticker, start, end, onChangeDates}) => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.ticker}>{ticker}</h1>
        <p className={styles.name}>{name}</p>
      </div>
      <DateInput
        start={start}
        end={end}
        onChangeDates={onChangeDates}
      />
    </div>
  );
};

Header.propTypes = {
  name:PropTypes.string.isRequired,
  ticker:PropTypes.string.isRequired,
  start: PropTypes.string,
  end: PropTypes.string,
  onChangeDates: PropTypes.func,
};

