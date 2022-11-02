import React from 'react'
import Header from './Header';
import NavBar from './NavBar'
import PageCover from './PageCover'
import './app.css'

let App = ()=> {
  return (
    <div className="App">
      <Header/>
      <NavBar />
      <PageCover />
    </div>
  );
}

export default App;
