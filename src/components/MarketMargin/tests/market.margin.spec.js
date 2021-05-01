import React from 'react';
import MarketMargin from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {findTestByAttr, checkProps} from '../../../helper/utils';


const setUp = (props = {}) => {
  return shallow(<MarketMargin {...props}/>);
};

let props = {
  margin:-123
};

describe('MarketMargin Component', () => {

  describe('Market Margin renders correctly', () => {
    let component;
    beforeAll(() => {
      component = setUp(props);
    });

    test('should render snapshot correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

    it('should render without error', () => {
      const wrapper = findTestByAttr(component, 'market-margin-container');
      expect(wrapper.length).toBe(1);
    });

  });

  describe('Check property types', () => {
    it('should not throw a warning', () => {
      const propErr = checkProps(MarketMargin, props);
      expect(propErr).toBeUndefined();
    });
  });
});