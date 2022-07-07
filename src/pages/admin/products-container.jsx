import { Link } from 'react-router-dom';
import arrowLeftSvg from '../../assets/svg/arrowleft.svg';

const ProductsContainer = (props) => {
  return (
    <div className='products-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <img src={arrowLeftSvg} alt=' navigate back arrow' />
        </Link>
        <h2 className='heading'> Products</h2>
      </header>
      <span className='line-break'></span>
      <div className='products-main'>
        <div className='product-form-wrapper'>{props.children}</div>
      </div>
    </div>
  );
};

export default ProductsContainer;
