import React from 'react';
import Header from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

const setUp = (props = {}) => {
  return shallow(<Header {...props}/>);
};

describe('Header Component', () => {
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