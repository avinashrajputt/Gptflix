import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


export const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

   useNowPlayingMovies();
   usePopularMovies();
   useTrendingMovies();
   useUpcomingMovies();

  return (
    <div className="bg-black min-h-screen">
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
      <>
      <MainContainer />
      <SecondaryContainer />
      </>
  )}
    </div>
  )
}

export default Browse;