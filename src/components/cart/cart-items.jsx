import { useDispatch, useSelector } from 'react-redux';
import x from '../../assets/svg/x.svg';
import decreaseBtn from '../../assets/svg/decrease-item.svg';
import {
  calculateTotals,
  decreaseItem,
  removeItem,
} from '../../redux/slices/cart-slice';

const CartItems = (props) => {
  const { cart } = useSelector((store) => store.persistedReducer.cart);
  const dispatch = useDispatch();

  // find product with ID and get quantity
  const item = cart.find((item) => item._id === props._id);
  const itemQuantity = item.itemQuantity;
  
  return (
    <li className='card'>
      <img src={props.image} alt={props.title} className='card-img' />
      <div className='card-content-wrapper'>
        <div className='card-details'>
          <div>
            <h4 className='card-text'>{props.title}</h4>
            <h4 className='card-price'>$ {props.price}</h4>
          </div>
          <div>
            <button
              onClick={() => {
                dispatch(removeItem(props._id));
                dispatch(calculateTotals());
              }}
            >
              <img src={x} alt='remove item' />
            </button>
          </div>
        </div>
        <div className='card-quantity-wrapper'>
          <span className='card-quantity '>{itemQuantity}</span>
          <button
            onClick={() => {
              dispatch(decreaseItem(props._id));
              dispatch(calculateTotals());
            }}
          >
            <img src={decreaseBtn} alt='decrease item' />
          </button>
        </div>
      </div>
    </li>
  );
};
export default CartItems;
