import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import {checkPositivity} from '../../helper/utils';

export const MarketMargin = ({margin}) => {
  let className = checkPositivity(margin) ? styles.bull : styles.bear;
  return (
    <div className={`${className} ${styles.container}`}>
      <p className={styles.margin}>{margin}</p>
    </div>
  );
};

MarketMargin.propTypes = {
  margin: PropTypes.number.isRequired
};