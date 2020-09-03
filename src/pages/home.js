import React, { useEffect, useState } from "react"
import { Container, Grid } from "@material-ui/core"
import ProductCard from '../components/products/productCard'


const Home = () => {

  const [products, setProducts] = useState([])

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
    }
  }


  return(
    <Container style={{ padding: 0 }}>
      <h1 style={{color: 'rgb(26, 166, 119)', margin: '3rem 0 2rem 0'}}>Featured Products</h1>
      <Grid container>
        {products && ( 
          products
        )}
      </Grid>
    </Container>
  )
}

export default Home