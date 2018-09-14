import React from 'react';
import  {App} from '../components/app';
import {shallow} from 'enzyme';

describe('<App/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<App />);
    // console.log(wrapper.debug());
  });
});
