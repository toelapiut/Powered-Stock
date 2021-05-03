import React from 'react';
import {SpinnerCircular} from 'spinners-react';
import styles from './loading.module.css';
import PropTypes from 'prop-types';


export const Loading = ({size, thickness, speed, color, secondaryColor}) => {
  return (
    <div className={styles.container} data-test={'loading-container'}>
      <SpinnerCircular
        size={size}
        thickness={thickness}
        speed={speed}
        color={color}
        secondaryColor={secondaryColor}/>
    </div>
  );
};


Loading.defaultProps = {
  size: 50,
  thickness: 51,
  speed: 99,
  color: 'rgba(103, 57, 172, 1)',
  secondaryColor:'rgba(0, 0, 0, 0.44)'
};

Loading.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  speed: PropTypes.number,
  color: PropTypes.string,
  secondaryColor: PropTypes.string
};
