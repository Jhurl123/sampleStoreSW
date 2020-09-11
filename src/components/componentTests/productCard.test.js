import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import ProductCard from '../products/productCard'
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });

// ProductCard.propTypes = {
//   id: PropTypes.string,
//   productName: PropTypes.string,
//   category: PropTypes.string,
//   image: PropTypes.string,
//   price: PropTypes.string
// }

// Define potential props 
let cardProps = {
  id: '3',
  productName: 'Stainless Steel tuna',
  category: 'Jewelry',
  image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fplaceholder&psig=AOvVaw0yhh4NKvTCyks6ZObmubUd&ust=1599952106281000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDyh5uc4usCFQAAAAAdAAAAABAD',
  price: '45.00'
}

describe('Cart Badge Tests', () => {

  it('renders the UI without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <ProductCard {...cardProps} />
      </Router>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders the ui as expected', () => {
    const tree =  mount(
    <Router>
      <ProductCard {...cardProps} />
    </Router>)
    expect(toJson(tree)).toMatchSnapshot();  
  })

})