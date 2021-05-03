import React from 'react';
import Header from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {findTestByAttr, checkProps} from '../../../helper/utils';


const setUp = (props = {}) => {
  return shallow(<Header {...props}/>);
};

let props = {
  date: {
    start: '01-04-2020',
    end: '01-04-2020'
  },
  name: 'Powered By People Inc',
  ticker: 'PBP',
  start: '01-04-2020',
  end: '01-04-2020',
  isOpen: false,
  onChangeDates: () => null,
  onOpenCalendar: () => null,
};


describe('Header Component', () => {
  describe('Component renders tests', () => {
    let component;
    beforeAll(() => {
      component = setUp(props);
    });

    test('should render snapshot correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

    it('should render without error', () => {
      const wrapper = findTestByAttr(component, 'header-container');
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Check property types', () => {
    it('should not throw a warning', () => {
      const propErr = checkProps(Header, props);
      expect(propErr).toBeUndefined();
    });
  });
});