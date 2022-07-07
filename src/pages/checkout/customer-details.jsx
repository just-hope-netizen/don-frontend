import { useState } from 'react';
import DeliveryDetails from './delivery-details';
import DetailsContainer from './details-container';
import PaymentMethod from './payment-method';


const CustomerDetails = () => {
  const [openCustomerContainer, setOpenCustomerContainer] = useState(true);
  const [openDeliveryContainer, setOpenDeliveryContainer] = useState(false);
  const [openPaymentContainer, setOpenPaymentContainer] = useState(false);
  const [ isDoneWithDelivery, setIsDoneWithDelivery] = useState(false);
  const [ isDoneWithPayment, setIsDoneWithPayment] = useState(false);

 
 
  return (
    <div className='details-container'>
      <article className='customer-details-container'>
        <header>
          <h3 className='heading'> CUSTOMER DETAILS</h3>
          <span
            className={
              openCustomerContainer ? 'icon uncomplete' : 'icon complete'
            }
          ></span>
        </header>
        {openCustomerContainer && (
          <DetailsContainer
            close={setOpenCustomerContainer}
            open={setOpenDeliveryContainer}
            payment={setOpenPaymentContainer}
          />
        )}
      </article>

      <article className='delivery-container'>
        <header>
          <h3 className='heading'> DELIVERY INFO</h3>
          <span
            className={
              isDoneWithDelivery ? 'icon complete' : 'icon uncomplete'
            }
          ></span>
        </header>
        {openDeliveryContainer && (
          <DeliveryDetails
            close={setOpenDeliveryContainer}
            open={setOpenPaymentContainer}
            done={setIsDoneWithDelivery}
          />
        )}
      </article>

      <article className='payment-container'>
        <header>
          <h3 className='heading'> PAYMENT METHOD</h3>
          <span
            className={
              isDoneWithPayment ? 'icon complete' : 'icon uncomplete'
            }
          ></span>
        </header>

        {openPaymentContainer && <PaymentMethod done={setIsDoneWithPayment}/>}
      </article>
    </div>
  );
};

export default CustomerDetails;
