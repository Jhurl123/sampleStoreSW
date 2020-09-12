import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Hamburger from '../menu/Hamburger'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

let props = {
  toggleMenu: jest.fn()
}

// TODO Simulate click of the hamburger icon to toggle open/close
describe('Hamburger Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( 
      <Router>
        <Hamburger {...props} />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(
      <Router>
        <Hamburger {...props} />
      </Router>)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})