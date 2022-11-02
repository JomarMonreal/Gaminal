import React from 'react'
import rotator from '../Graphics/rotator.png'
import './pageCover.css'

const PageCover = () => {
  return (
    <div className="pageCover">
        <div className='rotator'><img src={rotator} alt="G" /></div>
        <h1 id='aminal'>aminal</h1>
        <h1 id='flow'>Flow</h1>
        
        
        <button>Find Terminal <br/> Games</button>
    </div>
  )
}

export default PageCover