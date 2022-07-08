import { useEffect, useState } from 'react';
import ProductsList from '../products/products-list';
import { getProductByCategory } from '../../../helpers/api-calls';
import { toast } from 'react-toastify';
import ProductItem from '../products/product-item';
import { convertBuffer } from '../../../helpers/functions';
import { addToCart, calculateTotals } from '../../../redux/slices/cart-slice';
import addBtn from '../../../assets/svg/add-btn.svg';

import { useDispatch } from 'react-redux';

const Category1 = () => {
  const [getProducts, setloadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getProductByCategory('pizza')
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setloadedProducts(res.data);
          setIsLoading(false);
        } else {
          toast.error('Something went wrong, we are working on it.');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className='loader' />
      ) : (
        //  <ProductsList products={getProducts} />
        <ul className='card-parent'>
          {getProducts.map((product) => (
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category1;
