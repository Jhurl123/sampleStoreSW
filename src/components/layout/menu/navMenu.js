import React from 'react'
import NavItem from './navItem'
import './navMenu.css'
import NAVITEMS from './NAVITEMS'
import CartBadge from '../../cartBadge'

const NavMenu = () => {
  
  const menuItems = NAVITEMS.map(item => (<NavItem key={item.id} link={item.link} text={item.text} />))
  return (
  
    <ul className="nav-items_menu">
      { menuItems}
      <li className="nav-menu_link"><CartBadge /></li>
    </ul>
  )
}

export default NavMenu