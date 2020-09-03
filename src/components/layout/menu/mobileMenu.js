import React from 'react'
import NavItem from './navItem'
import NAVITEMS from './NAVITEMS'
import { Transition } from 'react-transition-group';
import CartBadge from '../../cartBadge'
const duration = 200;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  background: `linear-gradient(90deg, rgba(7,148,101,1) 0%, rgba(26,166,119,1) 86%, rgba(6,147,99,1) 98%)`,
  color: '#fff',
  position: 'relative',
  width: '100%',
  height: '100vh',
  display: 'none',
  zIndex: 10000,
}

const transitionStyles = {
  entering: { opacity: .5,display: 'block'},
  entered:  { opacity: 1,display: 'block'},
  exiting:  { opacity: .5},
  exited:  { opacity: 0 },
};

const MobileMenu = ({ in: inProp}) => {
  
  const menuItems = NAVITEMS.map(item => (<NavItem key={item.id} link={item.link} text={item.text} />))
  
  return (
    <Transition in={inProp} timeout={25}>
      {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
              <ul style={{
                position: 'absolute',
                opacity: 0,
                margin: 0,
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                ...transitionStyles[state]
              }}
              className={`mobile`} >
                { menuItems}
                <li className="nav-menu_link"><CartBadge /></li>
              </ul>
              
          </div>
      )}
    </Transition>
  )
}

export default MobileMenu