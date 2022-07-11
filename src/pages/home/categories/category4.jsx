import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getProductByCategory } from '../../../helpers/api-calls';
import ProductsList from '../products/products-list';

const Category4 = () => {
   const [getProducts, setloadedProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     getProductByCategory('dessert')
       .then((res) => {
         if (res.data.length > 0) {
           setloadedProducts(res.data);
           setIsLoading(false);
         } else if (res.status !== 200) {
           toast.error('Something went wrong, we are working on it.');
         } else {
           toast.info('No current inventory, try the next section.');
         }
       })
       .catch((err) => toast.error(err));
   }, []);

   return (
     <div>
       {isLoading ? (
         <div className='loader' />
       ) : (
         <ProductsList products={getProducts} />
       )}
     </div>
   );
};
export default Category4;
