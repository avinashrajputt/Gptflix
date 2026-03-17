import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect, useCallback } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    //fetch trailer video
    const getMovieVideos = useCallback(async () => {
       try {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/"
            +movieId
            +"/videos?language=en-US", 
            API_OPTIONS
        );
        
        if (!data.ok) {
          console.error('TMDB API Error:', data.status, data.statusText);
          return;
        }
        
        const json = await data.json();

        if (!json.results || json.results.length === 0) {
          console.warn('No videos found for movie:', movieId);
          return;
        }

        const filterData = json.results.filter((video)=> video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
       } catch (error) {
         console.error('Error fetching movie videos:', error);
       }
    }, [movieId, dispatch]);

    useEffect(() => {
        getMovieVideos();
    }, [getMovieVideos]);

}

export default useMovieTrailer;