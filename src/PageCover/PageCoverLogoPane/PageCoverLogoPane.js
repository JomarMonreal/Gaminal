import React from 'react'
import './pageCoverLogoPane.css'
import rotator from '../../Graphics/rotator.png'

const PageCoverLogoPane = () => {
  return (
    <div className="pageCoverContainer">
        <div className='rotator'><img src={rotator} alt="G" /></div>
        <h1 id='aminal'>aminal</h1>
        <h1 id='flow'>Flow</h1>
    </div>
  )
}

export default PageCoverLogoPane