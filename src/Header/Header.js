import React from 'react'
import logo from '../Graphics/logo.png'
import './header.css'

const Header = () => {
  return (
    <div className='Header'>
        <div className='logo'><img src={logo} alt="Gaminal Flow" /></div>

        <div className='logoname'><p>Gaminal <span className='flow'>Flow</span></p></div>

        <button className='login'> Log In </button>
        
        <button className='register'> Register </button>
    </div>
  );
}

export default Header
