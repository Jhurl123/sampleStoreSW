import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import CategoryPage from '../categoryPage'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

describe('Category Page Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( 
      <Router>
        <CategoryPage match={{params: {id: 1}, isExact: true, path: "", url: ""}} />
      </Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(
      <Router>
        <CategoryPage match={{params: {id: 1}, isExact: true, path: "", url: ""}} />
      </Router>)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})