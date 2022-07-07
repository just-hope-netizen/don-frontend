import  { useEffect, useState } from 'react';
import  ProductsList  from '../products/products-list';
import { getProductByCategory } from '../../../helpers/api-calls';
import { toast } from 'react-toastify';

const Category1 = () => {
  const [getProducts, setloadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductByCategory('pizza')
      .then((res) => {
        if(res.status === 200){
          setloadedProducts(res.data);
          setIsLoading(false);
        }else{

          toast.error('Something went wrong, we are working on it.');
        }

      })
      .catch((err) => console.log(err));
  }, []);

  
  
    return (
      <div>
        {isLoading ? <div className='loader'/>:  <ProductsList products={getProducts} />}
      </div>
    );
};

export default Category1;
