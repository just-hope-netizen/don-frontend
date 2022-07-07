import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartFooter = () => {
  const { totalItemsInCart, subTotal } = useSelector(
    (store) => store.persistedReducer.cart
  );

  const { _id } = useSelector((store) => store.persistedReducer.user);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  function cartHandler() {
    //check if cart has item
    if (totalItemsInCart <= 0 && toast.info('Cart is empty')) return;

    //check if user is login
    if (
      _id === null &&
      toast.info('Unable to checkout because user is not login')
    )
      return;

    navigate('/checkout');
  }

 

  return (
    <footer className='cart-footer'>
      <div className='total-amount-parent'>
        <h4>Subtotal</h4>
        <span>$ {subTotal}</span>
      </div>
      {/* dispaly msg when item greater than 0 */}
     {totalItemsInCart ? <h6>Delivery fee not included yet.</h6> : null }
      <button className='checkout-btn' onClick={cartHandler}>
        CHECKOUT 
      </button>
    </footer>
  );
};

export default CartFooter;
