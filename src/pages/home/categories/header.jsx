import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [categoryText, setCategoryText] = useState();
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            setCategoryText('Choose from our delicious pizzas.');
        }else if (location.pathname === '/category2') {
            setCategoryText('Taste our delicious empandas.')
        }else if (location.pathname === '/category3') {
            setCategoryText('Top your meal with our refreshing drinks.')
        }else{
            setCategoryText('Finish your meal with the best desserts ')
        }
    }, [location, categoryText]);
    return (
      <div className='categories-heading'>
        <h2> Categories</h2>
        <h4>{categoryText}</h4>
      </div>
    );
}

export default Header;