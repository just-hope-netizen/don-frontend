import '../css/checkout.css';
import CartSummary from './checkout/cart-summary';
import CustomerDetails from './checkout/customer-details';


const Checkout = () => {
 
  return (
    <>
      <main className='checkout-container'>
        <header className='checkout-header'>
          <h2 className='heading'>Checkout</h2>
        </header>

        <section>
          <CustomerDetails />
          <CartSummary />
        </section>
      </main>
    </>
  );
};

export default Checkout;
