import React, { useState, useEffect }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from "./components/layout/header"
import MobileMenu from './components/layout/menu/mobileMenu'
import Home from './pages/home'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import CategoryPage from './pages/categoryPage'
import SingleProduct from './pages/singleProduct'
import AgeModal from './components/ageModal'
import CookieFunctions from './helpers/cookieFunctions'
import CartContext from './context/cartContext'
import ErrorBoundary from './components/errorBoundary'

const App = () => {

  const [menuState, toggleMenuState] = useState(false)
  const [ageVerified, verifyAge] = useState(CookieFunctions.readCookie('ageVerified'))
  const [modalOpen, setModalStatus] = useState(true)
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {})
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    // Call function to update cart total
    calculateTotal(cart.cart)

  }, [cart])

  // Function to toggle display of mobile menu
  const toggleMenu = () => {    
    toggleMenuState( prevState => !prevState)
  }

  // Update the value of the cart in context
  // Params: [] of cart items
  const updateCartDisplay = (cartItems) => {

    // Update cart here
    setCart(cartItems)
  }

  // Update the value of the cart in LocalStorage
  // If this were a logged in user, this would send their cart to
  // a database as well. No user sign in here, so we store in LocalStorage
  // Params: [] of cart items formatted to be stored in localStorage
  const submitCart = (cartItems) => {
    calculateTotal(cartItems.cart)
    updateCartDisplay(cartItems)
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  // Set the context value of the cart total
  // Params: [] of cart items formatted to be stored in localStorage
  const calculateTotal = (cartItems) => {
    
    if(typeof cartItems === 'undefined' || !cartItems.length)  {
      setCartTotal(0)
      return
    }

    let total = 0

    if(cartItems.length) {
      cartItems.forEach(item => {
        total += item.quantity * parseFloat(item.price).toFixed(2)
      })

      setCartTotal(total)
    }
  }

  const value = {
    cart: cart.cart || [],
    cartTotal,
    updateCart: updateCartDisplay,
    updateTotal: calculateTotal,
    submitCart
  }

  return (
    <Router>
      <ErrorBoundary>
        <CartContext.Provider value={value}>
          <div className="App">
            {!ageVerified && (
              <AgeModal verifyAge={verifyAge} open={modalOpen} setModalStatus={setModalStatus} />
            )}
            <Header siteTitle={"Sample Store"} siteLead={"A store for everyone"} handleMenu={toggleMenu} />
            <MobileMenu in={menuState} siteTitle={"Sample Store"} />
            <ErrorBoundary>
              <Switch>
                <Route path="/products/category/:id" component={CategoryPage} />
                <Route path="/product/:id" component={SingleProduct} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/" component={Home} />
              </Switch>
            </ErrorBoundary>
          </div>
        </CartContext.Provider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
