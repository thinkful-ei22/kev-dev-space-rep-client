import React from 'react';
import  {HeaderBar} from '../components/header-bar';
import {shallow} from 'enzyme';

describe('<HeaderBar/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<HeaderBar />);
    // console.log(wrapper.debug());
  });
});