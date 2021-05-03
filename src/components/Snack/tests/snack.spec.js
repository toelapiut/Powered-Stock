import  React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Snack from '../';

test('should render correctly', () => {
  const wrapper = shallow(<Snack message={'You have a test message'}/>);
  expect(toJson(wrapper)).toMatchSnapshot();
});