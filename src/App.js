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

  function debounce(func, delay) {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
  }

  const handlePageChange = (event) => {
    setPage(Number(event.target.value));
  }

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
          <button onClick={debounce(handlePageDown, 500)} className='page-down'>{'<'}</button>
          <input className='page-number' value={page} onChange={handlePageChange}></input>
          <button onClick={debounce(handlePageUp, 500)} className='page-up'>{'>'}</button>
        </div>
      </div>
      <div className='pokemon-cards'>
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && pokemonList && pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
