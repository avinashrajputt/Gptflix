import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect, useCallback } from "react";
import { addPopularMovies } from "../utils/moviesSlice";


const usePopularMovies = () => {

     //fectch data from tmbd api and update the store
  const dispatch = useDispatch();

  const getPopularMovies = useCallback(async () => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/popular?page=1',
        API_OPTIONS
      );
      
      if (!data.ok) {
        console.error('TMDB API Error:', data.status, data.statusText);
        return;
      }
      
      const json = await data.json();
      
      if (json.results) {
        dispatch(addPopularMovies(json.results));
      }
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);
}

export default usePopularMovies;