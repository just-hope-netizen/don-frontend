import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../../../helpers/api-calls';
import OrderHeader from './orders/header';
import OrderDetails from './orders/order-details';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isOrder, setIsOrder] = useState();
  const [loading, setLoading] = useState(true);

  const { _id, config } = useSelector((store) => store.persistedReducer.user);

  useEffect(() => {
    getOrder(_id, config).then((res) => {
      // if no order return
      const length = Object.keys(res.data).length;
      if (length <= 0) {
        setIsOrder(false);
        setLoading(false);
      } else {
        const details = [res.data];
        setOrders(details);
        setIsOrder(true);
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

export default Orders;
