import React from 'react';
import App from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

const setUp = (props = {}) => {
  return shallow(<App {...props}/>);
};

describe('App Component', () => {
  describe('Component renders tests', () => {
    let component;
    beforeAll(() => {
      component = setUp();
    });

    test('should render snapshot correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});