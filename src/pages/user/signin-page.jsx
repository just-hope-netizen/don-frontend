import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BackArrow, EyeIcon, EyeOffIcon } from '../../assets/svg';

import { login } from '../../helpers/api-calls';
import { checkPassword, validateEmail } from '../../helpers/validate';
import { getUser } from '../../redux/slices/user-slice';

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passordError, setPassordError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInput = useRef();
  const passwordInput = useRef();

  function getUserInfo(e) {
    e.preventDefault();

    //get each user input
    const enteredEmailInput = emailInput.current.value;
    const enteredPasswordInput = passwordInput.current.value;

    signInUser(enteredEmailInput, enteredPasswordInput);
  }

  function signInUser(email, password) {
    //validate input
    const validatedPassword = checkPassword(password);
    const validatedEmail = validateEmail(email);
    if (!validatedEmail) {
      setEmailError(true);
    } else if (!validatedPassword) {
      setPassordError(true);
      setEmailError(false);
    } else {
      login(email, password).then((res) => {
        console.log(res);
        if (res.data.msg === 'user not found') {
          toast.info('Account not registered');
        }else if (
          res.data.msg ===
          'password does not match the one stored in the database'
        ) {
          toast.error('Wrong password')
        } else if (res.data.msg === 'user is not verified') {
          toast.info('user is not verified');
        }else{
          toast.success(`welcome ${res.data.username}`);
          navigate('/'); //navigate after login
          dispatch(getUser(res.data));
        }
      });
    }
  }

  return (
    <div className='sign-in-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <BackArrow />
        </Link>
        <h2 className='heading'>Sign In</h2>
      </header>

      <form className='sign-in-form'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <div className={`input-wrapper ${emailError && 'error'}`}>
          <input type='email' name='email' id='email' ref={emailInput} />
        </div>
        <span className='error-msg'>
          {emailError &&
            'You have entered an invalid email, check and try again!'}
        </span>

        <label htmlFor='password' className='form-label'>
          Password
        </label>

        <div className={`input-wrapper ${passordError && 'error'}`}>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            ref={passwordInput}
          />

          <button
            type='button'
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}{' '}
          </button>
        </div>
        <span className='error-msg'>
          {passordError &&
            '7 to 15 characters with one numeric value and special character e.g.qwerty123$.'}
        </span>

        <button className='form-btn' onClick={getUserInfo}>
          {' '}
          Sign In{' '}
        </button>
      </form>
      <h4 className='form-navigator-container'>
        Don’t have an Account ?
        <Link to={'/register'} className='form-navigator'>
          Sign Up
        </Link>{' '}
      </h4>
    </div>
  );
};
export default SigninPage;
