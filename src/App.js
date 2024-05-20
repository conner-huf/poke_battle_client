import './App.css';
import { useEffect, useState } from 'react';
import { PokemonCard } from './Components/PokemonCard/PokemonCard';

function App() {
  const [pokemonList, setPokemonList] = useState(null)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const DEV_URL = "https://localhost:7000"
  const PROD_URL = ""

  const ACTIVE_URL = DEV_URL

  useEffect(() => {
    setIsLoading(true)
    fetch(`${ACTIVE_URL}/pokemon?page=${page}`)
      .then(res => res.json())
      .then(data => setPokemonList(data))
      .then(() => setIsLoading(false))
  }, [ACTIVE_URL, page])

  const handlePageUp = () => {
    setPage(page + 1)
    setIsLoading(true)
    fetch(`${ACTIVE_URL}/pokemon?page=${page}`)
      .then(res => res.json())
      .then(data => setPokemonList(data))
      .then(() => setIsLoading(false))
  }

  const handlePageDown = () => {
    setPage(page - 1)
    setIsLoading(true)
    fetch(`${ACTIVE_URL}/pokemon?page=${page}`)
      .then(res => res.json())
      .then(data => setPokemonList(data))
      .then(() => setIsLoading(false))
  }

  return (
    <div className='App'>
      <div className='header-container'>
        <div className='header-left'>

        </div>
        <div className='header-center'>
          <input className='search-bar'></input>
          <button className='search-button'>Search</button>
        </div>
        <div className='header-right'>
          <button onClick={handlePageDown} className='page-down'>{'<'}</button>
          <button onClick={handlePageUp} className='page-up'>{'>'}</button>
        </div>
      </div>
      <div className='pokemon-cards'>
        {isLoading && <h1>Loading...</h1>}
        {pokemonList && pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
