import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieResults) return null;

  return (
    <div className='mt-8 pb-16 bg-gradient-to-b from-transparent via-black/60 to-black'>
      <div className='px-6'>
        <h2 className='text-4xl font-bold text-white mb-8 drop-shadow-lg'>
          Your Recommendations
        </h2>
      </div>
      {movieNames?.map((movieName, index) => (
        <MovieList 
          key={movieName} 
          title={movieName} 
          movies={movieResults[index]} 
        />
      ))}
    </div>
  )
}

export default GptMovieSuggestions