import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {findTestByAttr, checkProps} from '../../../helper/utils';
import AreaClose from '../';


const setUp = (props = {}) => {
  return shallow(<AreaClose {...props}/>);
};

let props = {
  stock: [
    {
      'date': '1980-12-31',
      'close': 34.13
    },
    {
      'date': '1981-01-31',
      'close': 28.25
    },

    {
      'date': '2018-03-31',
      'close': 168.34
    }
  ],
  width: 970,
  tooltipTop: 0,
  tooltipLeft: 0,
  height: 710,
  hideTooltip: () => null,
  margin: {top: 0, right: 0, bottom: 0, left: 0},
  showTooltip: () => null,
  tooltipData: undefined,
};

describe('AreaClose Component', () => {
  describe('AreaClose renders tests', () => {
    let component;
    beforeAll(() => {
      component = setUp(props);
    });

    test('should render snapshot correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe('Check property types', () => {
    it('should not throw a warning', () => {
      const propErr = checkProps(AreaClose, props);
      expect(propErr).toBeUndefined();
    });
  });

  describe('Check for width', () => {
    let component;
    let calendarProps = {
      ...props,
      width: 5
    };
    beforeAll(() => {
      component = setUp(calendarProps);
    });

    it('should return null if width is less 10', () => {
      const wrapper = findTestByAttr(component, 'area-close-container');
      expect(wrapper.length).toBe(0);
    });
  });

  describe('toggle ToolTip component', () => {
    let component;
    let calendarProps = {
      ...props,
      tooltipData: {date: '2017-08-31', close: 164}
    };
    beforeAll(() => {
      component = setUp(calendarProps);
    });

    it('should not render too', () => {
      const wrapper = findTestByAttr(component, 'toggle-tool-tip');
      expect(wrapper.length).toBe(0);
    });
  });
});