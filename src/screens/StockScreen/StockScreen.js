import React from 'react';
import PropTypes from 'prop-types';
import AreaClose from '../../components/AreaClose';
import Header from '../../components/Header';
import styles from './stock.screen.module.css';
import {Error} from '../Error/Error';
import {Loading} from '../../components/Loading/Loading';
import {getWindowDimensions} from '../../helper/utils';

let dimensions = getWindowDimensions();
let width = dimensions.width - 450;
let height = dimensions.height - 150;
export const StockScreen = ({name, error, loading, date, onOpenCalendar, isOpen, ticker, start, end, onChangeDates, stocks}) => {

  if (typeof error !== 'undefined') {
    return (
      <div data-test={'error-container'}>
        <Error/>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loader} style={{height: height, width: width}} data-test={'loading-container'}>
        <Loading/>
      </div>
    );
  }

  return (
    <div className={styles.container} data-test={'stock-screen-container'}>
      <Header
        date={date}
        isOpen={isOpen}
        onChangeDates={onChangeDates}
        name={name}
        ticker={ticker}
        start={start}
        end={end}
        onOpenCalendar={onOpenCalendar}
      />
      <div className={styles.areaClose}>
        {stocks.length > 1 &&
          <div data-test={'area-close-container'}>
            <AreaClose
              stock={stocks}
            />
          </div>
        }
      </div>
    </div>
  );
};

StockScreen.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  ticker: PropTypes.string.isRequired,
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
  onOpenCalendar: PropTypes.func.isRequired,
  onChangeDates: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};