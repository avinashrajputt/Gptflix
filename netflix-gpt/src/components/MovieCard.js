import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {

  return (
    <div className="w-48 pr-4 group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-20">
        <img 
        alt="Movie Card" 
        src={IMG_CDN_URL + posterPath}
        className="rounded-lg shadow-lg group-hover:shadow-2xl group-hover:shadow-red-600/50 w-full h-auto object-cover transition-all duration-300"
        />
    </div>
  );
};

export default MovieCard 