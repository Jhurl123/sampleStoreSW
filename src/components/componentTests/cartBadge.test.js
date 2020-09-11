import React from 'react';
import ReactDOM from 'react-dom'
import { configure, mount } from 'enzyme';
import CartBadge from '../cartBadge'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

describe('Cart Badge Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CartBadge />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(<CartBadge />)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})