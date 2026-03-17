import React from 'react';
import MovieCard from './MovieCard';
import styled from 'styled-components';

const MovieListContainer = styled.div`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const MovieList = ({ title, movies }) => {
  if (movies === null) {
    return <div className="text-white text-center py-8">Loading movies...</div>;
  } else {
    return (
      <MovieListContainer className="px-6 py-8">
        <h1 className="text-3xl font-bold py-4 text-white drop-shadow-lg mb-4">{title}</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-4">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>
      </MovieListContainer>
    );
  }
};

export default MovieList;