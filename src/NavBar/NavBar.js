import React from 'react'
import './navBar.css'

const NavBar = () => {
  return (
    <div className='navBar'>
        <ul>
            <li><a href="/">Find Games</a></li>
            <li><a href="Home">Upload Game</a></li>
            <li><a href="Home">Developers</a></li>
            <li><a href="Home">Forums</a></li>
        </ul>
        <input type="text" placeholder='Curious about something?' />
    </div>
  )
}

export default NavBar