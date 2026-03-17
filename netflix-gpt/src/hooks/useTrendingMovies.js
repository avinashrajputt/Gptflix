import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTrendingMovies } from "../utils/moviesSlice";


const useTrendingMovies = () => {

     //fetch data from tmdb api and update the store
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/trending/movie/week?page=1',
        API_OPTIONS
      );
      
      if (!data.ok) {
        console.error('TMDB API Error:', data.status, data.statusText);
        return;
      }
      
      const json = await data.json();
      
      if (json.results) {
        dispatch(addTrendingMovies(json.results));
      }
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getTrendingMovies();
  }, [dispatch]);
}

export default useTrendingMovies;
