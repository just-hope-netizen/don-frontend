import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DeliveryDetails = (props) => {
  const { cart, totalAmount, totalItemsInCart, subTotal, deliveryFee } =
    useSelector((store) => store.persistedReducer.cart);

  return (
    <div>
      <h4>Delivery of {totalItemsInCart} product</h4>
      <ul>
        {cart.map((item) => (
          <li key={item._id} className='cart-item'>
            <img
              src={item.image.url}
              alt={item.title}
            />
            <div>
              <div>
                <h4 className='item-title'> {item.title}</h4>{' '}
                <span className='cart-multiplier'>x</span>{' '}
                <h4>{item.itemQuantity}</h4>
              </div>
              <div className='cart-price-wrapper'>${item.price}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className='list-total-container'>
        <div>
          <h4>Subtotal</h4> <span>$ {subTotal}</span>
        </div>
        <div>
          <h4>Delivery fee</h4> <span>$ {deliveryFee}</span>
        </div>
        <div>
          <h4 className='total-text'>Total</h4> <span>$ {totalAmount} </span>
        </div>
      </div>

<footer className='delivery-footer'>

      <button
        type='button'
        className='proceed-btn btn'
        onClick={() => {
          props.close(false);
          props.open(true);
          props.done(true);
        }}
      >
        {' '}
        PROCEED TO NEXT STEP
      </button>
      <Link to='/cart' className='modify-btn '>
        {' '}
        MODIFY CART
      </Link>
        </footer>
    </div>
  );
};

export default DeliveryDetails;
