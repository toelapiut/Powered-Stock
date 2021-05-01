import humps from 'humps';
import checkPropTypes from 'check-prop-types';
import {timeFormat} from 'd3-time-format';
import {bisector} from 'd3-array';

export const transpose = (rows, cols) => {
  /*
   * check if the row and col are empty and throw an error to
   * inform of the necessary requirements
   */
  if (typeof rows === 'undefined' || typeof cols === 'undefined') {
    throw new Error('row and col can not be undefined');
  }

  /*
   * throw error if the array isn't an array or col isn't an array
   */
  if (!Array.isArray(rows)) throw new Error('row must be  array');
  if (!Array.isArray(cols)) throw new Error('col must be  array');

  let dataset = [];

  for (let row of rows) {
    /*
     * check the data type before iterating through the matrix
     */
    if (!Array.isArray(row)) throw new Error('row must be a matrix row: [[a, b]]');
    let obj = {};
    row.forEach((item, index) => {
      obj[cols[index]['name']] = item;
    });
    dataset.push(obj);
  }

  return dataset;
};


export const toCamelCase = (item) => {
  if (typeof item === 'undefined') {
    return item;
  }
  return humps.camelizeKeys(item);
};

export const checkPositivity = (num) => {
  if (typeof num === 'undefined') throw new Error('argument must not be empty');
  if (typeof num !== 'number') throw new Error('argument is not a number');
  let check = Math.sign(Number(num));
  return check !== -1;
};

export const formatDate =  timeFormat('%b %d, \'%y');

export const getDate = (d) => new Date(d.date);

export const getStockValue = (d) => d.close;

export const bisectDate = bisector(d => new Date(d.date)).left;

export const getWindowDimensions =()=> {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

export const findTestByAttr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};

export const checkProps = (component, expectedProps) => {
  checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};

