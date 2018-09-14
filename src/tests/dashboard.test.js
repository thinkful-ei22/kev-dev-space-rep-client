import React from 'react';
import  {Dashboard} from '../components/dashboard';
import {shallow} from 'enzyme';
// const shallowWithStore = (component, username, name, loading, history) => {
//   const props = {
//     username,
//     name,
//     loading,
//     history
//   };
//   return shallow(component, {props});
// };

describe('<Dashboard/>', () => {
  it('should render without crashing', () => {
    const props = jest.fn();
    const wrapper = shallow(<Dashboard 
      fetchProgress={props} 
      dispatch={props}
      answer={props}
      history={[]}/>);
    // console.log(wrapper.debug());
  });
});
