import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  featuredCard: {
    background: '#ffffff',
    borderRadius: '6px',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  featuredCardImage: {
    minHeight: '220px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
  },  
  featuredCardTag: {
    marginBottom: '.125rem',
    marginLeft: '.125rem',
    color: '#717070',
  },
  featuredCardTitle: {
    fontSize: '1.45rem',
    marginBottom: '.65rem',
  },
  featuredCardLink: {
    color: 'rgb(26, 166, 119)',
    textDecoration: 'none',
  },
  featuredCardInner: {
    padding: '.65rem 1.45rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'baseline'
  },
  price: {
    fontSize: '1.25rem',
    margin: '.5rem 0'
  },
  category: {
    fontSize: '1.25rem',
    margin: '.5rem 0'
  }
}))

// Card to show a product on all "list" routes
// Good for showing multiples and showing minimal info about product
const ProductCard = (props) => {

  const classes = useStyles()

  const { id, productName, category, image, price } = props

  return (
    <Grid item xs={12} sm={6} md={4} style={{padding: '1rem'}}> 
      <div className={classes.featuredCard}>
        <Link to={`/product/${id}`}>
          <div className={classes.featuredCardImage} style={{backgroundImage: 'url(' + image + ')'}}></div>
        </Link>
        <div className={classes.featuredCardInner}>
          <h3 className={classes.featuredCardTitle}>
            <Link className={classes.featuredCardLink} to={`/product/${id}`}>
              {productName}
            </Link>
          </h3>
          <p className={classes.price}>{'$' + price}</p>
          <Link className={classes.featuredCardLink} to={`/products/category/${category}`}>
            <p className={classes.category}>{category}</p>
          </Link>
        </div>
      </div>
    </Grid>
  )
}

ProductCard.propTypes = {
  id: PropTypes.string,
  productName: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string
}

export default ProductCard