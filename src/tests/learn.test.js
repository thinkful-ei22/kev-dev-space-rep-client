/* global $ expect jest */
import React from 'react';
import  {Learn} from '../components/learn';
import {shallow} from 'enzyme';

describe('<Learn/>', () => {
  it('should render without crashing', () => {
    const props = jest.fn();
    const wrapper = shallow(<Learn 
      dispatch={props}
      word={props}
    />);
    // console.log(wrapper.debug());
  });
});