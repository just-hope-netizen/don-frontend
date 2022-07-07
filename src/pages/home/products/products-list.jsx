import { useDispatch } from 'react-redux';
import { convertBuffer } from '../../../helpers/functions';
import { addToCart, calculateTotals } from '../../../redux/slices/cart-slice';
import addBtn from '../../../assets/svg/add-btn.svg';
import ProductItem from './product-item';

const ProductsList = (props) => {

const dispatch = useDispatch()

  return (
    <ul className={props.className ? props.className : 'card-parent'}>
      
      {props.products.map(product => 
          <ProductItem
            key={product._id}
            id={product._id}
            image={`data:${product.image.contentType};base64,${convertBuffer(
              product.image.data.data
            )}`}
            title={product.title}
            price={product.price}
          >
            <button
              className='add-to-cart-btn'
              onClick={() => {
                dispatch(addToCart(product));
                dispatch(calculateTotals());
              }}
            >
              <img src={addBtn} alt='add to cart' />
            </button>
          </ProductItem>
      )}
    </ul>
  );
};
export default ProductsList;
