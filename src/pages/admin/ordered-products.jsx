import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../helpers/api-calls';
import OrderHeader from '../user/profile/orders/header';
import OrderDetails from '../user/profile/orders/order-details';

const OrderedProducts = () => {
  const [orders, setOrders] = useState([]);
  const { _id, config } = useSelector((store) => store.persistedReducer.user);

  useEffect(() => {
    //get orders, store details
    getOrders(config).then((res) => {
      // if no order return
      console.log(res);
      const length = Object.keys(res.data).length;
      if (length <= 0) return;
      setOrders(res.data);
    });
  }, [_id, config]);

  return (
    <article className='orders-container'>
      <OrderHeader />
      <span className='line-break'></span>
      <OrderDetails orders={orders} />
    </article>
  );
};

export default OrderedProducts;
