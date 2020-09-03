import React, { useState } from 'react'
import './hamburger.css'

const Hamburger = (props) => {

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleButton = () => {
    setMenuOpen(prevState => !prevState)
    props.toggleMenu()
  }

  return (
    <button 
      className='hamburgerButton'
      type="button"
      onClick={() => toggleButton()}
    >
      <div className={`mainLine ${menuOpen ? 'open' : ''}`}></div>
    </button>
  )
}

export default Hamburger