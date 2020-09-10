import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import ProductCard from '../components/products/productCard'
import Alert from '@material-ui/lab/Alert'


const CategoryPage = (props) => {

  const [products, setProducts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const { id } = props.match.params

  useEffect(() => {
    getProducts()
  }, [])

  // Get all Products from API
  const getProducts = async () => {
    try {
      setErrorMessage('')
      const response = await fetch("/get_categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
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
      <h1 style={{color: 'rgb(26, 166, 119)', margin: '3rem 0 2rem 0'}}>{id + ' Products'}</h1>
      {errorMessage && (
        <Alert severity="error" className="errorMessage">
          {errorMessage}
        </Alert>
      )}
      <Grid container>
        {products && ( 
          products
        )}
      </Grid>
    </Container>
  )
}

export default CategoryPage