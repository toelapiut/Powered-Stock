import React from 'react';
import Market from '../';
import {shallow} from 'enzyme';
import {Stock} from '../../../containers/Stock/Stock';
import toJson from 'enzyme-to-json';
import {findTestByAttr} from '../../../helper/utils';

const setUp = (props = {}) => {
  return shallow(<Market {...props}/>);
};

describe('Market Component', () => {
  let component;
  beforeAll(() => {
    let props = {
      active: 'false',
      ticker: 'APPL',
      totalRevenue: 45244,
      companyName: 'Apple Inc',
      fullCompanyName: 'Apple Incorporation',
      openingMargin: -1.00
    };
    component = setUp(props);
  });

  test('should render snapshot correctly', () => {
    const wrapper = shallow(<Stock/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render without error', () => {
    const wrapper = findTestByAttr(component, 'market-container');
    expect(wrapper.length).toBe(1);
  });
});