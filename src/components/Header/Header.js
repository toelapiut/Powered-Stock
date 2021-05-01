import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const  Header = ({title}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.header}>Powered by People</p>
    </div>
  );
};

Header.defaultProps = {
  title: 'Market'
};

Header.propTypes = {
  title: PropTypes.string
};