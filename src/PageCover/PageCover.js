import React from 'react'
import {useRef} from 'react'
import PageCoverLogoPane from './PageCoverLogoPane'
import PageCoverNavigationPane from './PageCoverNavigationPane'
import './pageCover.css'

const PageCover = () => {
  const pageCoverRef=useRef();
  
  return (
    <>
      <div className="pageCover" >
        <PageCoverLogoPane />
        <PageCoverNavigationPane />
      </div>
      <div className="pageCoverGameScreen" ref={pageCoverRef}>
      </div>
    </>
  )
}

export default PageCover