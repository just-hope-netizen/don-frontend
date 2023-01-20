import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductByCategory } from '../../../helpers/api-calls';
import { setProduct } from '../../../redux/slices/product-slice';
import ProductsList from '../products/products-list';

const Category3 = () => {
  const { products } = useSelector((store) => store.product);
  const { drink } = products;
  const dispatch = useDispatch();

  useEffect(() => {
    // for caching
    if (drink !== null) {
      return;
    } else {
      getProductByCategory('drink').then((res) => {
        if (res.data.length > 0) {
          dispatch(setProduct(res.data));
        } else if (res.status !== 200) {
          toast.error('Something went wrong, we are working on it.');
        } else {
          toast.info('No current inventory, try the next section.');
        }
      });
    }
  }, [dispatch, drink]);

  return (
    <div>
      <ProductsList products={drink} />
    </div>
  );
};
export default Category3;
