import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../../redux/slices/user-slice';
import {
  checkPassword,
  validateEmail,
} from '../../helpers/validate';
import { login } from '../../helpers/api-calls';
import eyeIcon from '../../assets/svg/eye.svg';
import google from '../../assets/img/flat-color-icons_google.png';
import Logo from '../../components/logo';

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navgigate = useNavigate();

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
    //return if validated input is wrong
    if (!validatedEmail || !validatedPassword) return;

    login(email, password).then((res) => {
      if (
        res.data.message === 'user not found' &&
        toast.info('Account not registered')
      )
        return;
      toast.success(`welcome ${res.data.username}`);
      navgigate('/'); //navigate after login
      dispatch(getUser(res.data));
    });
  }

  return (
    <div className='sign-in-container'>
      <header>
        <Link to='/'>
          <Logo className='logo-container mobile' />
        </Link>
        <h1> Sign In</h1>
      </header>

      <div className='google-icon-container'>
        <Link to={'/development'} className='google-link'>
          {' '}
          <img src={google} alt='google icon' />{' '}
          <span>Sign In with Google</span>
        </Link>
        <div className='line-break-container'>
          <span>
            {' '}
            <hr />
          </span>
          <h2>OR</h2>
          <span>
            {' '}
            <hr />
          </span>
        </div>
      </div>

      <form className='sign-in-form'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <div className='input-wrapper'>
          <input
            type='email'
            name='email'
            id='email'
            ref={emailInput}
            autoComplete='true'
            required
          />
        </div>

        <div>
          <div>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
          </div>

          <div className='input-wrapper'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              ref={passwordInput}
              autoComplete='true'
              required
            />

            <button
              type='button'
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              <img
                src={eyeIcon}
                alt='click to show value'
                className='password-visible'
              />
            </button>
          </div>
        </div>

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