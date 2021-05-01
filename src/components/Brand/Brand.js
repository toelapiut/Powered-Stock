import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const  Brand = ({title}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.header}>Powered by People</p>
    </div>
  );
};

Brand.defaultProps = {
  title: 'Market'
};

Brand.propTypes = {
  title: PropTypes.string
};