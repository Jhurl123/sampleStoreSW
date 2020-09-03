import React from 'react'

export default React.createContext({
  cart: [],
  cartTotal: [],
  updateCart: () => {},
  updateTotal: () => {},
  submitCart: () => {}
})