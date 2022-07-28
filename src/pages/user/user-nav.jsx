import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import inboxSvg from '../../assets/svg/inbox.svg';
import outlineUserSvg from '../../assets/svg/outline-user.svg';
import packageSvg from '../../assets/svg/package.svg';
import { removeUser } from '../../redux/slices/user-slice';

const UserNav = (props) => {

  const { isAdmin} = useSelector(
    (store) => store.persistedReducer.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  
  return (
    <>
      <nav className={props.className}>
        <ul>
          <li
            className={`${
              (location.pathname === '/user/account-details' ||
                location.pathname === '/settings/admin/account-details') &&
              'focus'
            }`}
          >
            <Link
              to='account-details'
              className='user-nav-item mobile'
              onClick={props.onClick}
            >
              <img
                src={outlineUserSvg}
                alt='user icon'
                className='user-nav-icon'
              />
              My Don-Remolo Account
            </Link>
          </li>
          <li>
            <Link
              to='/development'
              className='user-nav-item mobile'
              onClick={props.onClick}
            >
              <img src={inboxSvg} alt='inbox icon' className='user-nav-icon' />
              Inbox
            </Link>
          </li>
          {/* remove route if user is admin  */}
          {isAdmin ? null : (
            <li
              className={`${location.pathname === '/user/orders' && 'focus'}`}
            >
              <Link
                to='orders'
                className='user-nav-item mobile '
                onClick={props.onClick}
              >
                <img
                  src={packageSvg}
                  alt='package icon'
                  className='user-nav-icon'
                />
                Orders
              </Link>
            </li>
          )}
          {/* remove className when in admin page */}
          <span className={props.children ? null : 'line-break'}></span>

          {props.children}
          <li
            className={`${
              (location.pathname === '/user/details' ||
                location.pathname === '/settings/admin/details') &&
              'focus'
            }`}
          >
            <Link
              to='details'
              className='user-nav-item'
              onClick={props.onClick}
            >
              Details
            </Link>
          </li>
          <li
            className={`${
              (location.pathname === '/user/change-password' ||
                location.pathname === '/settings/admin/change-password') &&
              'focus'
            }`}
          >
            <Link
              to='change-password'
              className='user-nav-item'
              onClick={props.onClick}
            >
              Change Password
            </Link>
          </li>
        </ul>
        <h2>
          <button
            className='user-nav-btn'
            onClick={() => {
              dispatch(removeUser());
              navigate('/');
            }}
          >
            LOGOUT
          </button>
        </h2>
      </nav>
      <Outlet />
    </>
  );
};

export default UserNav;
