import {useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({movieId}) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
 
    useMovieTrailer(movieId);
    
    if (!trailerVideo?.key) {
      return (
        <div className='w-screen aspect-video bg-gradient-to-b from-gray-900 to-black flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-2xl text-gray-400 font-bold'>Loading video...</p>
            <p className='text-gray-500 mt-2'>Trailer will appear here</p>
          </div>
        </div>
      );
    }

  return (
    <div className='w-screen'>
      <iframe 
      className='w-screen aspect-video' 
      src={"https://www.youtube.com/embed/"+trailerVideo?.key + "?autoplay=1&mute=1"} 
      title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      >
      </iframe>
    </div>
  )
}

export default VideoBackground

