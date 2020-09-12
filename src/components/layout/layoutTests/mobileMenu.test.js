import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import MobileMenu from '../menu/mobileMenu'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });


let inProp = {
  inProp: true
}

// TODO Simulate click of the hamburger icon to toggle open/close
describe('Mobile Menu Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( 
      <Router>
        <MobileMenu {...inProp} />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(
      <Router>
        <MobileMenu {...inProp} />
      </Router>)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})