import React from 'react';
import Market from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {findTestByAttr, checkProps} from '../../../helper/utils';


const setUp = (props = {}) => {
  return shallow(<Market {...props}/>);
};

let props = {
  active: 'false',
  ticker: 'APPL',
  totalRevenue: 45244,
  companyName: 'Apple Inc',
  fullCompanyName: 'Apple Incorporation',
  openingMargin: -1.00
};

describe('Market Component', () => {

  describe('Component renders tests', () => {
    let component;
    beforeAll(() => {
      component = setUp(props);
    });

    test('should render snapshot correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

    it('should render without error', () => {
      const wrapper = findTestByAttr(component, 'market-container');
      expect(wrapper.length).toBe(1);
    });

  });

  describe('Check property types', () => {
    it('should not throw a warning', () => {
      const propErr = checkProps(Market, props);
      expect(propErr).toBeUndefined();
    });
  });

  describe('Have props', () => {

  });
});