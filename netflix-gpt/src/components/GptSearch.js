import { Bg_url } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    
    <div>
        <div className="fixed -z-10 w-full h-screen">
        <img
          src={Bg_url}
          alt='background'
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
};

export default GptSearch