import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect, useCallback } from "react";


const useNowPlayingMovies = () => {

     //fectch data from tmbd api and update the store
  const dispatch = useDispatch();

  const getNowPlayingMovies = useCallback(async () => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?page=1',
        API_OPTIONS
      );
      
      if (!data.ok) {
        console.error('TMDB API Error:', data.status, data.statusText);
        return;
      }
      
      const json = await data.json();
      
      if (json.results) {
        dispatch(addNowPlayingMovies(json.results));
      }
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    getNowPlayingMovies();
  }, [getNowPlayingMovies]);
}

export default useNowPlayingMovies;