import React, { useState, useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CartContext from '../context/cartContext'
import ErrorBoundary from "../components/errorBoundary"

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '3rem 0',
  },
  cartTable: {
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    width: '100%',
    '& tr': {
      width: '100%',
      minHeight: '6rem'
    },
    '& tbody td': {
      border: '1px solid #e3e3e3',
      padding: '.25rem'
    },
    '& th': {
      border: '1px solid #e3e3e3',
      padding: '.25rem'
    },
    '& a': {
      color: 'rgb(8 128 88) !important',
      textDecoration: 'none'
    }
  },
  totalText: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  totalAmount: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  checkoutButton: {
    margin: '0 1rem',
    backgroundColor: 'rgb(8 128 88) !important',
    '& a': {
      textDecoration: 'none',
      color: '#000000',
    }
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    padding: '.75rem',
    margin: '2rem auto',
    fontSize: '1rem',
    background: 'rgb(8 128 88)',
    color: '#ffffff',
    width: '75%'
  },
}))

const Cart = () => {

  const classes = useStyles()
  const cartContext = useContext(CartContext)
  const { cart, submitCart } = cartContext

  const [cartPageTotal, setCartPageTotal] = useState(0)
  const [fullCartItems, setFullCartItems] = useState(cart)
  const [displayItemRows, setDisplayItemRows] = useState([])
  const [userMessage, setUserMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    getCartItems()
    calculateTotal()
  }, [])

  // When the number of items in cart changes, also change the markup
  // recalculate total
  useEffect(() => {
    if(fullCartItems) {
      formatCartJSX(fullCartItems)
      calculateTotal()
    }
  }, [fullCartItems])

  // Get cart items
  // Decided on using this instead of storing all of the items and info 
  // in localstorage in the event that product info has changed since added to cart
  const getCartItems = async () => {

    let fullItems = []

    if(cart && !cart.length) return

    // Use for loop to use async/await to replace Promise.all
    for(let i = 0; i < cart.length; i++) {
      const item = cart[i]
      fullItems.push(await getItemInfo(item))
    }    
    
    setFullCartItems(fullItems)
  }

  // Get the full item info from API
  // Params: item - string
  const getItemInfo = async item => {
    try {
      return await fetch('/product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: item.id})
      })
      .then(res =>  {
        if (!res.ok) {
          throw new Error('Server Error');
        }
        return res.json()
      }).then(data => {
        setErrorMessage(false)
        return {...data.product, ...item}
      })
    }
    catch(err) {
      setErrorMessage(true)
      return 
    }
  }

  // Format and populate all data and insert into 
  // JSX markup to allow for modifying the items w/in cart
  // Params: [] of cart items
  const formatCartJSX = items => {
  
    let displayItems = items.map(item => {

      if(!item) return

      const itemTotal = parseFloat(item.quantity, 10) * parseFloat(item.price, 10)
      let formatTotal = itemTotal.toFixed(2)

      // TODO Get around weird bug with the Number Textfield
      // where I couldn't set default value
      if( formatTotal === 'NaN'){
         formatTotal = 0
      }

      return ( 
        <tr key={item.id}>
          <td style={{width: '25%'}}>
            <Link to={`/product/${item.id}`}>
              {item.productName}
            </Link>
          </td>
          <td style={{width: '25%'}}>
            <TextField
                id={`quantity-${item.id}`}
                name={`quantity-${item.id}`}
                label="Number"
                type="number"
                value={item.quantity}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  min: 0
                }}
                onChange={e => updateItemQuantity(e.target.value, item.id)}
              />
            </td>
          <td style={{width: '25%'}}>{'$' + formatTotal}</td>
          <td style={{width: '25%'}}>
            <IconButton onClick={() => removeItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      )
    })
    setDisplayItemRows(displayItems)

  }

  // Calculate the total of all items in the cart
  const calculateTotal = () => {
    let total = 0
    if(fullCartItems) {
      fullCartItems.forEach(item => {
        total += item.quantity * parseFloat(item.price).toFixed(2)
      })
    }
    
    setCartPageTotal(total)
  }

  // Update the individual items when value in textfield is changed
  // Params: newQuantity - number, itemId - string
  // Return: none©
  const updateItemQuantity = (newQuantity, itemId) => {

    let cartItems = []
    cartItems = fullCartItems.map(item => {
      if(item.id === itemId) {
        item.quantity = newQuantity
      }
      return item
    })

    setFullCartItems(cartItems)
  }

  // Do not return items in the cart with a "0" quantity
  // Params: none
  // Returns: [] of cart items
  const filterZeroQty = () => {
    let nonZeroItems = fullCartItems.filter(item => item.quantity > 0)
    setFullCartItems(nonZeroItems)
    return nonZeroItems
  }

  // OnSubmit method to update cart
  // Params: form Event
  // Return: none
  const updateCart = async e => {

    e.preventDefault()
    let nonZeroItems = filterZeroQty()
    
    // Format the cart data to be inserted
    // into local storage
    let storedCart = nonZeroItems.map(item => {
      return {
        id: item.id,
        quantity: item.quantity,
        price: item.price
      }
    })
    
    successMessage()
    submitCart({cart: storedCart})
  }

  // Function to remove item from cart state
  // Params: id - string
  // Return: none
  const removeItem = id => {

    if(fullCartItems.length === 1) {
      setFullCartItems([])
    }
    else {
      let cartItems = fullCartItems.filter(item => item.id !== id)
      setFullCartItems(cartItems)
    }
  }

  // Inform customer that item was successfully added to cart
  // Would normally come at end of API response
  const successMessage = () => {
    setUserMessage(true)
    setTimeout(() => {
      setUserMessage(false)
    }, 3000)
  }

  return(
    <Container maxWidth="md" style={{ padding: 0 }}>
        <Grid justify="center" className={classes.page} container>
          {errorMessage && (
            <Alert severity="error">
              Something went wrong! Please try again!
            </Alert>
          )}
          <h1 style={{color: 'rgb(26, 166, 119)', margin: '3rem 0 2rem 0'}}>Cart</h1>
          <form onSubmit={(e)=> updateCart(e)}>
            <table className={classes.cartTable}>
              <thead>
                <tr>
                  <th style={{width: '25%'}}>Item Name</th>
                  <th style={{width: '25%'}}>Quantity</th>
                  <th style={{width: '25%'}}>Price</th>
                  <th style={{width: '25%'}}>Remove?</th>
                </tr>
              </thead>
              <tbody>
                {displayItemRows && (
                  displayItemRows
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{border: 'none'}}></td>
                  <td className={classes.totalText} style={{padding: '1.5rem'}}>
                    Total
                  </td>
                  <td className={classes.totalAmount} style={{padding: '1.5rem'}}>
                    {'$' + parseFloat(cartPageTotal).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <Button className={classes.checkoutButton} size="large" variant="contained" type="submit">
              Update Cart
            </Button>
            <Button className={classes.checkoutButton} size="large" variant="contained" type="button">
              <Link to={'/checkout'} style={{color: '#ffffff'}}>
                Checkout
              </Link>
            </Button>
          </form>
          {userMessage && (
            <Alert className={classes.successAlert} severity="success">
              Cart has been updated!
            </Alert>
          )}
        </Grid>
    </Container>
  )

}

export default Cart