import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Home from '../home'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

describe('Home Page Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( 
      <Router>
        <Home />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(
      <Router>
        <Home />
      </Router>)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})