import React from 'react'
import './PokemonCard.css'

export const PokemonCard = ({ pokemon }) => {

    return (

        <div className='pokemon-card-container'>
            <img className="pokemon-card-image" src={pokemon.image} alt={pokemon.name} />
            <h2 className='pokemon-card-name'>{pokemon.name}</h2>
            <h3 className='pokemon-card-type'>{pokemon.types}</h3>
        </div>

    )
}
