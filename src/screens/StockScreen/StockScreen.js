import React from 'react';
import PropTypes from 'prop-types';
import AreaClose from '../../components/AreaClose';
import Header from '../../components/Header';
import styles from './stock.screen.module.css';
export const StockScreen = ({name, ticker, start, end, onChangeDates, stocks}) => {

  return (
    <div className={styles.container}>
      <Header
        name={name}
        ticker={ticker}
        start={start}
        end={end}
        onChangeDates={onChangeDates}
      />
      <div className={styles.areaClose}>
        <AreaClose
          stocks={stocks}
        />
      </div>
    </div>
  );
};

StockScreen.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  onChangeDates: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired
};