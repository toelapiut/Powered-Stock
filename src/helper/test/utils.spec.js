import {transpose, toCamelCase, checkPositivity, dateDiff, dateFormat, transposeStock} from '../utils';
import moment from 'moment';

describe('Helper functions', () => {
  describe('transpose function', () => {
    it('should throw be \'row and col can not be undefined\' undefined error', () => {
      try {
        transpose();
      } catch (error) {
        expect(error.message).toBe('row and col can not be undefined');
      }
    });
    it('should throw be \'row must be  array\' undefined error', () => {
      try {
        transpose({}, {});
      } catch (error) {
        expect(error.message).toBe('row must be  array' || 'col must be  array');
      }
    });

    it('should throw be \'row must be a matrix row: [[a, b]]\' undefined error', () => {
      let rows = [1]; // not a matrix
      let cols = [{name: 'one'}];
      try {
        transpose(rows, cols);
      } catch (error) {
        expect(error.message).toBe('row must be a matrix row: [[a, b]]');
      }
    });

    it('should throw be \'row must be a matrix row: [[a, b]]\' undefined error', () => {
      let rows = [[1, 2]];
      let cols = [{'name': 'one'}, {'name': 'two'}];
      let expected = [{'one': 1, 'two': 2}];
      let func = transpose(rows, cols);
      expect(func).toStrictEqual(expected);
    });
  });

  describe('toCamelCase function', () => {
    it('should return undefined', () => {
      let func = toCamelCase();
      expect(func).toBe(undefined);
    });

    it('should return carmel cased keys for array of object', () => {
      let item = [{full_name: 'john doe'}];
      let expected = [{fullName: 'john doe'}];
      let func = toCamelCase(item);
      expect(func).toEqual(expected);
    });

    it('should return carmel cased keys', () => {
      let item = {full_name: 'john'};
      let expected = {fullName: 'john'};
      let func = toCamelCase(item);
      expect(func).toEqual(expected);
    });
  });

  describe('check if number is positive or not, checkPositivity', () => {
    it('should throw error if argument is undefined', () => {
      try {
        checkPositivity();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'argument must not be empty');
      }
    });
    it('should throw error if argument is is not a number', () => {
      try {
        checkPositivity('');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'argument is not a number');
      }
    });

    it('should return true if the number is a positive integer', () => {
      let func = checkPositivity(1);
      expect(func).toBeTruthy();
    });

    it('should return false if the number is a negative integer', () => {
      let func = checkPositivity(-1);
      expect(func).toBeFalsy();
    });
  });

  describe('Check date Difference Function', () => {
    it('should return false', () => {
      let func = dateDiff(moment().add(1, 'week'), moment.now());
      expect(func).toBeFalsy();
    });

    it('should return true', () => {
      let func = dateDiff(moment().add(3, 'months'), moment.now());
      expect(func).toBeTruthy();
    });
  });


  describe('dateFormat function', () => {
    it('should return false', () => {
      let format = 'DD MMM, YYYY';
      let date = moment.now();
      let expected = moment(date).format(format);
      let func = dateFormat(date, format);
      expect(func).toEqual(expected);
    });
  });


  describe('transpose data function', () => {
    it('should return key pair value with close and open dates', () => {
      let rows = [
        [
          '1962-01-02',
          38.5
        ],
        [
          '1962-01-03',
          38.87
        ],
        [
          '1962-01-04',
          39.88
        ]
      ];
      let expected =[{'close': 38.5, 'date': '1962-01-02'}, {'close': 38.87, 'date': '1962-01-03'}, {'close': 39.88, 'date': '1962-01-04'}];
      let func = transposeStock(rows);
      console.log(func);
      expect(func).toEqual(expected);
    });
  });
});