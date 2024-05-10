import React from 'react'
import Nav from './Nav'
import Notes from './Notes'

function App() {

  return (
    <div className='body'>
      <Nav handleSearchNote />
      <Notes searchText />
    </div>
  )
}

export default App
