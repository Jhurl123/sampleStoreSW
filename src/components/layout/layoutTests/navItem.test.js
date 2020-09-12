import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import NavItem from '../menu/NavItem'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });


let linkProps = {
  link: 'www.google.com',
  text: 'Google'
}

describe('NavItem Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( 
      <Router>
        <NavItem {...linkProps} />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(
      <Router>
        <NavItem {...linkProps} />
      </Router>)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})