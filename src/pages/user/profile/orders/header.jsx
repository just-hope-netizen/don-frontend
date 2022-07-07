import { Link } from 'react-router-dom';
import arrowLeftSvg from '../../../../assets/svg/arrowleft.svg';
const OrderHeader = () => {
    return ( 
    <header>
        <Link to='/' className='mobile-navigator hide'>
          <img src={arrowLeftSvg} alt=' navigate back arrow' />
        </Link>
        <h2 className='heading'>Order Details</h2>
      </header>
       );
}

export default OrderHeader;