import React from 'react';
import PropTypes from 'prop-types';
import styles from './snack.module.css';


export const Snack = ({message}) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

Snack.propTypes = {
  message: PropTypes.string.isRequired
};