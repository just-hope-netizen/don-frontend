import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getProductByCategory } from '../../../helpers/api-calls';
import ProductsList from '../products/products-list';

const Category3 = () => {
   const [getProducts, setloadedProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     getProductByCategory('drink')
       .then((res) => {
         if (res.status === 200) {
           setloadedProducts(res.data);
           setIsLoading(false);
         } else {
           toast.error('Something went wrong, we are working on it.');
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
export default Category3;
