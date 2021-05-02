import React from 'react';
import PropTypes from 'prop-types';
import AreaClose from '../../components/AreaClose';
import Header from '../../components/Header';
import styles from './stock.screen.module.css';

export const StockScreen = ({name, onOpenCalendar, isOpen, ticker, start, end, onChangeDates, stocks}) => {

  return (
    <div className={styles.container}>
      <Header
        isOpen={isOpen}
        onChangeDates={onChangeDates}
        name={name}
        ticker={ticker}
        start={start}
        end={end}
        onOpenCalendar={onOpenCalendar}
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
  start: PropTypes.object,
  end: PropTypes.object,
  onOpenCalendar: PropTypes.func.isRequired,
  onChangeDates: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};