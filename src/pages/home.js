import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import ErrorBoundary from '../components/errorBoundary'
import ProductCard from '../components/products/productCard'
import Alert from '@material-ui/lab/Alert'


const Home = () => {

  const [products, setProducts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [test, setTest] = useState({})

  // Get all products when component mounts
  useEffect(() => {
    getProducts()
  }, [])

  // Get All Products from API
  // Limited to 10 in node API
  const getProducts = async () => {
    try {
      const response = await fetch("/get_products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const productRes = await response.json()
      const productComp = productRes.products.map(product => <ProductCard key={product.id} {...product} />) 
      
      setProducts(productComp)     
    }
    catch(err) {
      // Error Handling here
      setErrorMessage('Something went wrong when grabbing these products!')
    }
  }


  return(
    <Container style={{ padding: 0 }}>
      <h1 style={{color: 'rgb(26, 166, 119)', margin: '3rem 0 2rem 0'}}>Featured Products</h1>
      {errorMessage && (
        <Alert severity="error">
          {errorMessage}
        </Alert>
      )}
      <Grid container>
        <ErrorBoundary>
          {products && ( 
            products
          )}
        </ErrorBoundary>
      </Grid>
    </Container>
  )
}

export default Home