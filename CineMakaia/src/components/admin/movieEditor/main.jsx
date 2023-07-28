import React from 'react'
import { useLocation } from 'react-router-dom'

function MovieEditor() {
    const location = useLocation()
    const movie = location.state
    
  return (
    <div>MovieEditor</div>
  )
}

export default MovieEditor