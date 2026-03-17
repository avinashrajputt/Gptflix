import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/moviesSlice";


const useUpcomingMovies = () => {

     //fetch data from tmdb api and update the store
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?page=1',
        API_OPTIONS
      );
      
      if (!data.ok) {
        console.error('TMDB API Error:', data.status, data.statusText);
        return;
      }
      
      const json = await data.json();
      
      if (json.results) {
        dispatch(addUpcomingMovies(json.results));
      }
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getUpcomingMovies();
  }, [dispatch]);
}

export default useUpcomingMovies;
