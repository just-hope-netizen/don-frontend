import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { checkPassword } from '../../../helpers/validate';
import { toast } from 'react-toastify';
import arrowLeftSvg from '../../../assets/svg/arrowleft.svg';
import { Link } from 'react-router-dom';


const ChangePassword = (props) => {
  const { _id } = useSelector((store) => store.persistedReducer.user);

  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  //validate password, if validated change old to current
  function getData(e) {
    e.preventDefault();
    const enteredPasswordInput = passwordInput.current.value;
     const validatedPassword = checkPassword(enteredPasswordInput);
     const enteredComfirmPasswordInput = confirmPasswordInput.current.value;

    if (enteredPasswordInput !== enteredComfirmPasswordInput && validatedPassword) return
    
      const enteredInfo = {
        password: enteredComfirmPasswordInput,
      };
      props.changePassword(_id, enteredInfo);
      toast.success('password change')
   
  }

  return (
    <div className='change-password-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <img src={arrowLeftSvg} alt=' navigate back arrow' />
        </Link>
        <h2 className='heading'>Change Password</h2>
      </header>
      <span className='line-break'></span>

      <form className='change-password-form '>
        <label htmlFor='password' className='form-label'>
          New Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          ref={passwordInput}
          autoComplete='true'
        />

        <label htmlFor='password' className='form-label'>
          {' '}
          Confirm Password
        </label>
        <input
          type='password'
          name='password'
          id='confirm password'
          ref={confirmPasswordInput}
          autoComplete='true'
        />
        <button onClick={getData} className='form-btn btn' type='button'>
          SUBMIT
        </button>
      </form>
    </div>
  );
};
export default ChangePassword;

