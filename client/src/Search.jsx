import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Search({ handleSearchText }) {

  return (
    <div className='search'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
      <input onChange={(e) => handleSearchText(e.target.value)} type="text" placeholder="Search" />
    </div>
  )
}

export default Search
