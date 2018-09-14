import React from 'react';
import  {RegistrationPage} from '../components/registration-page';
import {shallow} from 'enzyme';

describe('<RegistrationPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<RegistrationPage />);
    // console.log(wrapper.debug());
  });
});