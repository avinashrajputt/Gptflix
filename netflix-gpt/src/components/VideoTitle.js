
const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black via-black/60 to-transparent flex flex-col justify-center">
        <h1 className="text-7xl font-black mb-4 drop-shadow-lg">{title}</h1>
        <p className="py-6 text-base w-1/2 text-gray-200 line-clamp-3 drop-shadow-md">{overview}</p>
    <div className="flex gap-4">
        <button className="bg-white hover:bg-gray-200 text-black font-bold px-10 py-3 text-lg rounded-lg transition-all duration-300 hover:shadow-lg flex items-center gap-2 hover:scale-105">
        Play
        </button>
        <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold px-10 py-3 text-lg rounded-lg bg-opacity-70 transition-all duration-300 hover:shadow-lg hover:bg-opacity-80 flex items-center gap-2">
        More Info
        </button>
    </div>
    </div>
  )
}

export default VideoTitle;