import React from "react"
import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  page: {
    margin: '3rem 0',
  }
}))

// Currently a work in progress
const Checkout = () => {

  const classes = useStyles()
  return(
    <Container maxWidth="md" style={{ padding: 0 }}>
      <Grid justify="center" className={classes.page} container>
        <h1 style={{color: 'rgb(26, 166, 119)', margin: '3rem 0 2rem 0'}}>Checkout Page</h1>
      </Grid>
    </Container>
  )

}

export default Checkout