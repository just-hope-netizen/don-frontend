import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  productSearchedFor,
  resetState,
} from '../../redux/slices/product-slice';
import searchSvg from '../../assets/svg/search.svg';

const SearchForm = (props) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  //reset state
  //search only when query length longer than 0
  function findQuery(e) {
    e.preventDefault();
    props.onClick();
    dispatch(resetState());

    if (inputValue.length <= 0) return;
    dispatch(productSearchedFor(inputValue));
    setInputValue('');
  }

  return (
    <div className={props.className ? props.className : 'main-form-wrapper'}>
      <form onSubmit={findQuery}>
        <button className='search-btn'>
          <img src={searchSvg} alt='magnifying glass' />
        </button>
        <input
          placeholder='search .....'
          type='search'
          name='search'
          id='search'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
export default SearchForm;
