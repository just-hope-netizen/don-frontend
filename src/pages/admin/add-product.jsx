import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import arrowLeftSvg from '../../assets/svg/arrowleft.svg';
import { createProduct } from '../../helpers/api-calls';

const AddProduct = () => {
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();

  const { config } = useSelector((store) => store.persistedReducer.user);
  const navigate = useNavigate();
  const inputFile = useRef();

  //handle image and convert
  function handleimage(e) {
    const file = e.target.files[0];
    setBase64(file);
  }
  function setBase64(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function submitForm(e) {
    e.preventDefault();
    if (!price) {
      toast.info('Set product price');
    } else if (!title) {
      toast.info('Set product title');
    } else if (category === 'Please select ...') {
      toast.info('Choose a category');
    } else if (image === undefined) {
      toast.info('Select an image.');
    } else {
      createProduct({ image, price, title, category }, config).then((res) => {
        if (res.status === 201) {
          setImage();
          setPrice();
          setTitle();
          setCategory();
          toast.success(
            'Product created successfully, refresh to see the changes.'
          );
          navigate('/');
        } else {
          toast.error('Something went wrong, we are working on it.');
        }
      });
    }
  }

  return (
    <div className='add-product-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <img src={arrowLeftSvg} alt=' navigate back arrow' />
        </Link>
        <h2 className='heading'>Add product</h2>
      </header>
      <span className='line-break'></span>
      <form className='add-product-form '>
        <label htmlFor='image' className='form-label'>
          Product Image
        </label>
        <div className='file-container'>
          {image ? (
            <img src={image} alt='product preview' className='file-input-img'  onClick={(e) => {
                e.preventDefault()
                inputFile.current.click();
              }} />
          ) : (
          
            <button className='img-placeholder'
              onClick={(e) => {
                e.preventDefault()
                inputFile.current.click();
              }}>
             CLICK TO ADD IMAGE

            </button>
          )}

          <input
          className='hidden'
            type='file'
            alt='Product image'
            ref={inputFile}
            accept='image/*'
            onChange={handleimage}
          />
        </div>
        <label htmlFor='title' className='form-label'>
          Product Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor='price' className='form-label'>
          Product Price
        </label>
        <input
          type='number'
          name='price'
          id='price'
          step='.01'
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <div className='dropdown-container'>
          <label htmlFor='categories' className='form-label'>
            Product Category
          </label>
          <select
            id='customer-country'
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value={null}>Please select ...</option>
            <option value='pizza'>Pizza</option>
            <option value='empanda'>Empanda</option>
            <option value='drink'>Drink</option>
            <option value='dessert'>Dessert</option>
          </select>
        </div>
        <button className='form-btn btn' onClick={submitForm}>
          Create Product
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
