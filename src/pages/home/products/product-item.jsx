import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductItem = (props) => {
  const [priceClass, setPriceClass] = useState();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setPriceClass('category1-price');
    } else if (location.pathname === '/category2') {
      setPriceClass('category2-price');
    } else if (location.pathname === '/category3') {
      setPriceClass('category3-price');
    } else if (location.pathname === '/category4') {
      setPriceClass('category4-price');
    }else{
      setPriceClass('card-price')
    }
  }, [location, priceClass]);
  
  return (
    <li className={`card-item mobile ${props.className}`} id='card'>
      <div className={`card product-wrapper`}>
        <img src={props.image} alt={props.title} />
        <div className='product-details'>
          <h4>{props.title}</h4>
          <h4 className={priceClass}>$ {props.price}</h4>
          {props.children}
        </div>
      </div>
    </li>
  );
};
export default ProductItem;
