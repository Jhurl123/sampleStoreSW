import React, { useState, useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import CartContext from '../context/cartContext'

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '3rem 0',
  },
  info: {
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
  },
  description: {
    textAlign: 'left',
    lineHeight: '1.6',
    wordBreak: 'break-all',
    marginBottom: '2rem'
  },
  price: {
    fontSize: '1.6rem',
    justifySelf: 'flex-start'
  },
  controls: {
    justifyContent: 'space-between',
    display: 'flex'
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    padding: '.75rem',
    margin: '2rem auto',
    fontSize: '1rem',
    background: 'rgb(8 128 88)',
    color: '#ffffff'
  },
  category: {
    textAlign: 'center',
    '& a': {
      color: 'rgb(26, 166, 119)',
      textDecoration: 'none',
      lineHeight: '1.6',
      fontSize: '1.2rem'
    }
  }
}))

const SingleProduct = (props) => {

  const classes = useStyles()
  const { id } = props.match.params
  const cartContext = useContext(CartContext)

  const { cart } = cartContext

  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [userMessage, setUserMessage] = useState(false)
  
  useEffect(() => {
    let unmounted = false;

    getProduct()

    // Cleanup function to prevent memory leak from function above
    return () => { unmounted = true }
  }, [])

  const getProduct = () => {
    
    fetch('/product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    })
    .then(res =>  {
      if (!res.ok) {
        throw new Error('Server Error');
      }
      
      return res.json()

    }).then(data => {
      setProduct(data.product)
    })
  }

  // Typically this would be done with a controlled input field w/ state value
  const addCart = (e) => {

    e.preventDefault()
    let tempCart = []
    let newItem = {
      id: product.id,
      quantity,
      price: product.price
    }

    // Check if item already exists in cart
    let existingItem = cart.filter(item => item.id === product.id);
      
    // Add new item
    if(!existingItem.length) {
      console.log([...cart, newItem]);
      cartContext.submitCart({cart: [...cart, newItem]})
    }
    else {
      // Update the quantity if item exists
      tempCart = cart.map(item => {
        if(item.id === existingItem[0].id) {
          item.quantity = parseInt(item.quantity,10) + parseInt(quantity, 10)
        } 
        return item
      })
      cartContext.submitCart({cart: tempCart})
    }
    successMessage()
  }

  // Inform client that item was successfully added to cart
  // Would normally come at end of API response
  const successMessage = () => {
    setUserMessage(true)

    setTimeout(() => {
      setUserMessage(false)
    }, 3000)
  }

  return(
    <Container style={{ padding: 0 }}>
      <Grid className={classes.page} container>
        <Grid item md={6} sm={12}>
          <img src={product.image} alt={product.productName}/>
        </Grid>
        <Grid className={classes.info} item md={6} sm={12}>
          <h1 style={{color: 'rgb(26, 166, 119)', margin: '3rem 0 0 0'}}>
            {product.productName}
          </h1>
          <p className={classes.category}>
            <Link to={`/products/category/${product.category}`}>
              {product.category}
            </Link>
          </p>
          <p className={classes.description}>
            {product.description && product.description.repeat(25)}
          </p>
          <form onSubmit={e => addCart(e)} className={classes.controls}>
            <span className={classes.price}>{ product.price && ('$' + product.price) }</span>
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              value={quantity}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: { 
                  min: 1
                }
              }}
              onChange={e => setQuantity(e.target.value)}
            />
              <Button variant="contained" type="submit">Add to Cart</Button>
          </form>
          {userMessage && (
            <Alert className={classes.successAlert} severity="success">
              Item Has Been Added to cart
            </Alert>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default SingleProduct