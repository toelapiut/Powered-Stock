import React from 'react';
import StockScreen from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {findTestByAttr, checkProps} from '../../../helper/utils';


const setUp = (props = {}) => {
  return shallow(<StockScreen {...props}/>);
};

let props = {
  error:undefined,
  loading:false,
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
  stocks: [
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
};

describe('StockScreen Component', () => {
  describe('StockScreen renders tests', () => {
    let component;
    beforeAll(() => {
      component = setUp(props);
    });

    test('should render snapshot correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

    it('should render without error', () => {
      const wrapper = findTestByAttr(component, 'stock-screen-container');
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Check property types', () => {
    it('should not throw a warning', () => {
      const propErr = checkProps(StockScreen, props);
      expect(propErr).toBeUndefined();
    });
  });

  describe('renders loading page', () => {
    let component;
    let calendarProps = {
      ...props,
      loading: true
    };

    beforeAll(() => {
      component = setUp(calendarProps);
    });

    it('should render loading component without error', () => {
      const wrapper = findTestByAttr(component, 'loading-container');
      expect(wrapper.length).toBe(1);
    });

    it('should not render stock-screen-container', () => {
      const wrapper = findTestByAttr(component, 'stock-screen-container');
      expect(wrapper.length).toBe(0);
    });
  });

  describe('renders error page', () => {
    let component;
    let calendarProps = {
      ...props,
      error:{},
    };

    beforeAll(() => {
      component = setUp(calendarProps);
    });

    it('should render Error component', () => {
      const wrapper = findTestByAttr(component, 'error-container');
      expect(wrapper.length).toBe(1);
    });
  });

  describe('Areaclose component render', () => {
    let component;
    let calendarProps = {
      ...props,
      stocks: []
    };

    beforeAll(() => {
      component = setUp(calendarProps);
    });

    it('should not render areaclosed component', () => {
      const wrapper = findTestByAttr(component, 'area-close-container');
      expect(wrapper.length).toBe(0);
    });
  });
});