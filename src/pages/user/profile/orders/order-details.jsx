import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteOrder } from '../../../../helpers/api-calls';

const OrderDetails = (props) => {
  const [showProducts, setShowProducts] = useState(false);
 
  const navigate = useNavigate();

  const { _id, config } = useSelector((store) => store.persistedReducer.user);

  return (
    <div>
      {props.orders.map((detail) => (
        <div key={detail._id} className='orders-details'>
          <div className='orderId-container'>
            <div>
              <h4 className='order-text'>Order Id</h4> <h4>{detail._id}</h4>
            </div>
            <button
              className='order-btn'
              type='button'
              onClick={() => {
                setShowProducts(!showProducts);
              }}
            >
              {showProducts ? 'Close Ordered Products' : 'See Ordered Products'}
            </button>

            <ul>
              <span className={showProducts ? 'line-break' : null}></span>
              {showProducts &&
                props.orders.map((i) =>
                  i.products.map((product) => (
                    <li key={product._id} className='cart-item'>
                      <img
                        src={product.productId.image.url}
                        alt={product.productId.title}
                      />
                      <div>
                        <div>
                          <h4 className='item-title'>
                            {' '}
                            {product.productId.title}
                          </h4>{' '}
                          <span className='cart-multiplier'>x</span>{' '}
                          <h4>{product.quantity}</h4>
                        </div>
                        <div className='cart-price-wrapper'>
                          ${product.productId.price}
                        </div>
                      </div>
                    </li>
                  ))
                )}
            </ul>

            <div className='delete-acc-container'>
              <button
                onClick={() => {
                  deleteOrder(detail._id, _id, config).then((res) => {
                    if (res.status === 200) {
                      toast.info('Order deleted.');
                      navigate('/');
                    } else {
                      toast.error(
                        'Something went wrong, we are working on it.'
                      );
                    }
                  });
                }}
              >
                Cancel Order
              </button>
            </div>
          </div>
          <div>
            <h4 className='order-text'>Items</h4>
            <h4>{detail.products.length}</h4>
          </div>
          <div>
            <h4 className='order-text'>Placed on</h4>
            <h4>{detail.date}</h4>
          </div>
          <div>
            <h4 className='order-text'>Total</h4>
            <h4>$ {detail.amount}</h4>
          </div>
          <span className='line-break'></span>
        </div>
      ))}

    </div>
  );
};

export default OrderDetails;
