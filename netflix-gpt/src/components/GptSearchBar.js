import React, { useRef, useState } from 'react';
import lang from '../utils/languageConstants';
import { useSelector, useDispatch } from 'react-redux';
import { getMockMovieRecommendations } from '../utils/mockAI';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/search/movie?query=' + encodeURIComponent(movie) + '&include_adult=false&language=en-US&page=1',
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (err) {
      console.error('TMDB Search Error:', err);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    
    if (!query) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use mock AI for recommendations (no API key needed!)
      const textgpt = getMockMovieRecommendations(query);
      console.log('Mock AI Response:', textgpt);
      
      const gptMovies = textgpt.split(',').map(movie => movie.trim()).filter(movie => movie.length > 0);
      
      if (gptMovies.length === 0) {
        setError('No movies found. Try a different search query.');
        setLoading(false);
        return;
      }

      // For each movie, search TMDB API
      const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);
      console.log('TMDB Results:', tmdbResults);

      dispatch(addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults }));
      
    } catch (error) {
      console.error('Error fetching movie recommendations:', error);
      setError('Error: ' + (error.message || 'Failed to fetch recommendations'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-24 pb-8 flex justify-center px-4'>
      <form className='w-full max-w-2xl' onSubmit={(e) => e.preventDefault()}>
        <div className='flex gap-3 mb-4'>
          <input
            ref={searchText}
            type='text'
            className='flex-1 p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 placeholder-gray-400 text-lg transition-all font-medium'
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            disabled={loading}
            className='px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-600/50 flex items-center gap-2'
            onClick={handleGptSearchClick}
          >
            {loading ? (
              <>Searching...</>
            ) : (
              lang[langKey].search
            )}
          </button>
        </div>
        {error && (
          <div className='text-red-400 text-center py-3 bg-red-600/10 border border-red-600/30 rounded-lg font-medium'>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;