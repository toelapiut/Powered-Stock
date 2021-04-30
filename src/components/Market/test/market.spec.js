import React from 'react';
import Market from '../';
import {shallow} from 'enzyme';

const setUp = (props = {}) => {
  return shallow(<Market {...props}/>);
};

describe('Market Component', () => {
  let component;
  beforeAll(() => {
    let props = {
      active:'false', ticker:'APPL',totalRevenue:45244, companyName:'Apple Inc', fullCompanyName:'Apple Incorporation', openingMargin:-1.00
    };
    component = setUp(props);
  });
  it('should render without error',()=>{
    const wrapper = component.find('.container');
    expect(wrapper.length).toBe(1);
  });
});