import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cart-slice';
import { createOrder } from '../../helpers/api-calls';
import Paypal from './payment-method/paypal';

const PaymentMethod = (props) => {
  const [selectedMethod, setSelectedMethod] = useState('cash on delivery');
  const [openPaypal, setOpenPaypal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paypalMark = useRef();

  const { config, _id, address } = useSelector(
    (store) => store.persistedReducer.user
  );
  const { cart, totalAmount } = useSelector(
    (store) => store.persistedReducer.cart
  );

  useEffect(() => {
    window.paypal.Marks().render(paypalMark.current);
  }, []);

  function createOrderHandler(e) {
    e.preventDefault();

    //select product id and quantity
    const products = [];
    cart.forEach((product) => {
      const productId = product._id;
      const quantity = product.itemQuantity;
      const idAndQuantity = { productId, quantity };
      products.push(idAndQuantity);
    });

    const data = {
      userId: _id,
      products: products,
      amount: totalAmount,
      address: address,
    };
    //use data to create order
    createOrder(data, config);
    //indicate
    props.done(true);
    // if cash method is selected navigate to ondelivery page and clear cart
    //else to paypalwindow
    if (selectedMethod === 'cash on delivery') {
      navigate('/order-confirmation');
      dispatch(clearCart());
      return;
    }
    setOpenPaypal(true);
  }

  return (
    <div>
      <form className='payment-form'>
        <div className={openPaypal ? 'hidden' :'radio-container'}>

          <label htmlFor='cash'>
            Cash on delivery
            <input
              type='radio'
              name='payment'
              id='cash'
              defaultChecked
              onChange={() => {
                setSelectedMethod('cash on delivery');
              }}
            />
            <span className='checkmark'></span>
          </label>
        </div>

        <div className={openPaypal ? 'hidden' :'radio-container'}>
          <label htmlFor='paypal'>
            <div ref={paypalMark}></div>
            <input
              type='radio'
              name='payment'
              id='paypal'
              onChange={() => {
                setSelectedMethod('paypal');
              }}
            />
            <span className='checkmark paypal'></span>
          </label>
        </div>
        {openPaypal ? (
          <Paypal />
        ) : (
          <button className='proceed-btn btn' onClick={createOrderHandler}>
            CONFIRM ORDER
          </button>
        )}
      </form>
    </div>
  );
};

export default PaymentMethod;
