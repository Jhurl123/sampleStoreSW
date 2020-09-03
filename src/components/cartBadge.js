import React, { useState, useContext, useEffect }  from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartContext from '../context/cartContext'

// Leverage Material UI Chip to display cart total and quantity in cart
const CartBadge = () => {

  const history = useHistory()
  const cartContext = useContext(CartContext)
  const [quantity, setQuantity] = useState(0)

  const { cart, cartTotal} = cartContext

  useEffect(() => {
    getQuantity()
  }, [cart])

  const navigatePage = () => {
    history.push('/cart')
  }

  const getQuantity = () => {
    let tempQuantity = 0
    cart.forEach(item => {
      tempQuantity += parseInt(item.quantity, 10)
    })

    setQuantity(tempQuantity)

  }
  
  return (
    <div>
      <Chip
        avatar={<Avatar>{quantity}</Avatar>}
        label={'$' + cartTotal}
        clickable
        href="#chip"
        color="primary"
        onClick={() => navigatePage()}
        onDelete={() =>{}}
        deleteIcon={<ShoppingCartIcon />}
      />
    </div>
  )
}

export default CartBadge