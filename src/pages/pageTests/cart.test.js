import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Cart from '../Cart'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

describe('Cart Page Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( 
      <Router>
        <Cart />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(
      <Router>
        <Cart />
      </Router>)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})