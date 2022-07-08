import { useRef, useState } from 'react';
import {  useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Backdrop from '../../components/backdrop';

import Logo from '../../components/logo';
import Modal from '../../components/modal';
import { register } from '../../helpers/api-calls';
import {
  checkPassword,
  validateEmail,
  validateUsername,
} from '../../helpers/validate';
import google from '../../assets/img/flat-color-icons_google.png';
import { getDetailsToLogin } from '../../redux/slices/user-slice';
import eyeIcon from '../../assets/svg/eye.svg';

const SignupPage = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState();

  const navgigate = useNavigate();
  const dispatch = useDispatch();
  //reference input value
  const textInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();

  //validate username, password and email then pass the value to the endpoint
  function getUserInfo(e) {
    e.preventDefault();

    const enteredTextInput = textInput.current.value;
    const enteredEmailInput = emailInput.current.value;
    const enteredPasswordInput = passwordInput.current.value;

    const validatedUsername = validateUsername(enteredTextInput);
    const validatedPassword = checkPassword(enteredPasswordInput);
    const validatedEmail = validateEmail(enteredEmailInput);

    const conditionArray = [
      validatedUsername,
      validatedPassword,
      validatedEmail,
    ];

    //end if any validation resolves to false
    if (conditionArray.includes(false)) return;

    const enteredInfo = {
      username: enteredTextInput,
      password: enteredPasswordInput,
      email: enteredEmailInput,
    };
    // admin or regular user
    if (props.adminAuth) {
      props.adminAuth(enteredInfo);
      return;
    } else {
      auth(enteredInfo);
    }
  }

  function auth(enteredInfo) {
    register(enteredInfo).then((res) => {
      // respond with the right error message
      //if  email is already in use
     
      if (res.status === 400) {
        const arrayKeys = [{ username: 1 }, { email: 1 }];
        const data = res.data.keyPattern;

        if (
          arrayKeys[0].username === data.username &&
          toast.warn(
            `Username ${res.data.keyValue.username} is already in use.`
          )
        )
          return;

        toast.warn(`Email ${res.data.keyValue.email} is already in use`);
        return;
      } else if (res.data.message === 'Email verification failed to send') {
        toast.info(
          'Oops, something went wrong. Refresh the page and try again.'
        );
        return;
      } else if (res.data.message === 'Email is already in use') {
        toast.info('Email has been used to register an account.');
        return;
      } else {
        //if no error
        const userEmail = res.data.info.accepted[0];
        setVerificationEmail(userEmail);
        dispatch(getDetailsToLogin(enteredInfo));
      }
    });
  }

  return (
    <div className='sign-up-container'>
      <header>
        <Link to='/'>
          <Logo className='logo-container mobile' />
        </Link>
        <h1> Sign Up</h1>
      </header>

      {/* remove element in admin page */}
      {props.adminAuth ? (
        ''
      ) : (
        <div className='google-icon-container'>
          <Link to={'/development'} className='google-link'>
            {' '}
            <img src={google} alt='google icon' />{' '}
            <span>Sign Up with Google</span>
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
      )}

      <form className='sign-up-form'>
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <div className='input-wrapper'>
          <input
            type='text'
            name='username'
            id='username'
            ref={textInput}
            autoComplete='true'
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

          <span>
            7 to 15 characters with one numeric value and special character e.g.
            qwerty123$.
          </span>
        </div>

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
          />
        </div>
        <button className='form-btn' onClick={getUserInfo}>
          Sign Up{' '}
        </button>
      </form>
      <h4 className='form-navigator-container'>
        Already have an Account ?{' '}
        <Link to={'/login'} className='form-navigator'>
          Sign In
        </Link>{' '}
      </h4>

      <h4 className='form-navigator-container'>
        By signing up an account you accept our
        <Link to={'/development'} className='form-navigator'>
          Terms of Use
        </Link>{' '}
        and
        <Link to={'/development'} className='form-navigator'>
          Privacy Policy
        </Link>{' '}
      </h4>
      {verificationEmail && (
        <Modal>
          <Logo />
          <article className='verify-msg-container'>
            <h3>Please check your email.</h3>
            <h4>
              We have sent you a link in your email to confirm your account.
            </h4>
          </article>
        </Modal>
      )}
      {verificationEmail && (
        <Backdrop
          onClick={() => {
            navgigate('/');
          }}
        />
      )}
    </div>
  );
};
export default SignupPage;
