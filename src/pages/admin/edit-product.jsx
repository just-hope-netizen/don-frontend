import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  deleteProduct,
  findProduct,
  getProducts
} from '../../helpers/api-calls';
import ProductItem from '../home/products/product-item';
import EditAndDeleteBtn from './edit&delete-btn';
import ProductsContainer from './products-container';
import UpdateProduct from './update-product';

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  const [productEdit, setProductEdit] = useState([]);

  const { config } = useSelector((store) => store.persistedReducer.user);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  }, []);

  function deleteHandler(id) {
    // delete product by it Id, if respond is false notify admin,
    // else navigate and notify that it was successful
    deleteProduct(id, config).then((res) => {
      if (
        res.data !== 'Product has been deleted' &&
        toast.error('Internal server error, try again later.')
      )
        return;
      toast.info('Product has been deleted.');
      navigate('/');
    });
  }
  function editHandler(id) {
      findProduct(id).then((res) => {
        setProductEdit(res.data);
        setEditMode(!editMode);
      });
  }

  if (isLoading) {
    return <div className='loader' />;
  } else {
    return (
      <>
        {editMode ? (
          productEdit?.map((item) => (
            <UpdateProduct
              key={item._id}
              id={item._id}
              image={item.image.url}
              title={item.title}
              price={item.price}
              category={item.categories[0]}
            />
          ))
        ) : (
          <ProductsContainer>
            {' '}
            <ul className='card-parent'>
              {products?.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  image={item.image.url}
                  title={item.title}
                  price={item.price}
                  className='edit-card'
                >
                  <EditAndDeleteBtn
                    itemId={item._id}
                    delete={deleteHandler}
                    edit={editHandler}
                  />
                </ProductItem>
              ))}
            </ul>
          </ProductsContainer>
        )}
      </>
    );
  }
};
export default EditProduct;
