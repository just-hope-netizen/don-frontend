import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { getOrder } from '../../../helpers/api-calls';

const OrderConfirmation = (props) => {
  const [OrderDetails, setOrderDetails] = useState([]);
  const { config, _id } = useSelector((store) => store.persistedReducer.user);

  // const navigate = useNavigate();

  useEffect(() => {
    getOrder(_id, config).then((res) => {
      console.log(res);
      const details = [res.data];
      setOrderDetails(details);
    });
  }, [_id, config]);

  return (
    <article className='confirmation-container'>
      <header>
      <span className='icon complete confirmation'></span>

      </header>
      <div>
        <h3>Thank you for placing an order on Don-Remolo!</h3>
        {OrderDetails.map((detail) => (
          <h4 key={detail._id}>Order Id {detail._id}</h4>
        ))}
      </div>
      
      <footer>
      <Link to='/user/orders' className='modify-btn btn'>
        SEE ORDER DETAILS
      </Link>
      </footer>
    </article>
  );
};

export default OrderConfirmation;
