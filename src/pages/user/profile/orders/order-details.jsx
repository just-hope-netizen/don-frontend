import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteOrder, getOrder } from '../../../../helpers/api-calls';

const OrderDetails = (props) => {
  const [orders, setOrders] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { _id, config } = useSelector((store) => store.persistedReducer.user);

  useEffect(() => {
    //set orders if component imported in admin section
    if (props.orders) {
      setOrders(props.orders);
      setLoading(false);
      return;
    } else {
      //get orders, store details
      getOrder(_id, config).then((res) => {
        // if no order return
        const length = Object.keys(res.data).length;
        if (length <= 0) return;
        const details = [res.data];
        setOrders(details);
        setLoading(false);
      });
    }
  }, [_id, config, props.orders]);

  if (loading) {
    return <div className='loader' />;
  }

  return (
    <div>
      {orders.map((detail) => (
        <div key={detail._id} className='orders-details'>
          <div className='orderId-container'>
            <div>
              <h4 className='order-text'>Order Id</h4> <h4>{detail._id}</h4>
            </div>
            {props ? null : (
              <button
                className='order-btn'
                type='button'
                onClick={() => {
                  setShowProducts(!showProducts);
                }}
              >
                {showProducts
                  ? 'Close Ordered Products'
                  : 'See Ordered Products'}
              </button>
            )}
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
        </div>
      ))}

      <ul>
        <span className={showProducts ? 'line-break' : null}></span>
        {showProducts &&
          orders.map((i) =>
            i.products.map((product) => (
              <li key={product._id} className='cart-item'>
                <img
                  src={product.productId.image.url}
                  alt={product.productId.title}
                />
                <div>
                  <div>
                    <h4 className='item-title'> {product.productId.title}</h4>{' '}
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
    </div>
  );
};

export default OrderDetails;
