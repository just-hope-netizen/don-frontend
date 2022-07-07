import { Link } from 'react-router-dom';
import arrowLeftSvg from '../../assets/svg/arrowleft.svg';


const CartHeader = () => {
 

  return (
    <header className='cart-header'>
      <Link to='/' className='mobile-navigator hide'>
        <img src={arrowLeftSvg} alt=' navigate to homepage' />
      </Link>
      <h2>My Order</h2>
     
    </header>
  );
};
export default CartHeader;
