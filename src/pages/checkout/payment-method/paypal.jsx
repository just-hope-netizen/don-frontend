import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart } from '../../../redux/slices/cart-slice';
import { getOrder } from '../../../helpers/api-calls';

const Paypal = (props) => {
  const { _id, config } = useSelector((store) => store.persistedReducer.user);
  const [loading, setLoading] = useState(true);

  const paypal = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getOrder(_id, config).then((res) => {
      //get order amount
      const amount = res.data.amount;

      window.paypal
        .Buttons({
          createOrder: function (data, actions) {
            // Set up the transaction
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            // This function captures the funds from the transaction.
            return actions.order.capture().then(function (details) {
              // This function shows a transaction success message to your buyer.
              toast.success(
                'Transaction completed by ' + details.payer.name.given_name
              );
              //clear cart
              dispatch(clearCart());
              navigate('/');
            });
          },
          onCancel: function (data) {
            // Show a cancel page, or return to cart
            toast.info('Order was cancelled.');
            navigate('/');
          },
          onError: function (err) {
            // For example, redirect to a specific error page
            toast.error('Order was not successfully placed.');
            navigate('/');
          },
        })
        .render(paypal.current);
    });
    setLoading(false);
  }, [_id, config, navigate, dispatch]);

  return (
    <>
      {loading ? (
        <div className='loader' />
      ) : (
        <div>
          <article className='gen-details-container'>
            <h3>Please use this generate card details.</h3>
            <p>
              Card Type: <strong>Visa Card</strong>, Number:
              <strong> 4032034903132804</strong>, Expiration Date:
              <strong>04/2027</strong>, CVV: <strong>811</strong>
            </p>
          </article>
          <article className='gen-details-container'>
            <h3>Using Paypal window</h3>
            <p>
              Email ID: <strong>sb-247lzi17171481@personal.example.com,</strong>
              Password: <strong>B.0KypcE</strong>
            </p>
          </article>
          <div ref={paypal}></div>
        </div>
      )}
    </>
  );
};
export default Paypal;
