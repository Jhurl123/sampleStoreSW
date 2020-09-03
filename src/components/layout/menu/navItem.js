import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import './navItem.css'

// Individual Menu Item
const NavItem = (props) => {

  return (
    <li className='nav-menu_link'>
      <Link to={props.link}>
        {props.text}
      </Link>
    </li>
  )
}

NavItem.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}

export default NavItem