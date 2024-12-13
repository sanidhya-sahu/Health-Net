import React from 'react'
import './nav.css'
function navbar() {
  return (
    <div className='navWrap'>
      <div className="nav">
        <div className="navHead">
            <span>H</span>ealth Net
        </div>
        <div className="center">
                <a href='#'>Services</a>
                <a href='#'>How it Works</a>
                <a href='#'>Contact</a>
                <a href='#'>About</a>
        </div>
        <div className="right">
            <button id='login'>Login</button>
            <button id='emergency'>Emergency</button>
        </div>
      </div>
    </div>
  )
}

export default navbar
