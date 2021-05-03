import React from 'react';
import DateInput from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {findTestByAttr, checkProps} from '../../../helper/utils';


const setUp = (props = {}) => {
  return shallow(<DateInput {...props}/>);
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

describe('DateInput Component', () => {
  describe('Component date inputs renders tests', () => {
    let component;
    beforeAll(() => {
      component = setUp(props);
    });

    test('should render snapshot correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

    it('should render without error', () => {
      const wrapper = findTestByAttr(component, 'date-input-container');
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Check property types', () => {
    it('should not throw a warning', () => {
      const propErr = checkProps(DateInput, props);
      expect(propErr).toBeUndefined();
    });
  });


  describe('render without calendar', () => {
    let component;
    let calendarProps = {
      ...props,
      isOpen: true
    };
    beforeAll(() => {
      component = setUp(calendarProps);
    });

    it('should not render calendar component', () => {
      const wrapper = findTestByAttr(component, 'toggle-calendar');
      expect(wrapper.length).toBe(0);
    });
  });
});