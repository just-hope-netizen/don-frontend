import { useDispatch, useSelector } from 'react-redux';

import '../css/cart.css';
import { convertBuffer } from '../helpers/functions';
import { calculateTotals, clearCart } from '../redux/slices/cart-slice';
import deleteCart from '../assets/svg/delete-cart.svg';
import CartFooter from './cart/cart-footer';
import CartHeader from './cart/cart-header';
import CartItems from './cart/cart-items';



const CartSection = (props) => {
  const { cart, totalItemsInCart } = useSelector(
    (store) => store.persistedReducer.cart
  );
  

   const dispatch = useDispatch();

   function deleteCartHandler() {
     dispatch(clearCart());
     dispatch(calculateTotals());
   }
  return (
    <aside className={props.className}>
      <CartHeader />
      <div className='delete-btn-parent'>
        <h4>Order list</h4>
        <button onClick={deleteCartHandler}>
          <img src={deleteCart} alt='bin, to clear cart' />
        </button>
      </div>
      <div>
        <h4>{totalItemsInCart} items</h4>
      </div>

      <section className='cart-content-container'>
        {/* render empty cart message  if items is 0 */}
        {totalItemsInCart ? (
          <ul>
            {cart.map((item) => (
              <CartItems
                key={item._id}
                _id={item._id}
                image={`data:${item.image.contentType};base64,${convertBuffer(
                  item.image.data.data
                )}`}
                title={item.title}
                price={item.price}
              />
            ))}
          </ul>
        ) : (
          <div className='empty-cart-container'>
            <h3>YOUR CART IS CURRENTLY EMPTY</h3>
          </div>
        )}
      </section>
      <CartFooter />
    </aside>
  );
};
export default CartSection;
