import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductByCategory } from '../../../helpers/api-calls';
import { setProduct } from '../../../redux/slices/product-slice';
import ProductsList from '../products/products-list';

 const Category2 = () => {
    const { products } = useSelector((store) => store.product);
    const { empanda } = products;
    const dispatch = useDispatch();

    useEffect(() => {
      // for caching
      if (empanda.length > 0) {
        return;
      } else {
        getProductByCategory('empanda').then((res) => {
          if (res.data.length > 0) {
            dispatch(setProduct(res.data));
          } else if (res.status !== 200) {
            toast.error('Something went wrong, we are working on it.');
          } else {
            toast.info('No current inventory, try the next section.');
          }
        });
      }
    }, [dispatch, empanda]);
   

    return (
      <div>
          <ProductsList products={empanda} />
      </div>
    );
};
export default Category2;

