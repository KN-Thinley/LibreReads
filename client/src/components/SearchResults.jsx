import React from 'react'
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search).get("query")
  return (
    <div>
        <h1>
            Search Results for {query}
        </h1>
        
    </div>
  )
}

export default SearchResults