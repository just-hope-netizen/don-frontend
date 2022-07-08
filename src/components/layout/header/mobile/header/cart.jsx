import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cart from '../../../../../assets/svg/cart.svg';

const Cart = () => {
  const { totalItemsInCart } = useSelector(
    (store) => store.persistedReducer.cart
  );

  return (
    <>
      <div className='cart-btn-container'>
        <Link to='/cart' className='cart-btn'>
          <img src={cart} alt='cart' />
        </Link>
        <span className='cart-items'>{totalItemsInCart}</span>
      </div>
    </>
  );
};
export default Cart;
