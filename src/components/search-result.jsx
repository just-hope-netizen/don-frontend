import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import arrowLeftSvg from '../assets/svg/arrowleft.svg';
import { searchProduct } from '../helpers/api-calls';
import ProductsList from '../pages/home/products/products-list';
import { setIsLoading } from '../redux/slices/product-slice';

const SearchResult = (props) => {
  const { query, isLoading } = useSelector((store) => store.product);
  const [isProduct, setIsProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  //search base on query
  useEffect(() => {
    const searchKey = query.toLowerCase();
    searchProduct(searchKey).then((res) => {
      if (res.data.length > 0) {
        setProducts(res.data);
        setIsProduct(true);
      } else {
        setIsProduct(false);
      }
      //reset isLoading
      dispatch(setIsLoading());
    });
  }, [query, dispatch, products]);

  if (isLoading) {
    return <div className='loader' />;
  }

  return (
    <>
      <button onClick={props.onClick} className='back-btn'>
        <img src={arrowLeftSvg} alt=' navigate back arrow' />
        Go back
      </button>
      {isProduct ? (
        <ProductsList products={products} />
      
      ) : (
        <h3 className='search-criteria'>
          There are no items matching your search criteria: <span>{query}</span>
        </h3>
      )}
    </>
  );
};
export default SearchResult;
