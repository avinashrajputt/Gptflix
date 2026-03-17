import React, { useRef,useState } from 'react';
import Header from './Header';
import { checkValidate } from '../utils/validate';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Bg_url, USER_AVATAR } from '../utils/constants';


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidate(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return;

    //Sign in sign up logic

    if(!isSignInForm){
      //signup logic
      createUserWithEmailAndPassword(
        auth, 
        email.current.value, 
        password.current.value
      )
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL:USER_AVATAR
    }).then(() => {
      const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({
                uid:uid,
                email:email,
                displayName:displayName,
                photoURL:photoURL})
            );
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });

    }else{
      //signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then(() => {
    // Successfully signed in

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });

    }

  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={Bg_url}
          alt='logo'
        />
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className='w-full max-w-md absolute p-8 bg-black/85 backdrop-blur-md my-32 mx-auto right-0 left-0 text-white rounded-xl bg-opacity-90 shadow-2xl border border-gray-700'>
        <h1 className="font-black text-4xl py-6 text-center">{isSignInForm ? "Sign In" : "Create Account"}</h1>
        
        {!isSignInForm && (
        <input
          ref={name}
          type="text"
          placeholder="Full Name"
          className="p-4 my-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all font-medium" />)}
        
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all font-medium" />

        <input
          ref={password}
          type="password"
          placeholder="Password (min 6 chars)"
          className="p-4 my-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all font-medium" 
          />
          {errorMessage && <p className='text-red-500 font-bold text-sm py-3 bg-red-500/10 px-3 rounded-lg border border-red-500/30'>{errorMessage}</p>}

        <button className="p-4 my-6 bg-red-600 hover:bg-red-700 w-full rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 text-center text-gray-400 cursor-pointer hover:text-white transition-colors' onClick={toggleSignInForm}>
          {isSignInForm ? "New to GPTFLIX? Sign Up Now" :"Already have an account? Sign In Now"}        
          </p>
      </form>
    </div >
  );
}

export default Login;