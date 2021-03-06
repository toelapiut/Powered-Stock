import  React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {Stock} from '../Stock';

test('should render correctly', () => {
  const wrapper = shallow(<Stock ticker={'ticker'}/>);
  expect(toJson(wrapper)).toMatchSnapshot();
});