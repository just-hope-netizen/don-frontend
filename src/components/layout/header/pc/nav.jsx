import { Link } from 'react-router-dom';
import homeSvg from '../../../../assets/svg/home.svg';
import settingsSvg from '../../../../assets/svg/settings.svg';
import userSvg from '../../../../assets/svg/user.svg';


 const Nav = (props) => {

    return (
      <nav className={props.className ? props.className :'pc-nav'}>
        <ul>
          <li className='nav-item'>
            <Link to='/' className='slide'>
              <img src={homeSvg} alt='home icon' className='nav--img' />
              <span className={props.className}> Home</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='user/account-details' className='slide'>
              <img src={userSvg} alt='user icon' className='nav--img' />
              <span className={props.className}> Signin/Register</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='settings/admin/account-details' className='slide'>
              <img src={settingsSvg} alt='settings icon' className='nav--img' />
              <span className={props.className}> Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
};
export default Nav;
