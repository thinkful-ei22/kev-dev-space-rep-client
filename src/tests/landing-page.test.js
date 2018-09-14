import React from 'react';
import  LandingPage from '../components/app';
import {shallow} from 'enzyme';

describe('<LandingPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LandingPage />);
    // console.log(wrapper.debug());
  });
});