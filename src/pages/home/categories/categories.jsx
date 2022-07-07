import { Link, Outlet, useLocation } from 'react-router-dom';
import { DessertIcon, DrinkIcon, EmpandaIcon, PizzaIcon } from '../../../assets/svg';

const Categories = () => {
    const location = useLocation();

  return (
    <>
      <nav className='category-nav'>
        <ul className='category-nav-item-list'>
          <li
            className={`category1 ${
              location.pathname === '/' && 'category1-active'
            }`}
          >
            <Link
              to='/'
              className={`category-item-link ${
                location.pathname === '/' && 'category1 mobile'
              }`}
            >
              <PizzaIcon />
              <span>Pizzas</span>
            </Link>
          </li>

          <li
            className={`category2 ${
              location.pathname === '/category2' && 'category2-active'
            }`}
          >
            <Link
              to='category2'
              className={`category-item-link ${
                location.pathname === '/category2' && 'category2 mobile'
              }`}
            >
              <EmpandaIcon />
              <span>Empanadas</span>
            </Link>
          </li>
          <li
            className={`category3 ${
              location.pathname === '/category3' && 'category3-active'
            }`}
          >
            <Link
              to='category3'
              className={`category-item-link ${
                location.pathname === '/category3' && 'category3 mobile'
              }`}
            >
              <DrinkIcon />
              <span>Drink</span>
            </Link>
          </li>
          <li
            className={`category4 ${
              location.pathname === '/category4' && 'category4-active'
            }`}
          >
            <Link
              to='category4'
              className={`category-item-link ${
                location.pathname === '/category4' && 'category4 mobile'
              }`}
            >
              <DessertIcon />
              <span>Dessert</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Categories;
