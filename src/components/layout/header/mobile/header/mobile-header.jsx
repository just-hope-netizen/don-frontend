import { useState } from 'react';

import SearchForm from '../../../../../pages/home/search-form';
import arrowrightSvg from '../../../../../assets/svg/arrowright.svg';
import menuSvg from '../../../../../assets/svg/menu.svg';
import searchSvg from '../../../../../assets/svg/search.svg';
import MobileMenu from './mobile-menu';

const MobileHeader = (props) => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [openMenu, setMenuIsOpen] = useState(false);

 
    
  function menuHandler() {
    setMenuIsOpen(!openMenu);
  }


  return (
    <>
      <div className={props.className}>
        <div className='mobile-menu-container'>
          <MobileMenu
            className={openMenu ? 'mobile-menu slide' : 'mobile-menu'}
            onClick={menuHandler}
            menu={openMenu}
          />
          <div
            className={
              openMenu ? 'menu-btn-container slide' : 'menu-btn-container'
            }
          >
            <button
              onClick={menuHandler}
              className={openMenu ? 'btn--rotate' : ''}
            >
              <img
                src={menuSvg}
                alt='icon to toggle menu'
                className='mobile-img'
              />
            </button>
          </div>
        </div>

        <div className='mobile-search-container'>
          <button
            type='button'
            onClick={() => {
              setFormIsOpen(!formIsOpen);
            }}
          >
            {formIsOpen ? (
              <img src={arrowrightSvg} alt='close search form arrow'  className='close-search-arrow'/>
            ) : (
              <img src={searchSvg} alt='magnifying glass' />
            )}
          </button>{' '}
          <SearchForm
            onClick={props.onClick}
            className={formIsOpen ? 'form-wrapper show' : 'form-wrapper'}
          />
        </div>
      </div>
    </>
  );
};
export default MobileHeader;
