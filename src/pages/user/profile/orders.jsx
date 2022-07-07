
import OrderHeader from './orders/header';
import OrderDetails from './orders/order-details';


const Orders = (props) => {
  
  
  
  return (
    <article className='orders-container'>
      <OrderHeader />
      <span className='line-break'></span>
      <OrderDetails />
    </article>
  );
};

export default Orders;
