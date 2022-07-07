import { useEffect, useState } from 'react';
import CartSection from '../components/cart-section';
import Cart from '../components/layout/header/mobile/header/cart';
import MobileHeader from '../components/layout/header/mobile/header/mobile-header';
import SearchResult from '../components/search-result';
import '../css/home.css';
import Categories from './home/categories/categories';
import Header from './home/categories/header';
import SearchForm from './home/search-form';

const HomePage = () => {
  const [searchForProduct, setSearchForProduct] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the header
        setShow(false);
      } else {
        // if scroll up show the header
        setShow(true);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <>
      <MobileHeader
        className={`mobile-header ${show ? null : 'hidden'}`}
        onClick={() => {
          setSearchForProduct(true);
        }}
      />
      <Cart />
      <section className='main'>
        <div className='main-search-section'>
          <SearchForm
            onClick={() => {
              setSearchForProduct(true);
            }}
          />
        </div>
        {searchForProduct ? (
          <SearchResult
            onClick={() => {
              setSearchForProduct(false);
            }}
          />
           
        ) : (
          <div className='main-categories-section'>
            <Header />
            <Categories />
          </div>
        )}
      </section>
      <CartSection className='hide-cart-section' />
    </>
  );
};
export default HomePage;
