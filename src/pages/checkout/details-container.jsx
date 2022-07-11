import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  nigeriaStates,
  ukStates,
  usStates,
} from '../../data/states';
import { addAddress } from '../../redux/slices/user-slice';
import { validateEmail } from '../../helpers/validate';

const DetailsContainer = (props) => {
  const [states, setStates] = useState([]);

  const { email } = useSelector((store) => store.persistedReducer.user);
  const { cart } = useSelector((store) => store.persistedReducer.cart);
  const dispatch = useDispatch();

  const emailValue = useRef();
  const addressValue = useRef();
  const countryValue = useRef();
  const stateValue = useRef();

  function selectCountryHandler(e) {
    if (e.target.value === 'Nigeria') {
      setStates(nigeriaStates);
    } else if (e.target.value === 'Uk') {
      setStates(ukStates);
    } else {
      setStates(usStates);
    }
  }

  function getCustomerDetails(e) {
    e.preventDefault();
    //check if cart is empty
    if (cart.length <= 0 && toast.info("Can't proceed with an empty cart"))
      return;

    const email = emailValue.current.value;
    const address = addressValue.current.value;
    const country = countryValue.current.value;
    const state = stateValue.current.value;
    //confirm that country and state was selected
    if (
      (country === 'Please select ...' || state === 'Please select ...') &&
      toast.warn('form is not complete')
    )
      return;
    if (validateEmail(email) === false) return;
    //confirm that address was inputted
    if (!address && toast.error('address field is missing')) return;

    const addrObject = { country, state, address };
    props.close(false);
    props.open(true);
    dispatch(addAddress(addrObject));
    //close on mobile
    if (window.innerWidth > 768) {
      props.payment(true);
    }
  }

  return (
    <div>
      <h4>
        Please verify your contact details below. These will be used to fulfill
        your order.
      </h4>
      <form className='customer-details-form'>
        <label htmlFor='email' className='form-label'>
          Email Address
        </label>
        <input
          type='email'
          name='email'
          id='email'
          defaultValue={email}
          ref={emailValue}
        />
        <label htmlFor='address' className='form-label'>
          Address
        </label>
        <input
          type='text'
          name='address'
          id='address'
          placeholder='Street Name / Building / Apartment No. / Floor'
          ref={addressValue}
        />

        <div className='dropdown-container'>
          <label htmlFor='customer-country' className='form-label'>
            Country
          </label>
          <select
            id='customer-country'
            onChange={selectCountryHandler}
            ref={countryValue}
          >
            <option>Please select ...</option>
            <option value='Nigeria'>Nigeria</option>
            <option value='Uk'>Uk</option>
            <option value='Usa'>Usa</option>
          </select>
        </div>

        <div className='dropdown-container'>
          <label htmlFor='customer-state' className='form-label'>
            State/Region
          </label>
          <select id='customer-state' ref={stateValue}>
            <option>Please select ...</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <button className='form-btn btn' onClick={getCustomerDetails}>
          PROCEED TO NEXT STEP
        </button>
      </form>
    </div>
  );
};

export default DetailsContainer;
