import { useState } from 'react';
import Nav from './nav';

import menuSvg from '../../../../assets/svg/menu.svg';
import Logo from '../../../logo';

const Menu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <>
      <div className='slide'>
        <div className={menuIsOpen ? 'content show' : 'content'}>
          <Logo />
        </div>
        <button
          className={menuIsOpen ? 'btn--rotate btn' : 'btn'}
          onClick={() => {
            setMenuIsOpen(!menuIsOpen);
          }}
        >
          <img src={menuSvg} alt='toggle menu button' />
        </button>
      </div>
      <Nav
        className={
          menuIsOpen ? 'content show pc-nav-span' : 'content pc-nav-span '
        }
      />
    
    </>
  );
};
export default Menu;
