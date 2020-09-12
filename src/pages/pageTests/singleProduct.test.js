import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import SingleProduct from '../SingleProduct'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';  
 
configure({ adapter: new Adapter() });

describe('Single Product Page Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( 
      <Router>
        <SingleProduct match={{params: {id: 1}, isExact: true, path: "", url: ""}} />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(
      <Router>
        <SingleProduct match={{params: {id: 1}, isExact: true, path: "", url: ""}} />
      </Router>)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})