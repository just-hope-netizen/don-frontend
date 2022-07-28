import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../helpers/api-calls';
import OrderHeader from '../user/profile/orders/header';
import OrderDetails from '../user/profile/orders/order-details';

const OrderedProducts = () => {
  const [orders, setOrders] = useState([]);
  const [isOrder, setIsOrder] = useState();
  const [loading, setLoading] = useState(true);

  const { _id, config } = useSelector((store) => store.persistedReducer.user);

  useEffect(() => {
    //get orders, store details
    getOrders(config).then((res) => {
      // if no order return
      const length = Object.keys(res.data).length;
      if (length <= 0) {
        setIsOrder(false);
        setLoading(false);
      } else {
        setIsOrder(true);
        setOrders(res.data);
        setLoading(false);
      }
    });
  }, [_id, config]);

  return (
    <article className='orders-container'>
      <OrderHeader />
      <span className='line-break'></span>
      {loading ? (
        <div className='loader' />
      ) : isOrder ? (
        <OrderDetails orders={orders} />
      ) : (
        <h3 className='no-order'>No order currently.</h3>
      )}
    </article>
  );
};

export default OrderedProducts;
