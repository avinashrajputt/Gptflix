import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector(store => store.user);
   const showGptSearch = useSelector(store => store.gpt.showGptSearch);
   const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      })
      .catch((error) => {
      navigate("/error");
    });
   };


      useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
           const {uid,email,displayName,photoURL} = user;
           dispatch(addUser({
             uid:uid,
             email:email,
             displayName:displayName,
             photoURL:photoURL})
           );
           navigate("/browse");
         } else {
           dispatch(removeUser());
           navigate("/");
         }
       });
       //unsubscribe when component unmount
       return () => unsubscribe();

      }, [dispatch, navigate]);

    const handleGptSearchClick = () => {
      //toggle gpt search
      dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
      //change language
      dispatch(changeLanguage(e.target.value));
    }

  return (
    <div className='fixed w-full px-6 py-4 bg-gradient-to-b from-black via-black/80 to-transparent z-50 flex justify-between items-center shadow-lg'>
      <div 
      className="text-5xl font-black text-red-600 cursor-pointer hover:text-red-400 transition-all duration-300 hover:scale-110"
      onClick={() => navigate("/browse")}
      >
        GPTFLIX
      </div>
      {user &&(
      <div className='flex gap-4 items-center pr-4'>

        {showGptSearch && (
          <select 
          className='px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors cursor-pointer font-medium' 
          onChange={handleLanguageChange}
          >
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>)}

        <button 
        className='py-2 px-6 mx-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50' 
        onClick={handleGptSearchClick}
        >
         {showGptSearch ? "Home" : "AI Search"}
        </button>
        <img 
        className='w-10 h-10 rounded-full border-2 border-red-600 hover:border-red-400 cursor-pointer transition-colors'
        alt='usericon'
        src={user?.photoURL}
        />
     <button 
     onClick={handleSignOut} 
     className='font-bold text-white hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-800'
     >
      Sign Out
      </button>
      </div>
      )}
    </div>
  );
}

export default Header;