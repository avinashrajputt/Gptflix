import MovieList from "./MovieList"
import { useSelector } from "react-redux"

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies &&(
      <div className="bg-gradient-to-b from-transparent via-black to-black pb-32">
        <div className="-mt-52 pl-12 relative z-20 pt-12">
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
          <MovieList title={"Trending"} movies={movies?.trendingMovies || movies?.nowPlayingMovies}/>
          <MovieList title={"Popular"} movies={movies?.popularMovies}/>
          <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies || movies?.nowPlayingMovies}/>
          <MovieList title={"Horror"} movies={movies?.nowPlayingMovies}/>
        </div>
      </div>
    )
  );
};

export default SecondaryContainer