import  { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import '../css/user.css';
import SignupPage from './user/signup-page';
import UserNav from './user/user-nav';
import outlineUserSvg from '../assets/svg/outline-user.svg';


const UserPage = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { config } = useSelector((store) => store.persistedReducer.user);
 const myRef = useRef();

 //  display Login if user is login
 useEffect(() => {
   if (config.headers.token === null) return;
   setUserLogin(true);
  }, [config]);
  
  function handleClickOutside(e) {
    if (!myRef.current.contains(e.target)) {
      setDropdown(false);
    }
  }
   useEffect(() => {
     //listen for click to close dropdown
     document.addEventListener('click', handleClickOutside);
     return () => document.removeEventListener('click', handleClickOutside);
   }, []);

  return (
    <>
      {userLogin ? (
        <div
          className='nav-container'
          ref={myRef}
          onClick={handleClickOutside}
        >
          <button
            className='drop-btn'
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <img
              src={outlineUserSvg}
              alt='user icon'
              className='user-nav-icon'
            />
          </button>
          <UserNav
            className={dropdown ? 'user-nav mobile' : 'user-nav '}
            onClick={() => {
              setDropdown(!dropdown);
            }}
          />{' '}
        </div>
      ) : (
        <SignupPage />
      )}
    </>
  );
};
export default UserPage;
