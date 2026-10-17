import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <h1>Pokedex</h1>
        <p>Welcome to the Pokedex app. Click below to view all pokemon.</p>
        <Link to="/pokemon">Open Pokedex</Link>
    </div>
  )
}

export default Home