import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductByCategory } from '../../../helpers/api-calls';
import { setProduct } from '../../../redux/slices/product-slice';
import ProductsList from '../products/products-list';

const Category1 = () => {
  const { products } = useSelector((store) => store.product);
  const { pizza } = products;
  const dispatch = useDispatch();

  useEffect(() => {
    // for caching
    if (pizza !== null) {
      return;
    } else {
      getProductByCategory('pizza').then((res) => {
        if (res.data.length > 0) {
          dispatch(setProduct(res.data));
        } else if (res.status !== 200) {
          toast.error('Something went wrong, we are working on it.');
        } else {
          toast.info('No current inventory, try the next section.');
        }
      });
    }
  }, [dispatch, pizza]);

  return (
    <div>
      <ProductsList products={pizza} />
    </div>
  );
};

export default Category1;
