import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { verifyToken } from '../helpers/api-calls';
import restrictImg from '../assets/img/restrict-img.png';
import packageSvg from '../assets/svg/package.svg';
import arrowLeftSvg from '../assets/svg/arrowleft.svg';
import outlineUserSvg from '../assets/svg/outline-user.svg';

import UserNav from './user/user-nav';

const SettingsPage = () => {
  const [admin, setAdmin] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { isAdmin, config } = useSelector(
    (store) => store.persistedReducer.user
  );
  const location = useLocation();
  const myRef = useRef();

  useEffect(() => {
    // verify if user is admin
    const user = {
      isAdmin: isAdmin,
    };

    verifyToken(user, config).then((res) => {
      if (res.data !== 'true') return;
      setAdmin(true);
    });
  }, [isAdmin, config]);

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

  if (admin) {
    return (
      <div className='nav-container' ref={myRef} onClick={handleClickOutside}>
        <button
          className='drop-btn'
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <img src={outlineUserSvg} alt='user icon' className='user-nav-icon' />
        </button>
        <UserNav
          className={dropdown ? 'user-nav mobile' : 'user-nav '}
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <li
            className={`${
              location.pathname === '/settings/admin/orders' && 'focus'
            }`}
          >
            <Link
              to='orders'
              className='user-nav-item'
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <img
                src={packageSvg}
                alt='package icon'
                className='user-nav-icon'
              />
              Orders
            </Link>
          </li>
          <span className='line-break'></span>
          <li
            className={`${
              location.pathname === '/settings/admin/add-product' && 'focus'
            }`}
          >
            <Link
              to='add-product'
              className='user-nav-item'
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              Add Products
            </Link>
          </li>
          <li
            className={`${
              location.pathname === '/settings/admin/edit-product' && 'focus'
            }`}
          >
            <Link
              to='edit-product'
              className='user-nav-item'
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              Edit Products
            </Link>
          </li>
        </UserNav>
      </div>
    );
  }

  return (
    <div className='res-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <img src={arrowLeftSvg} alt='navigate back arrow' />
        </Link>
      </header>
      <div className='res-img-wrapper'>
        <img src={restrictImg} alt='restricted page' className='res-img' />
      </div>
    </div>
  );
};
export default SettingsPage;
