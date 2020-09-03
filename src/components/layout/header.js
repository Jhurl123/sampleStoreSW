import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom";
import NavMenu from './menu/navMenu'
import Hamburger from './menu/hamburger'
import { Container, Grid, Hidden } from "@material-ui/core"

const Header = (props) => {
  
  return(
    <header
      style={{
        background: `linear-gradient(90deg, rgba(7,148,101,1) 0%, rgba(26,166,119,1) 86%, rgba(6,147,99,1) 98%)`,
        padding: `1.45rem 1.0875rem`,
        textAlign: "left"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={10} sm={10} md={4} > 
            <h1 style={{ margin: 0, zIndex: 1000}}>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: `none`,
                }}
              >
                {props.siteTitle}
              </Link>
            </h1>
            <span
              style={{
                color: 'white',
                fontSize: '14px',
                fontStyle: 'italic'
              }}
            >
              {props.siteLead}
            </span>
          </Grid>
          <Hidden only={['sm', 'xs']}>
            <Grid item md={8}>
              <NavMenu />
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={2} sm={2} style={{textAlign: "right"}}> 
              <Hamburger toggleMenu={props.handleMenu} />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteLead: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
  siteLead: ''
}

export default Header
