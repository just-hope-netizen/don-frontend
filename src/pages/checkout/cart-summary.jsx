import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertBuffer } from '../../helpers/functions';

const CartSummary = () => {
    const { cart, subTotal, deliveryFee, totalAmount } = useSelector(
      (store) => store.persistedReducer.cart
    );
   

    return (
      <article className='cart-summary-container'>
        <div className='cart-container'>
          <header>
            <h3 className='heading'>CART SUMMARY</h3>
          </header>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className='cart-item'>
                <img
                  src={`data:${item.image.contentType};base64,${convertBuffer(
                    item.image.data.data
                  )}`}
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
            <Link to='/' className='modify-btn btn'>
              {' '}
              MODIFY CART
            </Link>
          </div>
        </div>
      </article>
    );
}

export default CartSummary;