import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct, updateProduct } from '../../helpers/api-calls';
import arrowLeftSvg from '../../assets/svg/arrowleft.svg';

const AddProduct = (props) => {
  const [fileImage, setFileImage] = useState();
  const [preview, setPreview] = useState();
  
  const { config } = useSelector((store) => store.persistedReducer.user);
  const navigate = useNavigate();

  const image = useRef();
  const price = useRef();
  const title = useRef();
  const categories = useRef();

  function getInfo(e) {
    e.preventDefault();
    const inputPrice = price.current.value;
    const inputTitle = title.current.value;
    const inputCategories = categories.current.value;

    
    if (!inputPrice) {
      toast.info('Set product price');
    } else if (!inputTitle) {
      toast.info('Set product title');
    } else if (inputCategories === 'Please select ...') {
      toast.info('Choose a category');
    }else if(fileImage === undefined){
      toast.info('Select an image.');
    } else {
      //create formdata type because of image file
      const formData = new FormData();
      formData.append('image', fileImage, fileImage.name);
      formData.append('price', inputPrice);
      formData.append('title', inputTitle);
      formData.append('categories', inputCategories);

      //update or create product
      if (props.id) {
        updateProduct(props.id, formData, config).then(res =>{
          
          if (res.status === 200) {
            toast.success('Product Updated.')
            navigate('/');
          } else {
            toast.error('Something went wrong, we are working on it.');
          }
        })
      } else {
        createProduct(formData, config).then((res) => {
          if (res.status === 201) {
            toast.success('Product created successfully.');
            navigate('/');
          } else {
            toast.error('Something went wrong, we are working on it.');
          }
        });
      }
    }
  }

  useEffect(() => {
    if (fileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(fileImage);
    } else {
      setPreview(null);
    }
  }, [fileImage]);

  return (
    <div className='add-product-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <img src={arrowLeftSvg} alt=' navigate back arrow' />
        </Link>
        <h2 className='heading'>
          {props.id ? 'Update product' : 'Add product'}
        </h2>
      </header>
      <span className='line-break'></span>
      <form className='add-product-form '>
        <label htmlFor='image' className='form-label'>
          {props.id && 'Change'} Product Image
        </label>
        <div className='file-container'>
          {props.image && (
            <div className='switch-wrapper'>
              <img
                src={props.image}
                alt='product preview'
                className='file-input-img'
              />
              <div>

              <span className='icon switch'></span>
              </div>
            </div>
          )}
          {preview ? (
            <img
              src={preview}
              alt='product preview'
              className={
                props.image ? 'file-input-img props' : 'file-input-img'
              }
              onClick={() => {
                setFileImage(null);
              }}
            />
          ) : (
            <button
              className={
                props.image ? 'file-input-btn props' : 'file-input-btn'
              }
              onClick={(e) => {
                e.preventDefault();
                image.current.click();
              }}
            >
              Add Image
            </button>
          )}

          <input
            className='file-input'
            type='file'
            alt='Product image'
            accept='image/*'
            ref={image}
            onChange={(e) => {
              setFileImage(e.target.files[0]);
            }}
          />
        </div>
        <label htmlFor='title' className='form-label'>
          {props.id && 'Change'} Product Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          ref={title}
          defaultValue={props.title}
        />
        <label htmlFor='price' className='form-label'>
          {props.id && 'Change'} Product Price
        </label>
        <input
          type='number'
          name='price'
          id='price'
          step='.01'
          ref={price}
          defaultValue={props.price}
        />
        <div className='dropdown-container'>
          <label htmlFor='categories' className='form-label'>
            {props.id && 'Change'} Product Category
          </label>
          <select
            id='customer-country'
            ref={categories}
            defaultValue={props.category}
          >
            <option value={null}>Please select ...</option>
            <option value='pizza'>Pizza</option>
            <option value='empanda'>Empanda</option>
            <option value='drink'>Drink</option>
            <option value='dessert'>Dessert</option>
          </select>
        </div>
        <button className='form-btn btn' onClick={getInfo}>
          {props.id ? 'Update' : 'Create'} Product
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
