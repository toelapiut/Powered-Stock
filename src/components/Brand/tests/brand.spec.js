import React from 'react';
import Brand from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

const setUp = (props = {}) => {
  return shallow(<Brand {...props}/>);
};

describe('Brand Component', () => {
  let component;
  beforeAll(() => {
    let props = {
      title: 'Market',
    };
    component = setUp(props);
  });

  test('should render snapshot correctly', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});