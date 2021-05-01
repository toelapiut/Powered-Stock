import React from 'react';
import MarketMargin from '../../components/MarketMargin';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
export const Market = ({ticker,totalRevenue, companyName, fullCompanyName, openingMargin}) => {

  return (
    <div className={styles.container}  data-test={'market-container'}>
      <div className={styles.shares}>
        <h1>{ticker}</h1>
        <p className={styles.revenue}>{totalRevenue.toLocaleString()}</p>
      </div>
      <div className={styles.company}>
        <p className={styles.name}>{companyName.toLowerCase()}</p>
        <MarketMargin
          margin={openingMargin}
          fullCompanyName={fullCompanyName}
        />
      </div>
    </div>
  );
};

Market.propTypes = {
  ticker: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  fullCompanyName: PropTypes.string.isRequired,
  openingMargin: PropTypes.number.isRequired,
  totalRevenue: PropTypes.number.isRequired,
};