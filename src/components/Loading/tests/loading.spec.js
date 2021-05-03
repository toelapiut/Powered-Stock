import React from 'react';
import Loading from '../';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {findTestByAttr, checkProps} from '../../../helper/utils';


const setUp = (props = {}) => {
  return shallow(<Loading {...props}/>);
};

let props = {
  size: 50,
  thickness: 51,
  speed: 99,
  color: 'rgba(103, 57, 172, 1)',
  secondaryColor: 'rgba(0, 0, 0, 0.44)'
};


describe('Loading Component', () => {

  describe('Component renders tests', () => {
    let component;
    beforeAll(() => {
      component = setUp(props);
    });

    test('should render snapshot correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

    it('should render without error', () => {
      const wrapper = findTestByAttr(component, 'loading-container');
      expect(wrapper.length).toBe(1);
    });

  });

  describe('Check property types', () => {
    it('should not throw a warning', () => {
      const propErr = checkProps(Loading, props);
      expect(propErr).toBeUndefined();
    });
  });
});