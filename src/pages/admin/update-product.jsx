import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import arrowLeftSvg from '../../assets/svg/arrowleft.svg';
import { updateProduct } from '../../helpers/api-calls';

const UpdateProduct = (props) => {
  const [image, setImage] = useState(props.image);
  const [price, setPrice] = useState(props.price);
  const [title, setTitle] = useState(props.title);
  const [category, setCategory] = useState(props.category);

  const [showFormerImg, setFormerImg] = useState(true);
  const { config } = useSelector((store) => store.persistedReducer.user);
  const navigate = useNavigate();
  const inputFile = useRef();

  //handle image and convert
  function handleimage(e) {
    const file = e.target.files[0];
    setBase64(file);
    setFormerImg(false);
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
      updateProduct(props.id, { image, price, title, category }, config).then(
        (res) => {
          if (res.status === 200) {
            setImage();
            setPrice();
            setTitle();
            setCategory();
            toast.success('Product updated successfully, refresh to see the changes.');
            navigate('/');
          } else {
            toast.error('Something went wrong, we are working on it.');
          }
        }
      );
    }
  }

  return (
    <div className='add-product-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <img src={arrowLeftSvg} alt=' navigate back arrow' />
        </Link>
        <h2 className='heading'>Update product</h2>
      </header>
      <span className='line-break'></span>
      <form className='add-product-form '>
        <label htmlFor='image' className='form-label'>
          Change Image
        </label>

        <div className='file-container'>
          <img
            src={showFormerImg ? props.image : image}
            alt='product preview'
            className='file-input-img'
            onClick={(e) => {
              e.preventDefault();
              inputFile.current.click();
            }}
          />

          <input
            className='hidden'
            type='file'
            alt='Product image'
            accept='image/*'
            ref={inputFile}
            onChange={handleimage}
          />
        </div>

        <label htmlFor='title' className='form-label'>
          Change Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          defaultValue={props.title}
        />
        <label htmlFor='price' className='form-label'>
          Change Price
        </label>
        <input
          type='number'
          name='price'
          id='price'
          step='.01'
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          defaultValue={props.price}
        />
        <div className='dropdown-container'>
          <label htmlFor='categories' className='form-label'>
            Change Category
          </label>
          <select
            id='customer-country'
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            defaultValue={props.category}
          >
            <option value={null}>Please select ...</option>
            <option value='pizza'>Pizza</option>
            <option value='empanda'>Empanda</option>
            <option value='drink'>Drink</option>
            <option value='dessert'>Dessert</option>
          </select>
        </div>
        <button className='form-btn btn' onClick={submitForm}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
